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
import {BanIcon, CalendarIcon, CircleUser, Goal, Rocket, TrashIcon, XIcon, Clock, Users} from "lucide-react";
import {cn} from "~/lib/utils";
import {COACH_CALENDAR as COACH_CALENDAR_CONSTANTS} from "~/constants";
import {groupBookingsByDay} from "~/lib/reorder";

const {COACH_CALENDAR} = COACH_CALENDAR_CONSTANTS;

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

    const formatDisplayDate = (dateString: string): string => {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return "Aujourd'hui";
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return "Demain";
        } else {
            return date.toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    };

    const containerVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.4}
        }
    };

    const bookingCardVariants = {
        hidden: {opacity: 0, scale: 0.95},
        visible: {
            opacity: 1,
            scale: 1
        },
        hover: {
            scale: 1.005
        },
        tap: {
            scale: 1
        }
    };

    const selectedBookingVariants = {
        hidden: {opacity: 0, height: 0, y: -20},
        visible: {
            opacity: 1,
            height: "auto",
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            height: 0,
            y: -20,
            transition: {
                duration: 0.3,
                ease: "easeIn"
            }
        }
    };

    const timelineVariants = {
        hidden: {opacity: 0, x: -50},
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const timelineDayVariants = {
        hidden: {opacity: 0, x: -30},
        visible: {
            opacity: 1,
            x: 0,
            transition: {duration: 0.4}
        }
    };

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
                        variants={selectedBookingVariants}
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
                        variants={timelineVariants}
                        initial="hidden"
                        animate="visible"
                        key="timeline"
                    >
                        {timelineData.length === 0 ? (
                            <motion.div
                                className="p-8 border border-gray-200 rounded-xl text-center bg-gradient-to-br from-gray-50 to-slate-50"
                                variants={itemVariants}
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
                            <div className="relative">
                                <div
                                    className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/30"></div>

                                {timelineData.map((day) => (
                                    <motion.div
                                        key={day.date}
                                        className="relative flex items-start space-x-6 pb-8"
                                        variants={timelineDayVariants}
                                    >
                                        <div className="relative flex-shrink-0">
                                            <div
                                                className="w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg z-10 relative"></div>
                                            <motion.div
                                                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold shadow-md"
                                                initial={{scale: 0}}
                                                animate={{scale: 1}}
                                                transition={{delay: 0.2}}
                                            >
                                                {day.count}
                                            </motion.div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <motion.div
                                                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                                                whileHover={{y: -2}}
                                            >
                                                <div
                                                    className="bg-gradient-to-r from-primary/5 to-primary/10 px-6 py-4 border-b border-gray-100">
                                                    <div className="flex max-md:flex-col items-center justify-between">
                                                        <h3 className="text-lg font-semibold text-gray-900 capitalize">
                                                            {formatDisplayDate(day.date)}
                                                        </h3>
                                                        <div
                                                            className="flex items-center space-x-4 text-sm text-gray-600">
                                                            <div className="flex items-center gap-1">
                                                                <Users className="w-4 h-4"/>
                                                                <span>{day.count} réservation{day.count > 1 ? 's' : ''}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-4 space-y-3">
                                                    {day.bookings.map((booking) => (
                                                        <motion.div
                                                            key={booking.id}
                                                            className={cn("flex max-md:flex-col items-center justify-between p-3 rounded-lg transition-colors duration-200 cursor-pointer",
                                                                selectedBooking?.id === booking.id
                                                                    ? "bg-primary/10 border border-primary/20"
                                                                    : "bg-gray-50 hover:bg-primary/5"
                                                            )}
                                                            whileHover={{scale: 1.02}}
                                                            onClick={() => setSelectedBooking(booking)}
                                                        >
                                                            <div
                                                                className="flex max-md:flex-col items-center space-x-3">
                                                                <div
                                                                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                                                    <CircleUser className="w-5 h-5 text-primary"/>
                                                                </div>
                                                                <div>
                                                                    <p className="font-medium text-gray-900">
                                                                        {booking.user.firstName} {booking.user.lastName}
                                                                    </p>
                                                                    <div
                                                                        className="flex items-center gap-4 text-sm text-gray-600">
                                                                        <span className="flex items-center gap-1">
                                                                            <Clock className="w-3 h-3"/>
                                                                            {new Date(booking.startDate).toLocaleTimeString('fr-FR', {
                                                                                hour: '2-digit',
                                                                                minute: '2-digit'
                                                                            })}
                                                                        </span>
                                                                        <span>→</span>
                                                                        <span>
                                                                            {new Date(booking.endDate).toLocaleTimeString('fr-FR', {
                                                                                hour: '2-digit',
                                                                                minute: '2-digit'
                                                                            })}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {Math.round((new Date(booking.endDate).getTime() - new Date(booking.startDate).getTime()) / (1000 * 60))} min
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                ) : (
                    // Vue par défaut (grille)
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        key="default"
                    >
                        <AnimatePresence>
                            {bookingData.length === 0 ? (
                                <motion.div
                                    className="col-span-1 md:col-span-2 p-8 border border-gray-200 rounded-xl text-center bg-gradient-to-br from-gray-50 to-slate-50"
                                    variants={itemVariants}
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
                                        variants={bookingCardVariants}
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

                                        <motion.div className="space-y-2">
                                            <motion.p className="flex items-center text-gray-600 text-sm">
                                                <CalendarIcon
                                                    className="inline-block mr-1 w-4 h-4"
                                                    aria-hidden="true"
                                                />
                                                {formatDateWithTime(new Date(booking.startDate))}
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