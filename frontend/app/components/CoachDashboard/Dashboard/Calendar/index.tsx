import type {SessionUser} from "~/store/userStore";
import {useEffect, useState} from "react";
import type {Booking} from "~/types";
import {API_URL} from "~/constants/api";
import Loader from "~/components/Loader";

const CoachDashboardCalendar = ({user, userToken}: { user: SessionUser | null, userToken: string | null }) => {
    const [bookingData, setBookingData] = useState<Booking[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!user || !user.coachId || !userToken) return;

            setIsLoading(true);
            try {
                const response = await fetch(`${API_URL}/bookings/coach/${user.coachId}`, {
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

    if (isLoading) return <Loader/>;

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookingData.map((booking) => (
                    <div
                        key={booking.id}
                        className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedBooking(booking)}
                    >
                        <p className="text-gray-600">{new Date(booking.startDate).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoachDashboardCalendar;
