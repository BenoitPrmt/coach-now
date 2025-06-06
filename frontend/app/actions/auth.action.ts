"use server";

import {getPublicEnv} from "env.common";

export async function login(values: { email: string; password: string }) {
    try {
        const url = getPublicEnv(import.meta.env).VITE_API_URL + "/auth/login";

        const res = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values),
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

export async function register(values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string,
    isCoach?: boolean;
}) {
    try {
        console.log("User Form", values);
        const url = getPublicEnv(import.meta.env).VITE_API_URL + "/auth/register";

        const res = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                ...values,
                role: values.isCoach ? 'COACH' : 'USER',
            }),
        });

        if (!res.ok) {
            const error = await res.text();
            throw new Error(`Registration failed: ${error}`);
        }

        return await res.json();
    } catch (err) {
        console.error("Registration action failed:", err);
        throw err;
    }
}

export async function registerCoach(values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isCoach: boolean;
    gender: string;
    hourlyRate?: number;
    sports?: string;
    profilePicture?: string; // URL de la photo
    birthDate?: Date;
    level?: "BEGINNER" | "MEDIUM" | "HIGHLEVEL";
}) {
    try {
        console.log("Coach Form", values);
        const url = getPublicEnv(import.meta.env).VITE_API_URL + "/auth/register/coach";

        const res = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                ...values,
                role: values.isCoach ? 'COACH' : 'USER',
            }),
        });

        if (!res.ok) {
            const error = await res.text();
            throw new Error(`Registration failed: ${error}`);
        }

        return await res.json();
    } catch (err) {
        console.error("Registration action failed:", err);
        throw err;
    }
}

