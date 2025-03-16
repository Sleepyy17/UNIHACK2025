import { Request, Response, NextFunction } from 'express';
import { Group } from '../interface';

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
            };
        }
    }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.header('X-User-Id');
        if (!userId) {
            throw new Error();
        }

        req.user = { userId };
        next();
    } catch (err) {
        res.status(401).json({ error: 'Please provide a user ID.' });
    }
};

export const isGroupOwner = (groupId: string, userId: string): boolean => {
    const { groups } = require('../dataStore').getData();
    const group = groups.find((g: Group) => g.groupId === groupId);
    return group?.ownerId === userId;
}; 
