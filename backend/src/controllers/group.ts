import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getData, saveDataStore } from '../dataStore';
import { Group, Standup } from '../interface';
import { isGroupOwner } from '../middleware/auth';

export const createGroup = async (req: Request, res: Response) => {
    try {
        const { groupName, description } = req.body;
        const userId = req.user?.userId;

        if (!groupName || !description || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const { users } = getData();
        const user = users.find(u => u.userId === userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newGroup: Group = {
            groupId: uuidv4(),
            groupName,
            description,
            ownerId: userId,
            ownerName: user.name,
            members: [userId],
            memberNames: [user.name],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const { groups } = getData();
        groups.push(newGroup);
        saveDataStore();

        res.status(201).json(newGroup);
    } catch (err) {
        res.status(500).json({ error: 'Error creating group' });
    }
};

export const addMember = async (req: Request, res: Response) => {
    try {
        const { groupId } = req.params;
        const { userId: memberIdToAdd } = req.body;
        const requestingUserId = req.user?.userId;

        if (!groupId || !memberIdToAdd || !requestingUserId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if requesting user is the group owner
        if (!isGroupOwner(groupId, requestingUserId)) {
            return res.status(403).json({ error: 'Only group owner can add members' });
        }

        const { groups, users } = getData();
        const group = groups.find(g => g.groupId === groupId);
        const userToAdd = users.find(u => u.userId === memberIdToAdd);

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        if (!userToAdd) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (group.members.includes(memberIdToAdd)) {
            return res.status(400).json({ error: 'User is already a member' });
        }

        group.members.push(memberIdToAdd);
        userToAdd.groups.push(groupId);
        group.updatedAt = new Date();
        saveDataStore();

        res.json(group);
    } catch (err) {
        res.status(500).json({ error: 'Error adding member to group' });
    }
};

export const getGroupInfo = async (req: Request, res: Response) => {
    try {
        const { groupId } = req.params;
        const userId = req.user?.userId;

        if (!groupId || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const { groups, users } = getData();
        const group = groups.find(g => g.groupId === groupId);

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        if (!group.members.includes(userId)) {
            return res.status(403).json({ error: 'Not a member of this group' });
        }

        // Get member details
        const memberDetails = group.members.map(memberId => {
            const member = users.find(u => u.userId === memberId);
            return member ? {
                userId: member.userId,
                name: member.name,
                email: member.email
            } : null;
        }).filter(Boolean);

        res.json({
            ...group,
            members: memberDetails
        });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching group info' });
    }
};

export const generateSummary = async (req: Request, res: Response) => {
    try {
        const { groupId } = req.params;
        const userId = req.user?.userId;

        if (!groupId || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const { groups, users } = getData();
        const group = groups.find(g => g.groupId === groupId);

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        if (!group.members.includes(userId)) {
            return res.status(403).json({ error: 'Not a member of this group' });
        }

        // Get all standups for the group
        const standups: Standup[] = getData().standups.filter(s => s.groupId === groupId);
        const blockers = getData().blockers.filter(b => b.groupId === groupId && b.status === 'active');

        // Group standups by user
        const memberUpdates = group.members.map(memberId => {
            const member = users.find(u => u.userId === memberId);
            const memberStandups = standups.filter(s => s.userId === memberId);

            return {
                userId: memberId,
                name: member?.name || 'Unknown',
                standups: memberStandups
            };
        });

        res.json({
            groupId,
            groupName: group.groupName,
            period: {
                start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
                end: new Date()
            },
            memberUpdates,
            activeBlockers: blockers
        });
    } catch (err) {
        res.status(500).json({ error: 'Error generating group summary' });
    }
}; 
