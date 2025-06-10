"use server";

import {getPublicEnv} from "env.common";

type BookingData = {
    startDate: string;
    endDate: string;
    isActive: boolean;
    totalPrice: number;
    coachId: string;
    userId: string;
}

export async function createBooking(
    bearerToken: string,
    bookingData: BookingData
) {
    try {
        const url = getPublicEnv(import.meta.env).VITE_API_URL + `/booking`;

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(bookingData),
        });

        if (!res.ok) {
            const error = await res.text();
            throw new Error(`Booking failed: ${error}`);
        }

        return await res.json();
    } catch (err) {
        console.error("Booking action failed:", err);
        throw err;
    }
}

export async function cancelBooking(
    bearerToken: string,
    bookingId: string,
) {
    try {
        const url = getPublicEnv(import.meta.env).VITE_API_URL + `/booking/${bookingId}`;

        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearerToken}`,
            },
            body: JSON.stringify({
                isActive: false,
            }),
        });

        if (!res.ok) {
            const error = await res.text();
            throw new Error(`Booking cancelling failed: ${error}`);
        }

        return await res.json();
    } catch (err) {
        console.error("Login action failed:", err);
        throw err;
    }
}