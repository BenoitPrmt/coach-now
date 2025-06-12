import type {SessionUser} from "~/store/userStore";
import React, {useEffect, useState} from "react";
import type {Booking, CoachCalendarData} from "~/types";
import {API_URL} from "~/constants/api";
import Loader from "~/components/Loader";
import {motion, AnimatePresence} from "framer-motion";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {Button, buttonVariants} from "~/components/ui/button";
import {formatDateForBackend, formatDateWithTime} from "~/lib/time";
import {BanIcon, CalendarIcon, CircleUser, Goal, Rocket, TrashIcon, XIcon} from "lucide-react";
import {cn} from "~/lib/utils";
import {COACH_CALENDAR as COACH_CALENDAR_CONSTANTS} from "~/constants";
import {ANIMATIONS} from "~/constants";
import {groupBookingsByDay} from "~/lib/reorder";
import Timeline from "~/components/CoachDashboard/Dashboard/Bookings/Timeline";

const {COACH_CALENDAR} = COACH_CALENDAR_CONSTANTS;
const {
    SELECTED_BOOKING_VARIANTS,
    TIMELINE_VARIANTS,
    BOOKINGS_ITEMS_VARIANTS,
    CONTAINER_BOOKINGS_VARIANTS,
    BOOKING_CARD_VARIANTS
} = ANIMATIONS;

const CoachDashboardBookings = ({user, userToken}: { user: SessionUser | null, userToken: string | null }) => {
    const [bookingData, setBookingData] = useState<Booking[]>([]);
    const [startDate, setStartDate] = useState<CoachCalendarData | null>(null);
    const [endDate, setEndDate] = useState<CoachCalendarData | null>(null);
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

    const timelineData = groupBookingsByDay(bookingData);

    return (
        <div className="space-y-6">
            <div className="flex max-md:flex-col justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Vue Réservations
                </h2>

                <div className="flex gap-2 flex-wrap items-center justify-center">
                    <motion.div
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 1}}
                    >
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    className="relative overflow-hidden hover:bg-secondary/90"
                                    variant="secondary"
                                >
                                    <motion.span
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                    >
                                        <span className="flex items-center gap-2">
                                            <Rocket/>
                                            {startDate ? startDate.label : "Date de début"}
                                        </span>
                                    </motion.span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
                                <DropdownMenuLabel className="text-gray-700 font-medium">
                                    Sélection de la date de début
                                </DropdownMenuLabel>
                                {
                                    startDate && (
                                        <DropdownMenuItem
                                            onClick={() => {
                                                setStartDate(null);
                                                setSelectedBooking(null)
                                            }}
                                            variant="destructive"
                                        >
                                            <TrashIcon
                                                className="w-4 h-4 mr-1 inline-block"
                                                aria-hidden="true"
                                            />
                                            Effacer la date de début
                                        </DropdownMenuItem>
                                    )
                                }
                                {
                                    COACH_CALENDAR.filter(
                                        (option) => option.type === "start"
                                    ).map(
                                        (option) => (
                                            <DropdownMenuItem
                                                key={option.label}
                                                onClick={() => setStartDate({
                                                    label: option.label,
                                                    value: option.value
                                                })}
                                                className="hover:bg-primary/5 transition-colors duration-200"
                                            >
                                                {option.label}
                                            </DropdownMenuItem>
                                        )
                                    )
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </motion.div>

                    <motion.div
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 1}}
                    >
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    className="relative overflow-hidden hover:bg-secondary/90"
                                    variant="secondary">
                                    <motion.span
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                    >
                                        <span className="flex items-center gap-2">
                                            <Goal/>
                                            {endDate ? endDate.label : "Date de fin"}
                                        </span>
                                    </motion.span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
                                <DropdownMenuLabel className="text-gray-700 font-medium">
                                    Sélection d'une date de fin
                                </DropdownMenuLabel>
                                {
                                    endDate && (
                                        <DropdownMenuItem
                                            onClick={() => {
                                                setEndDate(null);
                                                setSelectedBooking(null)
                                            }}
                                            variant="destructive"
                                        >
                                            <TrashIcon
                                                className="w-4 h-4 mr-1 inline-block"
                                                aria-hidden="true"
                                            />
                                            Effacer la date de fin
                                        </DropdownMenuItem>
                                    )
                                }
                                {
                                    COACH_CALENDAR.filter((option) => option.type === "end").map(
                                        (option) => (
                                            <DropdownMenuItem
                                                key={option.label}
                                                onClick={() => setEndDate({
                                                    label: option.label,
                                                    value: option.value
                                                })}
                                                className="hover:bg-purple-50 transition-colors duration-200"
                                            >
                                                {option.label}
                                            </DropdownMenuItem>
                                        )
                                    )
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </motion.div>

                    <motion.div
                        className={cn(buttonVariants({
                                variant: "default"
                            }), "flex items-center space-x-2 relative overflow-hidden hover:bg-primary/90 cursor-pointer",
                            view === "timeline" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
                        )}
                        onClick={() => setView(view === "default" ? "timeline" : "default")}
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 1}}
                    >
                        <span className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4" aria-hidden="true"/>
                            Vue Timeline
                        </span>
                    </motion.div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {selectedBooking && (
                    <motion.div
                        className="relative p-6 border border-primary-200 rounded-xl bg-gradient-to-br from-primary-50 to-primary-50 shadow-lg mb-6"
                        variants={SELECTED_BOOKING_VARIANTS}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <Button
                            variant="ghost"
                            className="absolute top-2 right-2 p-0.5 rounded-full hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            onClick={() => setSelectedBooking(null)}
                        >
                            <XIcon
                                className="w-6 h-6 text-primary"
                                aria-hidden="true"
                            />
                        </Button>
                        <motion.h3
                            className="text-lg font-semibold mb-4 text-primary"
                            initial={{opacity: 0, x: -20}}
                            animate={{opacity: 1, x: 0}}
                        >
                            Détails de la Réservation
                        </motion.h3>
                        <motion.div
                            className="space-y-2"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                        >
                            <p className="flex items-center text-gray-700 gap-1">
                                <Rocket
                                    className="inline-block w-4 h-4 text-primary"
                                    aria-hidden="true"
                                />
                                {formatDateWithTime(new Date(selectedBooking.startDate))}
                            </p>
                            <p className="flex items-center text-gray-700 gap-1">
                                <Goal
                                    className="inline-block w-4 h-4 text-primary"
                                    aria-hidden="true"
                                />
                                {formatDateWithTime(new Date(selectedBooking.endDate))}
                            </p>
                            <p className="flex items-center text-gray-700 gap-1">
                                <CircleUser
                                    className="inline-block w-4 h-4 text-primary"
                                    aria-hidden="true"
                                />
                                {selectedBooking.user.firstName} {selectedBooking.user.lastName}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {view === "timeline" ? (
                    // Vue Timeline
                    <motion.div
                        className="space-y-4"
                        variants={TIMELINE_VARIANTS}
                        initial="hidden"
                        animate="visible"
                        key="timeline"
                    >
                        {timelineData.length === 0 ? (
                            <motion.div
                                className="p-8 border border-gray-200 rounded-xl text-center bg-gradient-to-br from-gray-50 to-slate-50"
                                variants={BOOKINGS_ITEMS_VARIANTS}
                            >
                                <motion.div
                                    initial={{scale: 0.8, opacity: 0}}
                                    animate={{scale: 1, opacity: 1}}
                                    transition={{duration: 0.5}}
                                >
                                    <div
                                        className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                                        <BanIcon className="w-8 h-8 text-red-500" aria-hidden="true"/>
                                    </div>
                                    <p className="text-gray-500 text-lg">Aucune réservation trouvée pour cette
                                        période.</p>
                                </motion.div>
                            </motion.div>
                        ) : (
                            <Timeline
                                timelineData={timelineData}
                                selectedBooking={selectedBooking}
                                setSelectedBooking={setSelectedBooking}
                            />
                        )}
                    </motion.div>
                ) : (
                    // Vue par défaut (grille)
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        variants={CONTAINER_BOOKINGS_VARIANTS}
                        initial="hidden"
                        animate="visible"
                        key="default"
                    >
                        <AnimatePresence>
                            {bookingData.length === 0 ? (
                                <motion.div
                                    className="col-span-1 md:col-span-2 p-8 border border-gray-200 rounded-xl text-center bg-gradient-to-br from-gray-50 to-slate-50"
                                    variants={BOOKINGS_ITEMS_VARIANTS}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <motion.div
                                        initial={{scale: 0.8, opacity: 0}}
                                        animate={{scale: 1, opacity: 1}}
                                        transition={{duration: 0.5}}
                                    >
                                        <div
                                            className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                                            <BanIcon
                                                className="w-8 h-8 text-red-500"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <p className="text-gray-500 text-lg">Aucune réservation trouvée pour cette
                                            période.</p>
                                    </motion.div>
                                </motion.div>
                            ) : (
                                bookingData.sort(
                                    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
                                ).map((booking) => (
                                    <motion.div
                                        key={booking.id}
                                        className={cn("p-6 border rounded-xl cursor-pointer shadow-md transition-all duration-300",
                                            selectedBooking?.id === booking.id
                                                ? 'border-primary/30 bg-gradient-to-br from-primary/5 to-primary-50 shadow-lg'
                                                : 'border-gray-200 bg-white hover:border-primary/20 hover:shadow-lg')}
                                        variants={BOOKING_CARD_VARIANTS}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover="hover"
                                        whileTap="tap"
                                        onClick={() => setSelectedBooking(booking)}
                                    >
                                        <motion.h3
                                            className={cn("text-lg font-semibold mb-3", selectedBooking?.id === booking.id ? 'text-primary/80' : 'text-gray-800')}
                                            layoutId={`booking-title-${booking.id}`}
                                        >
                                            {booking.user.firstName} {booking.user.lastName}
                                        </motion.h3>

                                        <motion.div className="flex items-center justify-between">
                                            <motion.p className="flex items-center text-gray-600 text-sm">
                                                <CalendarIcon
                                                    className="inline-block mr-1 w-4 h-4"
                                                    aria-hidden="true"
                                                />
                                                {formatDateWithTime(new Date(booking.startDate))}
                                            </motion.p>
                                            <motion.p className="text-gray-600 text-sm">

                                            </motion.p>
                                        </motion.div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CoachDashboardBookings;