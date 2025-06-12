import type {Booking, TimelineDayType} from "~/types";

export const groupBookingsByDay = (bookings: Booking[]): TimelineDayType[] => {
    const grouped = bookings.reduce((acc, booking) => {
        const date = new Date(booking.startDate).toDateString();
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(booking);
        return acc;
    }, {} as Record<string, Booking[]>);

    return Object.entries(grouped)
        .map(([date, bookings]) => ({
            date,
            bookings: bookings.sort((a, b) =>
                new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
            ),
            count: bookings.length
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};