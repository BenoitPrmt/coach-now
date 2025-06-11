"use server";

import type {User} from "~/types";
import {API_URL} from "~/constants/api";

async function getAllUsers(bearerToken: any): Promise<User[]> {
    try {
        const url = API_URL + `/users`;

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearerToken}`,
            },
        });

        if (!res.ok) {
            const error = await res.text();
            throw new Error(`Login failed: ${error}`);
        }

        return await res.json() as User[];
    } catch (err) {
        console.error("Login action failed:", err);
        throw err;
    }
}

async function updateUser(
    bearerToken: any,
    userId: string,
    data: Partial<User>
): Promise<User> {
    console.log("Updating user with ID:", userId, "and data:", data);
    try {
        const url = API_URL + `/user/${userId}`;

        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const error = await res.text();
            throw new Error(`Update failed: ${error}`);
        }

        return await res.json() as User;
    } catch (err) {
        console.error("Update user action failed:", err);
        throw err;
    }
}

async function deleteUser(bearerToken: any, userId: string): Promise<void> {
    try {
        const url = API_URL + `/user/${userId}`;

        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearerToken}`,
            },
        });

        if (!res.ok) {
            const error = await res.text();
            throw new Error(`Delete failed: ${error}`);
        }
    } catch (err) {
        console.error("Delete user action failed:", err);
        throw err;
    }
}

export {
    getAllUsers,
    updateUser,
    deleteUser
}