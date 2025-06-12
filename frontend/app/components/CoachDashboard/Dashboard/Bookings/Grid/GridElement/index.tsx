import {formatDateWithTime} from "~/lib/time";
import {ANIMATIONS} from "~/constants";
import {motion} from "motion/react";
import type {Booking} from "~/types";
import {CalendarIcon} from "lucide-react";
import {cn} from "~/lib/utils";

const {
    BOOKING_CARD_VARIANTS
} = ANIMATIONS;

type Props = {
    booking: Booking;
    selectedBooking: Booking | null;
    setSelectedBooking: (booking: Booking | null) => void;
}

const GridElement = ({
                         booking,
                         selectedBooking,
                         setSelectedBooking
                     }: Props) => {
    return (
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
    );
};

export default GridElement;
