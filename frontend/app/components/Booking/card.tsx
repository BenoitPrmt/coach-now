import type {Booking, Rating} from "~/types";
import React, {useCallback, useMemo} from "react";
import {motion} from "motion/react";
import {cn} from "~/lib/utils";
import {Link} from "react-router";
import CoachImage from "~/components/Coach/CoachImage";
import {Calendar, Clock, Euro, Star} from "lucide-react";
import {displayDuration, formatDateWithTime, getDurationFromDate} from "~/lib/time";
import {ManageBooking} from "~/components/Booking/booking/manage/ManageBooking";
import CoachBadge from "~/components/Coach/CoachCard/CoachBadge";
import type {TimeDuration} from "~/types/Time";
import {Button} from "~/components/ui/button";

const BookingCard = ({userProfile, booking, index, onRate}: {
    userProfile?: {
        ratings?: Rating[];
    },
    booking: Booking;
    index: number,
    onRate?: (booking: Booking) => void;
}) => {
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);
    const duration: TimeDuration = getDurationFromDate(new Date(booking.startDate), new Date(booking.endDate));

    const userCanRate = useMemo(() => {
        if (!userProfile) return false;
        console.log(`Checking if user can rate coach: ${booking?.coach.id}`, userProfile.ratings?.some(rating => rating.coach.id === booking?.coach.id));
        return userProfile.ratings?.some(rating => rating.coach.id === booking?.coach.id);
    }, [booking.coach.id, userProfile]);

    const handleRateClick = useCallback(() => {
        if (onRate) {
            onRate(booking);
        }
    }, [onRate, booking]);

    const bookingStatus = useMemo(() => {
        if (!booking.isActive) {
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
    }, [booking.isActive]);

    const isBookingCancelled = !booking.isActive;

    return (
        <motion.div
            className={cn(
                "bg-white dark:bg-neutral-700 rounded-xl p-6 transition-all duration-300",
                isBookingCancelled && "opacity-60 grayscale bg-gray-50 dark:bg-gray-800"
            )}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: index * 0.1}}
        >
            <div className="flex justify-between items-start mb-4">
                <Link
                    to={`/coach/${booking.coach.id}`}
                    className={cn(
                        "flex items-center space-x-3 hover:underline",
                        isBookingCancelled && "pointer-events-none"
                    )}
                >
                    <CoachImage
                        src={booking.coach.profilePictureUrl}
                        alt={`${booking.coach.user.firstName} ${booking.coach.user.lastName}`}
                        className={cn(
                            "w-12 h-12 rounded-full object-cover shadow-sm",
                            isBookingCancelled && "grayscale opacity-70"
                        )}
                    />
                    <div>
                        <h4 className={cn(
                            "font-semibold text-gray-900 dark:text-white",
                            isBookingCancelled && "text-gray-500 dark:text-gray-400"
                        )}>
                            Coach {booking.coach.user.firstName} {booking.coach.user.lastName}
                        </h4>
                    </div>
                </Link>
                <div className="flex flex-row items-center space-x-2">
                    {bookingStatus === "À venir" && (
                        <ManageBooking booking={booking}/>
                    )}
                    {bookingStatus === "Terminée" && onRate && userCanRate && (
                        <Button
                            onClick={handleRateClick}
                            variant="ghost"
                            size="icon"
                            className="p-0.5 rounded-full hover:text-yellow-500 hover:bg-slate-100 transition-colors"
                        >
                            <span className="sr-only">Noter le coach</span>
                            <Star/>
                        </Button>
                    )}
                    <div className={cn('px-3 py-1 rounded-full text-xs font-medium',
                        bookingStatus === "Annulée" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" :
                            bookingStatus === "À venir" ? "bg-yellow-100 text-yellow-800" :
                                bookingStatus === "En cours" ? "bg-green-100 text-green-800" :
                                    "bg-gray-100 text-gray-800"
                    )}>
                        {bookingStatus}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center md:justify-center space-x-2">
                    <Calendar className={cn(
                        "w-4 h-4 text-gray-400",
                        isBookingCancelled && "text-gray-300"
                    )}/>
                    <div>
                        <p className={cn(
                            "text-sm font-medium",
                            isBookingCancelled && "text-gray-400"
                        )}>Date</p>
                        <p className={cn(
                            "text-xs text-gray-500",
                            isBookingCancelled && "text-gray-400"
                        )}>{
                            formatDateWithTime(startDate)
                        }</p>
                    </div>
                </div>
                <div className="flex items-center md:justify-center space-x-2">
                    <Clock className={cn(
                        "w-4 h-4 text-gray-400",
                        isBookingCancelled && "text-gray-300"
                    )}/>
                    <div>
                        <p className={cn(
                            "text-sm font-medium",
                            isBookingCancelled && "text-gray-400"
                        )}>Durée</p>
                        <p className={cn(
                            "text-xs text-gray-500",
                            isBookingCancelled && "text-gray-400"
                        )}>{
                            displayDuration(duration.hours, duration.minutes)
                        }</p>
                    </div>
                </div>
                <div className="flex items-center md:justify-center space-x-2">
                    <Euro className={cn(
                        "w-4 h-4 text-gray-400",
                        isBookingCancelled && "text-gray-300"
                    )}/>
                    <div>
                        <p className={cn(
                            "text-sm font-medium",
                            isBookingCancelled && "text-gray-400"
                        )}>Tarif</p>
                        <p className={cn(
                            "text-xs text-gray-500",
                            isBookingCancelled && "text-gray-400"
                        )}>{booking.totalPrice} €</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-neutral-600">
                {
                    booking.coach.levels && booking.coach.levels.length > 0 && (
                        <div className="flex items-center space-x-1">
                            {booking.coach.levels.length > 0 && (
                                booking.coach.levels.map((level, index) => (
                                    <CoachBadge value={level} className="mr-1 my-0.5" key={index}/>
                                ))
                            )}
                        </div>
                    )
                }
                {booking.coach.sports && booking.coach.sports.length > 0 && (
                    <div className="flex items-center space-x-1">
                        {booking.coach.sports.map((sport, index) => (
                            <CoachBadge value={sport} className="mr-1 my-0.5" key={index}/>
                        ))}
                    </div>
                )
                }
            </div>
        </motion.div>
    );
};

export default BookingCard;