import { LOCAL_SERVER } from "./config";
import axios from 'axios';

export async function make_team(name, description, user_id) {
    const requestBody = { 
        "groupName": name,
        "description": description,
    };
    const response = await fetch(`${LOCAL_SERVER}api/groups/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-User-Id': user_id,
        },
        body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    if (data) {
        return data;
    }
}

export async function getUserInfo(user_id) {
    console.log(user_id);
    const response = await fetch(`${LOCAL_SERVER}api/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-User-Id': user_id.token,
        },
    });
    const data = await response.json();
    if (data) {
        return data;
    }
}

export async function getTeamInfo(user_id, groupId) {
    console.log(groupId);
    const response = await fetch(`${LOCAL_SERVER}api/groups/${groupId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-User-Id': user_id,
        },
    });
    const data = await response.json();
    if (data) {
        return data;
    }
}
