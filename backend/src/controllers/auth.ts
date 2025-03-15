import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { getData, saveDataStore } from '../dataStore';
import { User } from '../interface';

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const { users } = getData();
        
        // Check if user already exists
        if (users.some(user => user.email === email)) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser: User = {
            userId: uuidv4(),
            name,
            email,
            password: hashedPassword,
            groups: [],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        users.push(newUser);
        saveDataStore();

        // Return user info without password
        res.status(201).json({
            userId: newUser.userId,
            name: newUser.name,
            email: newUser.email
        });
    } catch (err) {
        res.status(500).json({ error: 'Error registering user' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const { users } = getData();
        const user = users.find(u => u.email === email);

        // Check if user exists
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Return user info without password
        res.json({
            userId: user.userId,
            name: user.name,
            email: user.email
        });
    } catch (err) {
        res.status(500).json({ error: 'Error logging in' });
    }
}; 
