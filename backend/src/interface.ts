export interface DataStore {
    users: User[];
    groups: Group[];
    standups: Standup[];
    blockers: Blocker[];
}

export interface User {
    userId: string;
    name: string;
    email: string;
    password: string;
    groups: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Group {
    groupId: string;
    groupName: string;
    description: string;
    ownerId: string;
    ownerName: string;
    members: string[];
    memberNames: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Standup {
    logId: string;
    userId: string;
    userName: string;
    groupId: string;
    groupName: string;
    workDone: string;
    workNext: string;
    blockers: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Blocker {
    blockerId: string;
    userId: string;
    userName: string;
    groupId: string;
    groupName: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    status: 'active' | 'resolved';
    createdAt: Date;
    updatedAt: Date;
    resolvedAt?: Date;
}

export interface GroupSummary {
    groupId: string;
    groupName: string;
    period: {
        start: Date;
        end: Date;
    };
    memberUpdates: {
        userId: string;
        name: string;
        standups: Standup[];
    }[];
    activeBlockers: Blocker[];
}
