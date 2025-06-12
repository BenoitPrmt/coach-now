import {formatDateWithTime} from "~/lib/time";
import {ANIMATIONS} from "~/constants";
import {motion} from "motion/react";
import type {Booking} from "~/types";
import {CalendarIcon} from "lucide-react";
import {cn} from "~/lib/utils";
import {useMemo} from "react";
import {getBookingStatus} from "~/lib/booking";

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

    const bookingStatus = useMemo(() => getBookingStatus(booking), [booking]);

    const isCancelled = bookingStatus === 'Annulée';

    return (
        <motion.div
            key={booking.id}
            className={cn(
                "p-6 border rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden",
                selectedBooking?.id === booking.id
                    ? 'border-primary/30 bg-gradient-to-br from-primary/5 to-primary-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-primary/20 hover:shadow-lg',
                isCancelled && 'border-red-200 bg-gradient-to-br from-red-50/80 to-gray-50/80 hover:border-red-300 opacity-80'
            )}
            variants={BOOKING_CARD_VARIANTS}
            initial="hidden"
            animate="visible"
            whileHover={isCancelled ? "cancelled" : "hover"}
            whileTap="tap"
            onClick={() => setSelectedBooking(booking)}
        >

            <motion.h3
                className={cn(
                    "text-lg font-semibold mb-3 pr-20",
                    selectedBooking?.id === booking.id ? 'text-primary/80' : 'text-gray-800',
                    isCancelled && 'text-gray-600 line-through'
                )}
                layoutId={`booking-title-${booking.id}`}
            >
                {booking.user.firstName} {booking.user.lastName}
            </motion.h3>

            <motion.div className="flex items-center justify-between">
                <motion.p className={cn(
                    "flex items-center text-sm",
                    isCancelled ? 'text-gray-500' : 'text-gray-600'
                )}>
                    <CalendarIcon
                        className={cn(
                            "inline-block mr-1 w-4 h-4",
                            isCancelled && 'text-gray-400'
                        )}
                        aria-hidden="true"
                    />
                    {formatDateWithTime(new Date(booking.startDate))}
                </motion.p>
                <motion.div className={cn(
                    'text-sm font-medium px-2 py-1 rounded-full border',
                    {
                        'text-green-700 bg-green-50 border-green-200': bookingStatus === 'En cours',
                        'text-blue-700 bg-blue-50 border-blue-200': bookingStatus === 'À venir',
                        'text-red-700 bg-red-50 border-red-200': bookingStatus === 'Annulée',
                        'text-gray-700 bg-gray-50 border-gray-200': bookingStatus === 'Terminée'
                    }
                )}>
                    {bookingStatus}
                </motion.div>
            </motion.div>

            {isCancelled && (
                <motion.div
                    className="absolute inset-0 bg-red-100/20 pointer-events-none"
                    initial={{opacity: 0}}
                    whileHover={{opacity: 1}}
                    transition={{duration: 0.2}}
                />
            )}
        </motion.div>
    );
};

export default GridElement;