"use server";

import {getPublicEnv} from "env.common";

export async function getAvailabilities(bearerToken: any, coachId: string, startDate: string, endDate: string) {
    try {
        const url = getPublicEnv(import.meta.env).VITE_API_URL + `/coach/${coachId}/availabilities?startDate=${startDate}&endDate=${endDate}`;

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

        return await res.json();
    } catch (err) {
        console.error("Login action failed:", err);
        throw err;
    }
}