import { Request, Response } from 'express';
import { processStandupMessage } from '../services/aiService';
import { getData, saveDataStore } from '../dataStore';
import { Blocker, Standup, GroupSummary, MemberStatus } from '../interface';
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
        const { users, groups, standups, blockers } = getData();
        const user = users.find(u => u.userId === userId);
        const group = groups.find(g => g.groupId === groupId || g.groupName === groupId);

        if (!user || !group) {
            return res.status(404).json({ error: 'User or group not found' });
        }

        // Process message with AI
        const aiResponse = await processStandupMessage(userId, groupId, message);

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

        // Create new blockers and update group's activeBlockers
        const newBlockers: Blocker[] = [];
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
            newBlockers.push(newBlocker);
        }

        // Update group's active blockers
        group.activeBlockers = blockers
            .filter(b => b.groupId === groupId && b.status === 'active')
            .sort((a, b) => {
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
                return priorityDiff || b.createdAt.getTime() - a.createdAt.getTime();
            });

        // Update member's status in the group
        const memberStatusIndex = group.memberStatuses.findIndex(ms => ms.userId === userId);
        const updatedStatus: MemberStatus = {
            userId,
            userName: user.name,
            currentStatus: aiResponse.newStatus,
            lastUpdated: new Date()
        };

        if (memberStatusIndex !== -1) {
            group.memberStatuses[memberStatusIndex] = updatedStatus;
        } else {
            group.memberStatuses.push(updatedStatus);
        }

        // Add new summary to the group
        const newSummary: GroupSummary = {
            date: new Date(),
            content: aiResponse.summary,
            generatedBy: 'AI'
        };
        group.recentSummaries.unshift(newSummary);
        if (group.recentSummaries.length > 5) {
            group.recentSummaries.pop(); // Keep only 5 most recent summaries
        }

        // Update group's timestamp
        group.updatedAt = new Date();
        saveDataStore();

        res.json({
            summary: aiResponse.summary,
            newStatus: aiResponse.newStatus,
            blockers: aiResponse.blockers,
            standup: newStandup,
            groupInfo: group, // Include updated group info in response
            userResponse: aiResponse.userResponse // Added user response to API response
        });
    } catch (err) {
        console.error('Error in AI chat:', err);
        res.status(500).json({ error: 'Error processing message' });
    }
}; 