import type {Booking} from "~/types";

export function getBookingStatus(booking: Booking): "Annulée" | "À venir" | "En cours" | "Terminée" {
    if (!booking.isActive) return "Annulée";

    const now = new Date();
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);

    if (startDate > now) return "À venir";
    if (startDate <= now && endDate >= now) return "En cours";
    return "Terminée";
}
