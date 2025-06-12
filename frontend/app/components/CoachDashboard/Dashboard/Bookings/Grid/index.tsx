import React from 'react';
import type {Booking} from "~/types";
import BookingsError from "~/components/CoachDashboard/Dashboard/Bookings/Error";
import {AnimatePresence, motion} from "motion/react";
import {ANIMATIONS} from "~/constants";
import GridElement from "~/components/CoachDashboard/Dashboard/Bookings/Grid/GridElement";

const {
    CONTAINER_BOOKINGS_VARIANTS
} = ANIMATIONS;

type Props = {
    bookings: Booking[],
    selectedBooking: Booking | null;
    setSelectedBooking: (booking: Booking | null) => void;
}

const BookingsGrid = ({
                          bookings,
                          selectedBooking,
                          setSelectedBooking
                      }: Props) => {
    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
            variants={CONTAINER_BOOKINGS_VARIANTS}
            initial="hidden"
            animate="visible"
            key="default"
        >
            <AnimatePresence>
                {
                    bookings.length === 0 ? (
                        <BookingsError/>
                    ) : (
                        bookings.sort(
                            (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
                        ).map((booking) => (
                            <GridElement
                                booking={booking}
                                selectedBooking={selectedBooking}
                                setSelectedBooking={setSelectedBooking}
                            />
                        )))
                }
            </AnimatePresence>
        </motion.div>
    )
};

export default BookingsGrid;
