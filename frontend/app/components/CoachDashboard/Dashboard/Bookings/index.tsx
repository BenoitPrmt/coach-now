import type {SessionUser} from "~/store/userStore";
import React, {useEffect, useState} from "react";
import type {Booking, CoachCalendarDataType} from "~/types";
import {API_URL} from "~/constants/api";
import Loader from "~/components/Loader";
import {motion, AnimatePresence} from "motion/react";
import {formatDateForBackend} from "~/lib/time";
import {ANIMATIONS} from "~/constants";
import {groupBookingsByDay} from "~/lib/reorder";
import Timeline from "~/components/CoachDashboard/Dashboard/Bookings/Timeline";
import BookingsHeader from "~/components/CoachDashboard/Dashboard/Bookings/Header";
import BookingsError from "~/components/CoachDashboard/Dashboard/Bookings/Error";
import SelectedBooking from "~/components/CoachDashboard/Dashboard/Bookings/SelectedBooking";
import BookingsGrid from "~/components/CoachDashboard/Dashboard/Bookings/Grid";

const {TIMELINE_VARIANTS} = ANIMATIONS;

const CoachDashboardBookings = ({user, userToken}: { user: SessionUser | null, userToken: string | null }) => {
    const [bookingData, setBookingData] = useState<Booking[]>([]);
    const [startDate, setStartDate] = useState<CoachCalendarDataType | null>(null);
    const [endDate, setEndDate] = useState<CoachCalendarDataType | null>(null);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [view, setView] = useState<"default" | "timeline">("default");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!user || !user.coachId || !userToken) return;

            const url = new URL(`${API_URL}/bookings/coach/${user.coachId}`);

            if (startDate) {
                url.searchParams.set("startDate", formatDateForBackend(startDate.value));
            }
            if (endDate) {
                url.searchParams.set("endDate", formatDateForBackend(endDate.value));
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

    const timelineData = groupBookingsByDay(bookingData);

    return (
        <div className="space-y-6">
            <div className="flex max-md:flex-col justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Réservations
                </h2>

                <BookingsHeader
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    view={view}
                    setView={setView}
                    setSelectedBooking={setSelectedBooking}
                />
            </div>

            <AnimatePresence mode="wait">
                {selectedBooking && (
                    <SelectedBooking
                        selectedBooking={selectedBooking}
                        setSelectedBooking={setSelectedBooking}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {view === "timeline" ? (
                    <motion.div
                        className="space-y-4"
                        variants={TIMELINE_VARIANTS}
                        initial="hidden"
                        animate="visible"
                        key="timeline"
                    >
                        {timelineData.length === 0 ? (
                            <BookingsError/>
                        ) : (
                            <Timeline
                                timelineData={timelineData}
                                selectedBooking={selectedBooking}
                                setSelectedBooking={setSelectedBooking}
                            />
                        )}
                    </motion.div>
                ) : (
                    <BookingsGrid
                        bookings={bookingData}
                        selectedBooking={selectedBooking}
                        setSelectedBooking={setSelectedBooking}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default CoachDashboardBookings;