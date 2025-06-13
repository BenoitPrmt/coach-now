"use server";

import type {Coach, PaginatedResponse} from "~/types";
import type {CoachFormData} from "~/components/Admin/Coach/CoachFormModal";
import {API_URL} from "~/constants/api";

async function getAvailabilities(bearerToken: any, coachId: string, startDate: string, endDate: string) {
    try {
        const url = API_URL + `/coach/${coachId}/availabilities?startDate=${startDate}&endDate=${endDate}`;

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
        const url = API_URL + `/coachs`;

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
        const url = API_URL + `/coach`;
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
    try {
        const url = API_URL + `/coach/${coachId}`;

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
        const url = API_URL + `/coach/${coachId}`;

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

async function getUnavailabilites(bearerToken: any, coachId: string) {
    try {
        const url = API_URL + `/coach/${coachId}/unavailabilities`;

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearerToken}`,
            },
        });

        if (!res.ok) {
            const error = await res.text();
            throw new Error(`Unavailabilities failed: ${error}`);
        }

        return await res.json();
    } catch (err) {
        console.error("Unavailabilities action failed:", err);
        throw err;
    }
}

async function isCoachAvailable(bearerToken: any, coachId: string, startDate: string, endDate: string) {
    try {
        const url = API_URL + `/coach/${coachId}/isAvailable?startDate=${startDate}&endDate=${endDate}`;

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearerToken}`,
            },
        });

        if (!res.ok) {
            const error = await res.text();
            throw new Error(`isAvailable failed: ${error}`);
        }

        return await res.json();
    } catch (err) {
        console.error("isAvailable action failed:", err);
        throw err;
    }
}

export {
    getAvailabilities,
    getAllCoachs,
    createCoach,
    updateCoach,
    deleteCoach,
    getUnavailabilites,
    isCoachAvailable
}