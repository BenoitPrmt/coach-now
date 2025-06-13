import {Users} from "lucide-react";
import {motion} from "motion/react";
import type {Booking, TimelineDayType} from "~/types";
import {formatBookingDisplayDate} from "~/lib/time";
import TimelineCard from "~/components/CoachDashboard/Dashboard/Bookings/Timeline/TimeLineDay/TimelineCard";
import {ANIMATIONS} from "~/constants";

const {TIMELINE_DAY_VARIANTS} = ANIMATIONS;

type Props = {
    day: TimelineDayType;
    selectedBooking: Booking | null;
    setSelectedBooking: (booking: Booking | null) => void;
}

const TimelineDay = ({
                         day,
                         selectedBooking,
                         setSelectedBooking
                     }: Props) => {
    return (
        <motion.div
            className="relative flex items-start space-x-6 pb-8"
            variants={TIMELINE_DAY_VARIANTS}
        >
            <div className="relative flex-shrink-0">
                <div
                    className="w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10 relative"></div>
                <motion.div
                    className="absolute -top-1 -right-1 bg-red-500 dark:bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold shadow-md"
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    transition={{delay: 0.2}}
                >
                    {day.count}
                </motion.div>
            </div>

            <div className="flex-1 min-w-0">
                <motion.div
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-lg dark:shadow-gray-900/20 transition-shadow duration-300 overflow-hidden"
                    whileHover={{y: -2}}
                >
                    <div
                        className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                        <div className="flex max-md:flex-col items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 capitalize">
                                {formatBookingDisplayDate(day.date)}
                            </h3>
                            <div
                                className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4"/>
                                    <span>{day.count} réservation{day.count > 1 ? 's' : ''}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 space-y-3">
                        {day.bookings.map((booking) => (
                            <TimelineCard
                                key={booking.id}
                                booking={booking}
                                selectedBooking={selectedBooking}
                                setSelectedBooking={setSelectedBooking}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default TimelineDay;