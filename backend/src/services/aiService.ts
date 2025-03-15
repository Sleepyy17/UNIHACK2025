import OpenAI from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';
import { getData } from '../dataStore';
import { User, Group, Standup, Blocker } from '../interface';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
    //env: process.env.PINECONE_ENVIRONMENT!
});

// Initialize Pinecone index
const index = pinecone.Index('hackathon');

const SYSTEM_PROMPT = `You are an expert project management assistant that helps an Async team create structured and relevant stand-up summaries from user logs.

You can perform the following jobs based on the user's request.

A. Generating a structured stand-up summary

I'll separate the instructions for each job which a '---' on a new line, followed by the job title.

---

A. Generating a structured stand-up summary

To do this, follow these steps when the message is provided:

1. Analyse the message to extract key details such as the work they have completed, the work they are going to work on, and any blockers they may have.

2. Filter out irrelevant waffle the message may have, we want to only include important details this may include.

3. You can use Message history: {memory} and Message context: {context} to help you understand the project and previous chats.

4. It is important to ask for confirmation when in doubt. If important details are missing or unclear, ask the user to refine their message. Remember we are looking for work they have completed, the work they are going to work on, and any blockers they may have.
Loop back to Step 1 if the user provides more information/adjustments.

5. The next few steps will be related to the output of the message.

6. Generate a well-structured summary of the team using the data, memory, context. 

Follow these rules: 
- The summary should be at max 30 words.
- Take inspiration of a good commit message, it gets straight to the point
- Be as descriptive as you can with the limited characters allowed
- Make sure you use BOLD and ITALICS to highlight important details.

7. Generate a List of Blockers that the user current has, the details should be.
   - A short summary of the blocker (not null)
   - The users name (not null)
   - The name of the user blocking (this can be empty but try answer this using the context)

8. Generate the new working status of the current user basically on what they are working on.
    - This should be less than 8 words.

9. Finally present the output neatly with the headers.

[SUMMARY]
- The summary from step 6

[BLOCKERS]
- A list of blockers from step 7

[NEWSTATUS]
- The new working status from step 8`;

interface ChatResponse {
    summary: string;
    blockers: Array<{
        summary: string;
        userName: string;
        blockingUser: string | null;
    }>;
    newStatus: string;
}

export async function processStandupMessage(
    userId: string,
    groupId: string,
    message: string
): Promise<ChatResponse> {
    const { users, groups, standups, blockers } = getData();
    
    // Get context
    const user = users.find(u => u.userId === userId);
    const group = groups.find(g => g.groupId === groupId);
    const userStandups = standups.filter(s => s.userId === userId && s.groupId === groupId);
    const groupBlockers = blockers.filter(b => b.groupId === groupId);

    // Create context string
    const context = {
        userName: user?.name,
        groupName: group?.groupName,
        recentStandups: userStandups.slice(-3),
        activeBlockers: groupBlockers.filter(b => b.status === 'active')
    };

    // Get chat completion from OpenAI
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: `Context: ${JSON.stringify(context)}\nMessage: ${message}` }
        ],
        temperature: 0.7,
    });

    const response = completion.choices[0].message.content;
    if (!response) {
        throw new Error('No response from OpenAI');
    }
    
    // Parse the response
    const parsedResponse = parseAIResponse(response);

    // Store in Pinecone for memory
    await storeChatMemory(userId, groupId, message, response);

    return parsedResponse;
}

function parseAIResponse(response: string): ChatResponse {
    const sections = response.split('\n\n');
    let summary = '';
    let blockers: Array<{summary: string; userName: string; blockingUser: string | null}> = [];
    let newStatus = '';

    for (const section of sections) {
        if (section.startsWith('[SUMMARY]')) {
            summary = section.replace('[SUMMARY]\n', '').trim();
        } else if (section.startsWith('[BLOCKERS]')) {
            const blockerLines = section.replace('[BLOCKERS]\n', '').split('\n');
            blockers = blockerLines
                .filter(line => line.trim() !== '')
                .map(line => {
                    const parts = line.replace('- ', '').split(' - ').map(s => s.trim());
                    return {
                        summary: parts[0] || '',
                        userName: parts[1] || '',
                        blockingUser: parts[2] || null
                    };
                });
        } else if (section.startsWith('[NEWSTATUS]')) {
            newStatus = section.replace('[NEWSTATUS]\n', '').trim();
        }
    }

    return {
        summary: summary || 'No summary provided',
        blockers: blockers.length ? blockers : [],
        newStatus: newStatus || 'Status not specified'
    };
}

async function storeChatMemory(
    userId: string,
    groupId: string,
    message: string,
    response: string
) {
    try {
        const embedding = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: message,
        });

        await index.upsert([{
            id: `${userId}-${groupId}-${Date.now()}`,
            values: embedding.data[0].embedding,
            metadata: {
                userId,
                groupId,
                message,
                response,
                timestamp: new Date().toISOString()
            }
        }]);
    } catch (error) {
        console.error('Error storing chat memory:', error);
        // Don't throw the error as this is not critical for the main functionality
    }
} 
