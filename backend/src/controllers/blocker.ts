import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getData, saveDataStore } from '../dataStore';
import { Blocker } from '../interface';

export const addBlocker = async (req: Request, res: Response) => {
    try {
        const { groupId, description, priority } = req.body;
        const userId = req.user?.userId;

        if (!groupId || !description || !priority || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const { groups, users } = getData();
        const group = groups.find(g => g.groupId === groupId);
        const user = users.find(u => u.userId === userId);

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!group.members.includes(userId)) {
            return res.status(403).json({ error: 'Not a member of this group' });
        }

        const newBlocker: Blocker = {
            blockerId: uuidv4(),
            userId,
            userName: user.name,
            groupId,
            groupName: group.groupName,
            description,
            priority,
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const { blockers } = getData();
        blockers.push(newBlocker);
        saveDataStore();

        res.status(201).json(newBlocker);
    } catch (err) {
        res.status(500).json({ error: 'Error adding blocker' });
    }
};

export const resolveBlocker = async (req: Request, res: Response) => {
    try {
        const { blockerId } = req.params;
        const userId = req.user?.userId;

        if (!blockerId || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const { blockers } = getData();
        const blocker = blockers.find(b => b.blockerId === blockerId);

        if (!blocker) {
            return res.status(404).json({ error: 'Blocker not found' });
        }

        // Allow both the blocker creator and group owner to resolve blockers
        const { groups } = getData();
        const group = groups.find(g => g.groupId === blocker.groupId);

        if (blocker.userId !== userId && group?.ownerId !== userId) {
            return res.status(403).json({ error: 'Not authorized to resolve this blocker' });
        }

        blocker.status = 'resolved';
        blocker.updatedAt = new Date();
        blocker.resolvedAt = new Date();
        saveDataStore();

        res.json(blocker);
    } catch (err) {
        res.status(500).json({ error: 'Error resolving blocker' });
    }
};

export const listActiveBlockers = async (req: Request, res: Response) => {
    try {
        const { groupId } = req.params;
        const userId = req.user?.userId;

        if (!groupId || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const { groups, blockers, users } = getData();
        const group = groups.find(g => g.groupId === groupId);

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        if (!group.members.includes(userId)) {
            return res.status(403).json({ error: 'Not a member of this group' });
        }

        // Get active blockers with user details
        const activeBlockers = blockers
            .filter(b => b.groupId === groupId && b.status === 'active')
            .map(blocker => {
                const user = users.find(u => u.userId === blocker.userId);
                return {
                    ...blocker,
                    user: user ? {
                        userId: user.userId,
                        name: user.name,
                        email: user.email
                    } : null
                };
            })
            .sort((a, b) => {
                // Sort by priority (high > medium > low) and then by creation date
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
                return priorityDiff || b.createdAt.getTime() - a.createdAt.getTime();
            });

        res.json(activeBlockers);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching active blockers' });
    }
}; 