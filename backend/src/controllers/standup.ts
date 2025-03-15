import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getData, saveDataStore } from '../dataStore';
import { Standup } from '../interface';

export const logStandup = async (req: Request, res: Response) => {
    try {
        const { groupId, workDone, workNext, blockers } = req.body;
        const userId = req.user?.userId;

        if (!groupId || !workDone || !workNext || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const { groups } = getData();
        const group = groups.find(g => g.groupId === groupId);

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        if (!group.members.includes(userId)) {
            return res.status(403).json({ error: 'Not a member of this group' });
        }

        const newStandup: Standup = {
            logId: uuidv4(),
            userId,
            groupId,
            workDone,
            workNext,
            blockers: blockers || [],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const { standups } = getData();
        standups.push(newStandup);
        saveDataStore();

        res.status(201).json(newStandup);
    } catch (err) {
        res.status(500).json({ error: 'Error logging standup' });
    }
};

export const editStandup = async (req: Request, res: Response) => {
    try {
        const { logId } = req.params;
        const { workDone, workNext, blockers } = req.body;
        const userId = req.user?.userId;

        if (!logId || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const { standups } = getData();
        const standup = standups.find(s => s.logId === logId);

        if (!standup) {
            return res.status(404).json({ error: 'Standup log not found' });
        }

        if (standup.userId !== userId) {
            return res.status(403).json({ error: 'Can only edit your own standups' });
        }

        // Update fields if provided
        if (workDone) standup.workDone = workDone;
        if (workNext) standup.workNext = workNext;
        if (blockers) standup.blockers = blockers;
        standup.updatedAt = new Date();

        saveDataStore();
        res.json(standup);
    } catch (err) {
        res.status(500).json({ error: 'Error editing standup' });
    }
};

export const deleteStandup = async (req: Request, res: Response) => {
    try {
        const { logId } = req.params;
        const userId = req.user?.userId;

        if (!logId || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const { standups } = getData();
        const standupIndex = standups.findIndex(s => s.logId === logId);

        if (standupIndex === -1) {
            return res.status(404).json({ error: 'Standup log not found' });
        }

        const standup = standups[standupIndex];

        if (standup.userId !== userId) {
            return res.status(403).json({ error: 'Can only delete your own standups' });
        }

        standups.splice(standupIndex, 1);
        saveDataStore();

        res.json({ message: 'Standup deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting standup' });
    }
};

export const getGroupStandups = async (req: Request, res: Response) => {
    try {
        const { groupId } = req.params;
        const userId = req.user?.userId;

        if (!groupId || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const { groups, standups, users } = getData();
        const group = groups.find(g => g.groupId === groupId);

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        if (!group.members.includes(userId)) {
            return res.status(403).json({ error: 'Not a member of this group' });
        }

        // Get all standups for the group with user details
        const groupStandups = standups
            .filter(s => s.groupId === groupId)
            .map(standup => {
                const user = users.find(u => u.userId === standup.userId);
                return {
                    ...standup,
                    user: user ? {
                        userId: user.userId,
                        name: user.name,
                        email: user.email
                    } : null
                };
            })
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

        res.json(groupStandups);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching group standups' });
    }
}; 