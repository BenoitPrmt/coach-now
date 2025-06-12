export type PaginatedResponse<T> = {
    isPaginationEnabled: boolean;
    page: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    elements: T[];
}

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
    coach: Coach;
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
    bookings: Booking[];
}

export type ExportFormat = 'csv' | 'pdf';

export type CoachDashboard = {
    todayBookings: number;
    activeBookings: number;
    totalBookings: number;
    pendingEarnings: number;
    totalEarnings: number;
    totalRatings: number;
    averageRating: number;
    bookings: Booking[];
    nextBookings: Booking[];
    totalHours:number;
    monthlyEarnings:number;
}

export type CoachUnavailability = {
    id: string;
    coachId: string;
    startDate: string;
    endDate: string;
}
