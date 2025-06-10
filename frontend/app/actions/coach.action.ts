"use server";

import {getPublicEnv} from "env.common";
import type {Coach, PaginatedResponse} from "~/types";
import type {CoachFormData} from "~/components/Admin/Coach/CoachFormModal";

async function getAvailabilities(bearerToken: any, coachId: string, startDate: string, endDate: string) {
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

async function getAllCoachs(bearerToken: any): Promise<Coach[]> {
    try {
        const url = getPublicEnv(import.meta.env).VITE_API_URL + `/coachs`;

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

        const responseData: PaginatedResponse<Coach> = await res.json();
        return responseData.elements;
    } catch (err) {
        console.error("Login action failed:", err);
        throw err;
    }
}

async function createCoach(
    bearerToken: any,
    data: CoachFormData
): Promise<Coach> {
    try {
        const url = getPublicEnv(import.meta.env).VITE_API_URL + `/coach`;
        console.log("Call", url, "with data:", data);

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const error = await res.text();
            throw new Error(`Create failed: ${error}`);
        }

        return await res.json() as Coach;
    } catch (err) {
        console.error("Create coach action failed:", err);
        throw err;
    }
}

async function updateCoach(
    bearerToken: any,
    coachId: string,
    data: Partial<Coach>
): Promise<Coach> {
    console.log("Updating coach with ID:", coachId, "and data:", data);
    try {
        const url = getPublicEnv(import.meta.env).VITE_API_URL + `/coach/${coachId}`;

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

        return await res.json() as Coach;
    } catch (err) {
        console.error("Update coach action failed:", err);
        throw err;
    }
}

async function deleteCoach(bearerToken: any, coachId: string): Promise<void> {
    try {
        const url = getPublicEnv(import.meta.env).VITE_API_URL + `/coach/${coachId}`;

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
        console.error("Delete coach action failed:", err);
        throw err;
    }
}

export {
    getAvailabilities,
    getAllCoachs,
    createCoach,
    updateCoach,
    deleteCoach
}