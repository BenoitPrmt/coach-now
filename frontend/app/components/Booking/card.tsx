import type {Booking} from "~/types";
import React, {useCallback, useMemo} from "react";
import {motion} from "motion/react";
import {cn} from "~/lib/utils";
import {Link} from "react-router";
import CoachImage from "~/components/Coach/CoachImage";
import {Calendar, Clock, Euro} from "lucide-react";
import {formatDate} from "~/lib/time";

const BookingCard = ({booking, index}: { booking: Booking; index: number }) => {
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);
    const durationMs = endDate.getTime() - startDate.getTime();
    const totalMinutes = Math.floor(durationMs / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const displayDuration = useCallback((
        hours: number,
        minutes: number
    ) => {
        if (hours === 0 && minutes === 0) return "0min";
        return new Intl.NumberFormat('fr-FR', {
            minimumIntegerDigits: 1,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(hours) + 'h' + (minutes > 0 ? minutes : '');
    }, []);

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

    console.log(booking.coach.sports)

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
                <div className={cn('px-3 py-1 rounded-full text-xs font-medium',
                    bookingStatus === "Annulée" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" :
                        bookingStatus === "À venir" ? "bg-yellow-100 text-yellow-800" :
                            bookingStatus === "En cours" ? "bg-green-100 text-green-800" :
                                "bg-gray-100 text-gray-800"
                )}>
                    {bookingStatus}
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
                        )}>Début</p>
                        <p className={cn(
                            "text-xs text-gray-500",
                            isBookingCancelled && "text-gray-400"
                        )}>{
                            formatDate(startDate)
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
                            displayDuration(hours, minutes)
                        }</p>
                    </div>
                </div>
                <div className="flex items-center md:justify-center space-x-2">
                    <Calendar className={cn(
                        "w-4 h-4 text-gray-400",
                        isBookingCancelled && "text-gray-300"
                    )}/>
                    <div>
                        <p className={cn(
                            "text-sm font-medium",
                            isBookingCancelled && "text-gray-400"
                        )}>Fin</p>
                        <p className={cn(
                            "text-xs text-gray-500",
                            isBookingCancelled && "text-gray-400"
                        )}>{formatDate(endDate)}</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-neutral-600">
                <div className="flex items-center space-x-2">
                    <Euro className={cn(
                        "w-4 h-4 text-green-600",
                        isBookingCancelled && "text-gray-400"
                    )}/>
                    <span className={cn(
                        "font-bold text-green-600",
                        isBookingCancelled && "text-gray-400 line-through"
                    )}>{booking.totalPrice}€</span>
                </div>
                <div className={cn(
                    "text-xs text-gray-500",
                    isBookingCancelled && "text-gray-400"
                )}>
                    {booking.coach.hourlyRate}€/h
                </div>
                {
                    booking.coach.levels && booking.coach.levels.length > 0 && (
                        <div className="flex items-center space-x-1">
                            {booking.coach.levels.map((level, i) => (
                                <span
                                    key={`${booking.id}-level-${level}-${i}`}
                                    className={cn(
                                        "px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium",
                                        isBookingCancelled && "bg-gray-100 text-gray-500"
                                    )}>
                                    {level}
                                </span>
                            ))}
                        </div>
                    )
                }
                {booking.coach.sports && booking.coach.sports.length > 0 && (
                        <div className="flex items-center space-x-1">
                            {booking.coach.sports.map((sport, i) => (
                                <span
                                    key={`${booking.id}-sport-${sport}-${i}`}
                                    className={cn(
                                        "px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium",
                                        isBookingCancelled && "bg-gray-100 text-gray-500"
                                    )}>
                                    {sport}
                                </span>
                            ))}
                        </div>
                    )
                }
            </div>
        </motion.div>
    );
};

export default BookingCard;