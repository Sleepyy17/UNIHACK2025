import { Request, Response } from 'express';
import { getData } from '../dataStore';

export const getProfile = async (req: Request, res: Response) => {
    try {
        const { users } = getData();
        const user = users.find(u => u.userId === req.user?.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return user data without sensitive information
        res.json({
            userId: user.userId,
            name: user.name,
            email: user.email,
            groups: user.groups,
        });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching user profile' });
    }
}; 