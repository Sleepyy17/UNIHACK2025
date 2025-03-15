import { randomUUID } from "crypto";
import { getData } from "./dataStore";
import { v4 as uuidv4 } from 'uuid';

export const userRegister = (email: string, password: string) => {
    const dataStore = getData();
    const existingUser = dataStore.users.find(user => user.email === email);
    if (existingUser) throw new Error('Email is already registered');
    if (email == undefined || password == undefined) throw new Error("Retry please");
    
    const userId = uuidv4()
    dataStore.users.push({
        userId, email, password,
        name: "",
        groups: [],
    });
    return { userId };
};

export const userLogin = (email: string, password: string) => {
    const dataStore = getData();
    const existingUser = dataStore.users.find(user => user.email === email);

    if (!existingUser) throw new Error('Email has not been registered');
    if (existingUser.password != password) throw new Error("Not the right password");

    return { userId: existingUser.userId};
}