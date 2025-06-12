import React from 'react';
import type {Booking} from "~/types";
import {Button} from "~/components/ui/button";
import {CircleUser, Goal, Rocket, XIcon} from "lucide-react";
import {motion} from "framer-motion";
import {formatDateWithTime} from "~/lib/time";
import {ANIMATIONS} from "~/constants";


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
    return (
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
    );
};

export default SelectedBooking;
