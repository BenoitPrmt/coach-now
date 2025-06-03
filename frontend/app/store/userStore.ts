import {create} from 'zustand'

export type UserRole = 'USER' | 'COACH' | 'ADMIN';

type User = {
    name: string;
    email: string;
    role: UserRole;
}

type UserStore = {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
}

export const userStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({user}),
    clearUser: () => set({user: null}),
}))
