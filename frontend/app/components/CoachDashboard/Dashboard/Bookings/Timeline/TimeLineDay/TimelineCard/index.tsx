import type {Booking} from "~/types";
import {motion} from "motion/react";
import {cn} from "~/lib/utils";
import {CircleUser, Clock, XCircle, CheckCircle, CalendarCheck} from "lucide-react";
import {useMemo} from "react";
import {getBookingStatus} from "~/lib/booking";

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
    const bookingStatus = useMemo(() => getBookingStatus(booking), [booking]);
    const isCancelled = bookingStatus === 'Annulée';

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "À venir":
                return <Clock className="w-3 h-3 text-blue-500 dark:text-blue-400"/>;
            case "En cours":
                return <CheckCircle className="w-3 h-3 text-green-500 dark:text-green-400"/>;
            case "Terminée":
                return <CalendarCheck className="w-3 h-3 text-gray-500 dark:text-gray-400"/>;
            case "Annulée":
                return <XCircle className="w-3 h-3 text-red-500 dark:text-red-400"/>;
            default:
                return null;
        }
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "À venir":
                return "text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-300 dark:bg-blue-900/30 dark:border-blue-700/50";
            case "En cours":
                return "text-green-700 bg-green-50 border-green-200 dark:text-green-300 dark:bg-green-900/30 dark:border-green-700/50";
            case "Terminée":
                return "text-gray-700 bg-gray-50 border-gray-200 dark:text-gray-300 dark:bg-gray-800/50 dark:border-gray-600/50";
            case "Annulée":
                return "text-red-700 bg-red-50 border-red-200 dark:text-red-300 dark:bg-red-900/30 dark:border-red-700/50";
            default:
                return "text-gray-700 bg-gray-50 border-gray-200 dark:text-gray-300 dark:bg-gray-800/50 dark:border-gray-600/50";
        }
    };

    return (
        <motion.div
            className={cn(
                "flex max-md:flex-col items-center justify-between p-3 rounded-lg transition-colors duration-200 cursor-pointer relative",
                selectedBooking?.id === booking.id
                    ? isCancelled
                        ? "bg-red-50/80 border border-red-200/60 dark:bg-red-900/20 dark:border-red-700/40"
                        : "bg-primary/10 border border-primary/20 dark:bg-primary/20 dark:border-primary/30"
                    : isCancelled
                        ? "bg-red-25 hover:bg-red-50/60 border border-red-100/50 dark:bg-red-900/10 dark:hover:bg-red-900/20 dark:border-red-800/30"
                        : "bg-gray-50 hover:bg-primary/5 dark:bg-gray-800/50 dark:hover:bg-primary/10",
                isCancelled && "opacity-90"
            )}
            whileHover={{scale: isCancelled ? 1.005 : 1.01}}
            whileTap={{scale: 1}}
            onClick={() => setSelectedBooking(booking)}
        >
            <div className="flex max-md:flex-col items-center space-x-3">
                <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center relative",
                    isCancelled
                        ? "bg-red-100 ring-2 ring-red-200 dark:bg-red-900/30 dark:ring-red-700/50"
                        : "bg-primary/10 dark:bg-primary/20"
                )}>
                    <CircleUser className={cn(
                        "w-5 h-5",
                        isCancelled ? "text-red-500 dark:text-red-400" : "text-primary dark:text-primary"
                    )}/>
                    {isCancelled && (
                        <div
                            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 dark:bg-red-600 rounded-full flex items-center justify-center">
                            <XCircle className="w-2.5 h-2.5 text-white"/>
                        </div>
                    )}
                </div>
                <div>
                    <p className={cn(
                        "font-medium",
                        isCancelled
                            ? "text-gray-600 line-through dark:text-gray-400"
                            : "text-gray-900 dark:text-gray-100"
                    )}>
                        {booking.user.firstName} {booking.user.lastName}
                    </p>
                    <div className={cn(
                        "flex items-center gap-4 text-sm",
                        isCancelled ? "text-gray-500 dark:text-gray-500" : "text-gray-600 dark:text-gray-400"
                    )}>
                        <span className="flex items-center gap-1">
                            <Clock className={cn(
                                "w-3 h-3",
                                isCancelled && "text-gray-400 dark:text-gray-600"
                            )}/>
                            <span className={isCancelled ? "line-through" : ""}>
                                {new Date(booking.startDate).toLocaleTimeString('fr-FR', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        </span>
                        <span className={isCancelled ? "text-gray-400 dark:text-gray-600" : ""}>→</span>
                        <span className={isCancelled ? "line-through" : ""}>
                            {new Date(booking.endDate).toLocaleTimeString('fr-FR', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </span>
                    </div>
                </div>
            </div>

            <div className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border transition-all duration-200",
                getStatusStyles(bookingStatus),
                isCancelled && "animate-pulse"
            )}>
                {getStatusIcon(bookingStatus)}
                <span>{bookingStatus}</span>
            </div>

            {isCancelled && (
                <motion.div
                    className="absolute inset-0 bg-red-100/20 dark:bg-red-900/10 rounded-lg pointer-events-none"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.3}}
                />
            )}
        </motion.div>
    );
};

export default TimelineCard;