export type UserRole = 'USER' | 'COACH' | 'ADMIN';

export type Gender = "MALE" | "FEMALE"

export type Level = "BEGINNER" | "MEDIUM" | "HIGHLEVEL";

export type Booking = {
    id: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    totalPrice: number;
    coach: Coach;
    user: User;
}

export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    bookings?: Booking[];
    ratings?: Rating[];
}

export type Rating = {
    rating: number;
    id: string;
    date: string;
    comment: string;
    coach: string;
    user: User;
}

export type Coach = {
    id: string;
    birthdate: string;
    profilePictureUrl: string;
    hourlyRate: number;
    sports: string[];
    levels: Level[];
    gender: Gender;
    user: User;
    ratings: Rating[];
}