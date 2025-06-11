import {create} from 'zustand'
import {isOfTypeUserRole} from "~/validation/typesValidations";
import type {UserRole} from "~/types";

export type SessionUser = {
    id: string;
    coachId: string;
    name: string;
    email: string;
    role: UserRole;
}

type DecodedUser = {
    id?: string;
    coachId?: string;
    name?: string;
    email?: string;
    role?: string;
    exp?: number;
};

type UserStore = {
    user: SessionUser | null;
    setUser: (user: SessionUser) => void;
    clearUser: () => void;
    setUserFromToken: (token: string) => void;
}

export const userStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({user}),
    clearUser: () => set({user: null}),
    setUserFromToken: (token: string) => {
        try {
            const tokenParts = token.split('.');

            if (tokenParts.length !== 3) {
                throw new Error("Token JWT invalide - format incorrect");
            }

            const payload = tokenParts[1];
            const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
            const decodedUser = JSON.parse(atob(paddedPayload)) as DecodedUser;

            if (decodedUser.exp && Date.now() / 1000 > decodedUser.exp) {
                console.log("Token expiré");
                set({user: null});
                return;
            }

            set({
                user: {
                    id: decodedUser.id || 'unknown-id', // Assuming name is used as a placeholder for ID
                    name: decodedUser.name || 'Guest',
                    email: decodedUser.email || '',
                    coachId: decodedUser.coachId || '',
                    role: isOfTypeUserRole(decodedUser.role) ? decodedUser.role : 'USER',
                }
            });
        } catch (error) {
            console.error("Failed to decode user token:", error);
            set({user: null});
        }
    }
}))
