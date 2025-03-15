import { DataStore } from './interface';
import fs from 'fs';
import path from 'path';
import config from './config.json';

// Initialize empty data store
let data: DataStore = {
    users: [],
    groups: [],
    standups: [],
    blockers: []
};

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const DATA_FILE = path.join(dataDir, 'dataStore.json');
const BACKUP_FILE = path.join(dataDir, 'dataStore.backup.json');

// Helper function to revive dates from JSON
function dateReviver(key: string, value: any): any {
    const dateFields = ['createdAt', 'updatedAt', 'resolvedAt', 'start', 'end'];
    if (dateFields.includes(key) && typeof value === 'string') {
        return new Date(value);
    }
    return value;
}

// Helper function to create a backup of the current data
function createBackup(): void {
    try {
        if (fs.existsSync(DATA_FILE)) {
            fs.copyFileSync(DATA_FILE, BACKUP_FILE);
        }
    } catch (err) {
        console.error('Error creating backup:', err);
    }
}

// Helper function to restore from backup
function restoreFromBackup(): boolean {
    try {
        if (fs.existsSync(BACKUP_FILE)) {
            fs.copyFileSync(BACKUP_FILE, DATA_FILE);
            return true;
        }
        return false;
    } catch (err) {
        console.error('Error restoring from backup:', err);
        return false;
    }
}

export function getData(): DataStore {
    return data;
}

export function setData(newData: DataStore): void {
    // Validate the data structure
    if (!newData.users || !Array.isArray(newData.users)) newData.users = [];
    if (!newData.groups || !Array.isArray(newData.groups)) newData.groups = [];
    if (!newData.standups || !Array.isArray(newData.standups)) newData.standups = [];
    if (!newData.blockers || !Array.isArray(newData.blockers)) newData.blockers = [];

    data = newData;
}

export function loadDataStore(): void {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
            const parsedData = JSON.parse(fileContent, dateReviver);
            setData(parsedData);
            console.log('Data store loaded successfully');
        } else {
            // Initialize with empty data store if file doesn't exist
            setData(data);
            saveDataStore();
            console.log('Initialized empty data store');
        }
    } catch (err) {
        console.error('Error loading data store:', err);
        
        // Attempt to restore from backup
        if (restoreFromBackup()) {
            console.log('Restored from backup');
            loadDataStore(); // Try loading again
        } else {
            // Initialize with empty data if restore fails
            setData(data);
            saveDataStore();
            console.log('Initialized empty data store after load failure');
        }
    }
}

export function saveDataStore(): void {
    try {
        // Create a backup before saving
        createBackup();

        // Ensure the data directory exists
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // Save the data
        fs.writeFileSync(
            DATA_FILE,
            JSON.stringify(data, null, 2),
            'utf-8'
        );
        console.log('Data store saved successfully');
    } catch (err) {
        console.error('Error saving data store:', err);
        throw new Error('Failed to save data store');
    }
}

// Helper function to clear all data (useful for testing)
export function clearDataStore(): void {
    setData({
        users: [],
        groups: [],
        standups: [],
        blockers: []
    });
    saveDataStore();
}

const defaultData: DataStore = {
    users: [],
    groups: [],
    standups: [],
    blockers: []
};

export const resetDataStore = () => {
    data = { ...defaultData };
    saveDataStore();
};
