import type {UserRole} from "~/types";
import type {Level} from "~/types";

export function isOfTypeUserRole(value?: string): value is UserRole {
    return ['USER', 'COACH', 'ADMIN'].includes(value || '') && value !== undefined;
}

export const isOfTypeLevel = (value?: string): value is Level => {
    return ['BEGINNER', 'MEDIUM', 'HIGHLEVEL'].includes(value || '') && value !== undefined;
}