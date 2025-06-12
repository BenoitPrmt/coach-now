import type {Booking} from "~/types";
import {motion} from "framer-motion";
import {cn} from "~/lib/utils";
import {CircleUser, Clock} from "lucide-react";

const TimelineCard = (
    {
        booking,
        selectedBooking,
        setSelectedBooking
    }: {
        booking: Booking,
        selectedBooking: Booking | null,
        setSelectedBooking: (booking: Booking) => void
    }) => {
    return (
        <motion.div
            className={cn("flex max-md:flex-col items-center justify-between p-3 rounded-lg transition-colors duration-200 cursor-pointer",
                selectedBooking?.id === booking.id
                    ? "bg-primary/10 border border-primary/20"
                    : "bg-gray-50 hover:bg-primary/5"
            )}
            whileHover={{scale: 1.01}}
            whileTap={{scale: 1}}
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
    );
};

export default TimelineCard;
