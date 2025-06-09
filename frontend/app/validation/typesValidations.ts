import type {UserRole, User, Coach} from "~/types";
import type {Level} from "~/types";

export function isOfTypeUserRole(value?: string): value is UserRole {
    return ['USER', 'COACH', 'ADMIN'].includes(value || '') && value !== undefined;
}

export const isOfTypeLevel = (value?: string): value is Level => {
    return ['BEGINNER', 'MEDIUM', 'HIGHLEVEL'].includes(value || '') && value !== undefined;
}

export const isOfTypeCoach = (object?: Coach | User): object is Coach => {
    return (
        !!object &&
        typeof object === 'object' &&
        'user' in object &&
        typeof (object as Coach).user === 'object' &&
        'role' in (object as Coach).user &&
        (object as Coach).user.role === 'COACH'
    );
};
