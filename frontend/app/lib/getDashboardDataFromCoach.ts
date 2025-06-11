import type {Coach, CoachDashboard} from "~/types";

export const getDashboardDataFromCoach = (coach: Coach | null): CoachDashboard => {
    if (!coach) {
        return {
            todayBookings: 0,
            pendingEarnings: 0,
            totalBookings: 0,
            totalEarnings: 0,
            totalRatings: 0,
            averageRating: 0,
            activeBookings: 0,
            bookings: [],
            nextBookings: [],
            totalHours: 0,
            monthlyEarnings: 0
        };
    }

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const activeBookings = coach.bookings?.filter(booking => booking.isActive) || [];

    return {
        todayBookings: activeBookings.filter(booking => {
            const bookingDate = new Date(booking.startDate);
            return bookingDate.getDate() === today.getDate() &&
                bookingDate.getMonth() === currentMonth &&
                bookingDate.getFullYear() === currentYear;
        }).length,

        activeBookings: activeBookings.length,

        pendingEarnings: activeBookings.filter(booking => {
            const bookingDate = new Date(booking.startDate);
            return bookingDate > today;
        }).reduce((acc, booking) => acc + booking.totalPrice, 0),

        totalBookings: activeBookings.length,

        totalEarnings: activeBookings.reduce((acc, booking) => acc + booking.totalPrice, 0),

        totalRatings: coach.ratings?.length || 0,

        averageRating: coach.ratings?.length ?
            Math.round((coach.ratings.reduce((acc, rating) => acc + rating.rating, 0) / coach.ratings.length) * 10) / 10 :
            0,

        bookings: coach.bookings || [],

        nextBookings: activeBookings.filter(booking => {
            const bookingDate = new Date(booking.startDate);
            return bookingDate > new Date() && booking.isActive;
        })
            .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
            .slice(0, 3),

        totalHours: Math.round(activeBookings.reduce((acc, booking) => {
            const start = new Date(booking.startDate);
            const end = new Date(booking.endDate);
            const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
            return acc + hours;
        }, 0)),

        monthlyEarnings: activeBookings.filter(booking => {
            const bookingDate = new Date(booking.startDate);
            return bookingDate.getMonth() === currentMonth &&
                bookingDate.getFullYear() === currentYear;
        }).reduce((acc, booking) => acc + booking.totalPrice, 0)
    };
}