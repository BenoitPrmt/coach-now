import type {UserRole} from "~/store/userStore";

export function isOfTypeUserRole(value?: string): value is UserRole {
    return ['USER', 'COACH', 'ADMIN'].includes(value || '') && value !== undefined;
}