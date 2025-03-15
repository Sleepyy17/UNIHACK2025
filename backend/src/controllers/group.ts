import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getData, saveDataStore } from '../dataStore';
import { Group, Standup, MemberStatus, GroupSummary } from '../interface';
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
        const groupId = uuidv4()
        const newGroup: Group = {
            groupId: groupId,
            groupName,
            description,
            ownerId: userId,
            ownerName: user.name,
            members: [userId],
            memberNames: [user.name],
            memberStatuses: [{
                userId,
                userName: user.name,
                currentStatus: 'Just joined the group',
                lastUpdated: new Date()
            }],
            activeBlockers: [],
            recentSummaries: [],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const { groups } = getData();
        groups.push(newGroup);
        user.groups.push(newGroup);
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
        userToAdd.groups.push(group);
        saveDataStore();

        res.json(group);
    } catch (err) {
        res.status(500).json({ error: 'Error adding member to group' });
    }
};

export const addMemberByName = async (req: Request, res: Response) => {
    try {
        const { groupId } = req.params;
        const { memberName } = req.body;
        const userId = req.user?.userId;

        if (!groupId || !memberName || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const { users, groups } = getData();
        
        // Find the group
        const group = groups.find(g => g.groupId === groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Check if user is authorized (must be group owner or member)
        if (group.ownerId !== userId && !group.members.includes(userId)) {
            return res.status(403).json({ error: 'Not authorized to add members' });
        }

        // Find the user by name
        const userToAdd = users.find(u => u.name === memberName);
        if (!userToAdd) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if user is already in the group
        if (group.members.includes(userToAdd.userId)) {
            return res.status(400).json({ error: 'User is already a member of this group' });
        }

        // Add member to group
        group.members.push(userToAdd.userId);
        group.memberNames.push(userToAdd.name);
        group.memberStatuses.push({
            userId: userToAdd.userId,
            userName: userToAdd.name,
            currentStatus: 'No updates yet',
            lastUpdated: new Date()
        });
        group.updatedAt = new Date();

        // Add group to user's groups
        const user = users.find(u => u.userId === userToAdd.userId);
        if (user && !user.groups.includes(group)) {
            user.groups.push(group);
        }

        saveDataStore();
        res.json(group);
    } catch (err) {
        console.error('Error adding member by name:', err);
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

        const { groups, users, standups, blockers } = getData();
        const group = groups.find(g => g.groupId === groupId);

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        if (!group.members.includes(userId)) {
            return res.status(403).json({ error: 'Not a member of this group' });
        }

        // Update member statuses from latest standups
        const updatedMemberStatuses: MemberStatus[] = group.members.map(memberId => {
            const member = users.find(u => u.userId === memberId);
            const latestStandup = standups
                .filter(s => s.userId === memberId && s.groupId === groupId)
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];

            return {
                userId: memberId,
                userName: member?.name || 'Unknown',
                currentStatus: latestStandup?.workNext || 'No status update',
                lastUpdated: latestStandup?.createdAt || group.createdAt
            };
        });

        // Get active blockers for the group
        const activeBlockers = blockers
            .filter(b => b.groupId === groupId && b.status === 'active')
            .sort((a, b) => {
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
                return priorityDiff || b.createdAt.getTime() - a.createdAt.getTime();
            });

        // Get recent standups and generate summary if needed
        const recentStandups = standups
            .filter(s => s.groupId === groupId)
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice(0, 10);

        // Only add a new summary if there are new standups since last summary
        const lastSummary = group.recentSummaries[0];
        const newStandupsSinceLastSummary = recentStandups.some(
            standup => !lastSummary || standup.createdAt > lastSummary.date
        );

        if (newStandupsSinceLastSummary) {
            const newSummary: GroupSummary = {
                date: new Date(),
                content: `${recentStandups.length} recent updates, ${activeBlockers.length} active blockers`,
                generatedBy: 'system'
            };
            group.recentSummaries.unshift(newSummary);
            if (group.recentSummaries.length > 5) {
                group.recentSummaries.pop(); // Keep only 5 most recent summaries
            }
        }

        // Update group with latest data
        group.memberStatuses = updatedMemberStatuses;
        group.activeBlockers = activeBlockers;
        group.updatedAt = new Date();
        saveDataStore();

        res.json(group);
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

export const joinGroup = async (req: Request, res: Response) => {
    try {
        const { groupId } = req.params;
        const userId = req.user?.userId;

        if (!groupId || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const { users, groups } = getData();
        
        // Find the group
        const group = groups.find(g => g.groupId === groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Find the user
        const user = users.find(u => u.userId === userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if user is already in the group
        if (group.members.includes(userId)) {
            return res.status(400).json({ error: 'You are already a member of this group' });
        }

        // Add member to group
        group.members.push(userId);
        group.memberNames.push(user.name);
        group.memberStatuses.push({
            userId: user.userId,
            userName: user.name,
            currentStatus: 'Just joined the group',
            lastUpdated: new Date()
        });
        group.updatedAt = new Date();

        // Add group to user's groups
        if (!user.groups.includes(group)) {
            user.groups.push(group);
        }

        saveDataStore();
        res.json(group);
    } catch (err) {
        console.error('Error joining group:', err);
        res.status(500).json({ error: 'Error joining group' });
    }
}; 
