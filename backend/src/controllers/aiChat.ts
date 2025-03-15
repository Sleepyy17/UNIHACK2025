import { Request, Response } from 'express';
import { processStandupMessage } from '../services/aiService';
import { getData, saveDataStore } from '../dataStore';
import { Blocker, Standup } from '../interface';
import { v4 as uuidv4 } from 'uuid';

export const chatWithAI = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const userId = req.user?.userId;
        const groupId = req.body.groupId;

        if (!message || !userId || !groupId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Get user and group info
        const { users, groups } = getData();
        const user = users.find(u => u.userId === userId);
        const group = groups.find(g => g.groupId === groupId);

        if (!user || !group) {
            return res.status(404).json({ error: 'User or group not found' });
        }

        // Process message with AI
        const aiResponse = await processStandupMessage(userId, groupId, message);

        // Update standup and blockers based on AI response
        const { standups, blockers } = getData();

        // Create new standup
        const newStandup: Standup = {
            logId: uuidv4(),
            userId,
            userName: user.name,
            groupId,
            groupName: group.groupName,
            workDone: message,
            workNext: aiResponse.newStatus,
            blockers: aiResponse.blockers.map(b => b.summary),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        standups.push(newStandup);

        // Create new blockers
        for (const blockerInfo of aiResponse.blockers) {
            const newBlocker: Blocker = {
                blockerId: uuidv4(),
                userId,
                userName: user.name,
                groupId,
                groupName: group.groupName,
                description: blockerInfo.summary,
                priority: 'medium', // Default priority
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            blockers.push(newBlocker);
        }

        saveDataStore();

        res.json({
            summary: aiResponse.summary,
            newStatus: aiResponse.newStatus,
            blockers: aiResponse.blockers,
            standup: newStandup
        });
    } catch (err) {
        console.error('Error in AI chat:', err);
        res.status(500).json({ error: 'Error processing message' });
    }
}; 