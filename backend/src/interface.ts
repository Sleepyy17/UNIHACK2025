export interface DataStore {
    users: User[]
}

export interface User {
    email: string,
    password: string,
    userId: number
}