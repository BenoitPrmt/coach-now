"use server";

import {getPublicEnv} from "env.common";
import type {Booking, Coach, ExportFormat, PaginatedResponse} from "~/types";

type BookingData = {
    startDate: string;
    endDate: string;
    isActive: boolean;
    totalPrice: number;
    coachId: string;
    userId: string;
}

export async function getAllBookings(bearerToken: any): Promise<Booking[]> {
    try {
        const url = getPublicEnv(import.meta.env).VITE_API_URL + `/bookings`;

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

export async function createBooking(
    bearerToken: any,
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

export async function updateBooking(
    bearerToken: any,
    bookingId: string,
    data: Partial<Booking>
): Promise<Coach> {
    try {
        const url = getPublicEnv(import.meta.env).VITE_API_URL + `/booking/${bookingId}`;

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
        console.error("Update booking action failed:", err);
        throw err;
    }
}

export async function deleteBooking(bearerToken: any, bookingId: string): Promise<void> {
    try {
        const url = getPublicEnv(import.meta.env).VITE_API_URL + `/booking/${bookingId}`;

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
        console.error("Delete booking action failed:", err);
        throw err;
    }
}

export async function exportBookings(bearerToken: any, format: ExportFormat, coachId?: string): Promise<any> {
    try {
        const url = getPublicEnv(import.meta.env).VITE_API_URL + `/bookings/export/${format}` + (coachId ? `/${coachId}` : '');

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearerToken}`,
            },
        });

        if (!res.ok) {
            const error = await res.text();
            throw new Error(`Export failed: ${error}`);
        }

        return await res.blob();
    } catch (err) {
        console.error("Export bookings action failed:", err);
        throw err;
    }
}