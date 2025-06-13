import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import {Calendar, CircleXIcon, Clock, Euro} from "lucide-react";
import type {Booking} from "~/types";
import {cn} from "~/lib/utils";
import CoachImage from "~/components/Coach/CoachImage";
import React, {useState} from "react";
import {displayDuration, formatDate, getDurationFromDate} from "~/lib/time";
import type {TimeDuration} from "~/types/Time";
import {toast} from "sonner";
import {cancelBooking} from "~/actions/booking.action";
import {useUser} from "~/hooks/useUser";

type Props = {
    booking: Booking;
}

export function ManageBooking({ booking }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const duration: TimeDuration = getDurationFromDate(new Date(booking.startDate), new Date(booking.endDate));

    const { userToken, user } = useUser();

    const handleCancelBooking = async () => {
        if (!userToken || !user) {
            toast.error("Vous devez être connecté pour annuler une réservation.", {
                description: "Veuillez vous connecter pour continuer.",
            });
            return;
        }

        cancelBooking(userToken, booking.id).then(() => {
            toast.success("Réservation annulée avec succès !");
            window.location.reload();

        }).catch(() => {
            toast.error("Une erreur est survenue lors de l'annulation de la réservation.", {
                description: "Veuillez réessayer plus tard.",
            });
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button variant="destructive" size="xs" className="rounded-xl">
                        <CircleXIcon />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Annuler</DialogTitle>
                        <DialogDescription>
                            Voulez-vous vraiment annuler cette réservation ? Cette action est irréversible.
                        </DialogDescription>
                    </DialogHeader>

                    <Card className="w-full max-w-sm">
                        <CardHeader>
                            <CardTitle className="flex flex-row items-center gap-2">
                                <CoachImage
                                    src={booking.coach.profilePictureUrl}
                                    alt={`${booking.coach.user.firstName} ${booking.coach.user.lastName}`}
                                    className={cn(
                                        "w-10 h-10 rounded-full object-cover shadow-sm",
                                    )}
                                />
                                <h2>{booking.coach.user.firstName} {booking.coach.user.lastName}</h2>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="flex flex-col items-center md:justify-center space-x-2">
                                    <div className="flex flex-row items-center space-x-2">
                                        <Calendar className={cn(
                                            "w-3 h-3",
                                        )}/>
                                        <p className={cn("text-sm font-medium")}>
                                            Date
                                        </p>
                                    </div>
                                    <p className={cn("text-xs text-gray-500")}>
                                        {formatDate(new Date(booking.startDate))}
                                    </p>
                                </div>
                                <div className="flex flex-col items-center md:justify-center space-x-2">
                                    <div className="flex flex-row items-center space-x-2">
                                        <Clock className={cn(
                                            "w-3 h-3",
                                        )}/>
                                        <p className={cn("text-sm font-medium")}>
                                            Durée
                                        </p>
                                    </div>
                                    <p className={cn("text-xs text-gray-500")}>
                                        {displayDuration(duration.hours, duration.minutes)}
                                    </p>
                                </div>

                                <div className="flex flex-col items-center md:justify-center space-x-2">
                                    <div className="flex flex-row items-center space-x-2">
                                        <Euro className={cn(
                                            "w-3 h-3",
                                        )}/>
                                        <p className={cn("text-sm font-medium")}>
                                            Tarif
                                        </p>
                                    </div>
                                    <p className={cn("text-xs text-gray-500")}>
                                        {booking.totalPrice} €
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Non, garder ma réservation</Button>
                        </DialogClose>
                        <Button type="submit" variant="destructive" onClick={handleCancelBooking}>
                            <CircleXIcon />
                            Annuler
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
