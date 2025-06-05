import type {Gender} from "~/types";

export const formatGender = (gender: Gender): string => {
    return gender.charAt(0).toUpperCase()
}