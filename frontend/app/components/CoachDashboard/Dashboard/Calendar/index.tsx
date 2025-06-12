import type {SessionUser} from "~/store/userStore";
import React, {useEffect, useState} from "react";
import type {Booking} from "~/types";
import {API_URL} from "~/constants/api";
import Loader from "~/components/Loader";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {Button} from "~/components/ui/button";
import {formatDateForBackend} from "~/lib/time";

//TODO: Add filtering by date range
const CoachDashboardCalendar = ({user, userToken}: { user: SessionUser | null, userToken: string | null }) => {
    const [bookingData, setBookingData] = useState<Booking[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!user || !user.coachId || !userToken) return;

            const url = new URL(`${API_URL}/bookings/coach/${user.coachId}`);

            if (startDate) {
                url.searchParams.set("startDate", formatDateForBackend(startDate));
            }
            if (endDate) {
                url.searchParams.set("endDate", formatDateForBackend(endDate));
            }

            setIsLoading(true);
            try {
                const response = await fetch(
                    url, {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${userToken}`,
                        }
                    });

                console.log("Fetching bookings for coach ID:", response);

                if (!response.ok) {
                    throw new Error("Failed to fetch bookings");
                }

                const data = await response.json();
                setBookingData(data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookings();
    }, [
        user,
        userToken,
        user?.coachId,
        startDate,
        endDate
    ]);

    useEffect(() => {
        if (!bookingData.find((booking) => booking.id === selectedBooking?.id)) {
            setSelectedBooking(null);
        }
    }, [bookingData]);

    if (isLoading) return <Loader/>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Vue Calendrier
                </h2>
                {/* Dropdowns for start and end dates */}
                <div className="flex gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>
                                {startDate ? startDate.toLocaleDateString() : "Date de début"}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                Sélection de la date de début
                            </DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setStartDate(new Date())}>
                                Aujourd'hui
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setStartDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))}>
                                Derniers 7 Jours
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setStartDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))}>
                                Derniers 30 Jours
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>
                                {endDate ? endDate.toLocaleDateString() : "Date de fin"}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Sélection d'une date de fin</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setEndDate(new Date())}>
                                Aujourd'hui
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setEndDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))}>
                                Prochain 7 Jours
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setEndDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))}>
                                Prochain 30 Jours
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {
                    selectedBooking && (
                        <div className="col-span-1 md:col-span-2 p-4 border rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">Booking Details</h3>
                            <p><strong>Start:</strong> {new Date(selectedBooking.startDate).toLocaleString()}</p>
                            <p><strong>End:</strong> {new Date(selectedBooking.endDate).toLocaleString()}</p>
                            <p><strong>Client:</strong> {selectedBooking.user.firstName} {selectedBooking.user.lastName}
                            </p>
                        </div>
                    )
                }
                {
                    bookingData.length === 0 ? (
                        <div className="col-span-1 md:col-span-2 p-4 border rounded-lg text-center">
                            <p className="text-gray-500">Aucune réservation trouvée pour cette période.</p>
                        </div>
                    ) : (
                        bookingData.map((booking) => (
                                <div key={booking.id}
                                     className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                                     onClick={() => setSelectedBooking(booking)}>
                                    <h3 className="text-lg font-semibold mb-2">
                                        {booking.user.firstName} {booking.user.lastName}
                                    </h3>
                                    <p>
                                        <strong>Date:</strong> {new Date(booking.startDate).toLocaleString()} -{" "}
                                        {new Date(booking.endDate).toLocaleString()}
                                    </p>
                                    <p>
                                        <strong>Prix total:</strong> {booking.totalPrice}€
                                    </p>
                                </div>
                            )
                        )
                    )
                }
            </div>
        </div>
    );
};

export default CoachDashboardCalendar;
