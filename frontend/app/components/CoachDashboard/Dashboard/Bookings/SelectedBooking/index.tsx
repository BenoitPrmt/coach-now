import React, {useCallback, useMemo} from 'react';
import type {Booking} from "~/types";
import {Button} from "~/components/ui/button";
import {CalendarCheck, CheckCircle, CircleUser, Clock, Goal, Rocket, XCircle, XIcon, AlertTriangle} from "lucide-react";
import {motion} from "framer-motion";
import {formatDateWithTime} from "~/lib/time";
import {ANIMATIONS} from "~/constants";
import {cn} from "~/lib/utils";

const {
    SELECTED_BOOKING_VARIANTS
} = ANIMATIONS;

const SelectedBooking = (
    {
        selectedBooking,
        setSelectedBooking
    }: {
        selectedBooking: Booking,
        setSelectedBooking: (booking: Booking | null) => void;
    }) => {
    const startDate = new Date(selectedBooking.startDate);
    const endDate = new Date(selectedBooking.endDate);

    const selectedBookingStatus = useMemo(() => {
        if (!selectedBooking.isActive) {
            return "Annulée";
        }

        const now = new Date();
        if (startDate > now) {
            return "À venir";
        } else if (startDate <= now && endDate >= now) {
            return "En cours";
        } else {
            return "Terminée";
        }
    }, [selectedBooking.isActive]);

    const isCancelled = selectedBookingStatus === "Annulée";

    const getStatusIcon = useCallback((status: string) => {
        switch (status) {
            case "À venir":
                return <Clock className="w-4 h-4 text-yellow-500" aria-hidden="true"/>;
            case "En cours":
                return <CheckCircle className="w-4 h-4 text-blue-500" aria-hidden="true"/>;
            case "Terminée":
                return <CalendarCheck className="w-4 h-4 text-green-600" aria-hidden="true"/>;
            case "Annulée":
                return <XCircle className="w-4 h-4 text-red-500" aria-hidden="true"/>;
            default:
                return null;
        }
    }, []);

    return (
        <motion.div
            className={cn(
                "relative p-6 border rounded-xl shadow-lg mb-6",
                isCancelled
                    ? "border-red-200 bg-gradient-to-br from-red-50/80 to-gray-50/80"
                    : "border-primary-200 bg-gradient-to-br from-primary-50 to-primary-50"
            )}
            variants={SELECTED_BOOKING_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            {isCancelled && (
                <motion.div
                    initial={{opacity: 0, y: -10}}
                    animate={{opacity: 1, y: 0}}
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md z-10"
                >
                    <AlertTriangle className="w-3 h-3"/>
                    RÉSERVATION ANNULÉE
                </motion.div>
            )}

            <Button
                variant="ghost"
                className={cn(
                    "absolute top-2 right-2 p-0.5 rounded-full focus:outline-none focus:ring-2",
                    isCancelled
                        ? "hover:bg-red-100 focus:ring-red-300"
                        : "hover:bg-primary/10 focus:ring-primary/50"
                )}
                onClick={() => setSelectedBooking(null)}
            >
                <XIcon
                    className={cn(
                        "w-6 h-6",
                        isCancelled ? "text-red-600" : "text-primary"
                    )}
                    aria-hidden="true"
                />
            </Button>

            <motion.h3
                className={cn(
                    "text-lg font-semibold mb-4 mt-2",
                    isCancelled ? "text-red-700" : "text-primary"
                )}
                initial={{opacity: 0, x: -20}}
                animate={{opacity: 1, x: 0}}
            >
                {isCancelled ? "Réservation Annulée" : "Détails de la Réservation"}
            </motion.h3>

            {isCancelled && (
                <motion.div
                    initial={{opacity: 0, height: 0}}
                    animate={{opacity: 1, height: "auto"}}
                    className="mb-4 p-3 bg-red-100/50 border border-red-200 rounded-lg"
                >
                    <p className="text-red-800 text-sm flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 flex-shrink-0"/>
                        Cette réservation a été annulée et n'est plus active.
                    </p>
                </motion.div>
            )}

            <motion.div
                className={cn(
                    "space-y-2",
                    isCancelled && "opacity-75"
                )}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
            >
                <p className={cn(
                    "flex items-center gap-1",
                    isCancelled ? "text-gray-600" : "text-gray-700"
                )}>
                    <Rocket
                        className={cn(
                            "inline-block w-4 h-4",
                            isCancelled ? "text-red-400" : "text-primary"
                        )}
                        aria-hidden="true"
                    />
                    <span className={isCancelled ? "line-through" : ""}>
                        {formatDateWithTime(new Date(selectedBooking.startDate))}
                    </span>
                </p>
                <p className={cn(
                    "flex items-center gap-1",
                    isCancelled ? "text-gray-600" : "text-gray-700"
                )}>
                    <Goal
                        className={cn(
                            "inline-block w-4 h-4",
                            isCancelled ? "text-red-400" : "text-primary"
                        )}
                        aria-hidden="true"
                    />
                    <span className={isCancelled ? "line-through" : ""}>
                        {formatDateWithTime(new Date(selectedBooking.endDate))}
                    </span>
                </p>
                <p className={cn(
                    "flex items-center gap-1",
                    isCancelled ? "text-gray-600" : "text-gray-700"
                )}>
                    <CircleUser
                        className={cn(
                            "inline-block w-4 h-4",
                            isCancelled ? "text-red-400" : "text-primary"
                        )}
                        aria-hidden="true"
                    />
                    <span className={isCancelled ? "line-through" : ""}>
                        {selectedBooking.user.firstName} {selectedBooking.user.lastName}
                    </span>
                </p>
                <p className={cn(
                    "flex items-center gap-1 font-medium",
                    isCancelled ? "text-red-700" : "text-gray-700"
                )}>
                    {getStatusIcon(selectedBookingStatus)}
                    <span className={cn(
                        "px-2 py-1 rounded-full text-sm border",
                        {
                            'text-green-700 bg-green-50 border-green-200': selectedBookingStatus === 'En cours',
                            'text-blue-700 bg-blue-50 border-blue-200': selectedBookingStatus === 'À venir',
                            'text-red-700 bg-red-50 border-red-200': selectedBookingStatus === 'Annulée',
                            'text-gray-700 bg-gray-50 border-gray-200': selectedBookingStatus === 'Terminée'
                        }
                    )}>
                        {selectedBookingStatus}
                    </span>
                </p>
            </motion.div>

            {isCancelled && (
                <motion.div
                    className="absolute inset-0 bg-red-50/30 rounded-xl pointer-events-none"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                />
            )}
        </motion.div>
    );
};

export default SelectedBooking;