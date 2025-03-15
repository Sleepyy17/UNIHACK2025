import { Request, Response } from 'express';
import { resetDataStore } from '../dataStore';

export const resetToDefault = async (req: Request, res: Response) => {
    try {
        resetDataStore();
        res.json({ message: 'DataStore reset to default state successfully' });
    } catch (err) {
        console.error('Error resetting dataStore:', err);
        res.status(500).json({ error: 'Error resetting dataStore' });
    }
}; 