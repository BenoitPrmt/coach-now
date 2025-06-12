import {Button} from "~/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import {ChevronDownIcon, PalmtreeIcon, SaveIcon, TrashIcon} from "lucide-react";
import {useEffect, useState} from "react";
import type {CoachUnavailability} from "~/types";
import {getUnavailabilites, isCoachAvailable} from "~/actions/coach.action";
import {toast} from "sonner";
import {formatDate, formatDateTimeForAPI, formatDateWithTime} from "~/lib/time";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import {Label} from "~/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "~/components/ui/tabs"
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {Calendar} from "~/components/ui/calendar";
import * as React from "react"
import {type DateRange} from "react-day-picker"
import {createBooking, deleteBooking} from "~/actions/booking.action";

type Props = {
    coachId: string;
    userId: string;
    userToken: string | null;
}

const rangeToRangeComplete = (range: DateRange): { from: Date, to: Date } => {
    return {
        from: new Date(range.from!.setHours(0, 0, 0, 0)),
        to: new Date(range.to!.setHours(23, 59, 59, 999))
    }
}

export function CoachHolidaysModal({coachId, userId, userToken}: Props) {
    const [unavailabilities, setUnavailabilities] = useState<CoachUnavailability[] | null>(null);
    const [range, setRange] = useState<DateRange | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isCoachAvailableInRange, setIsCoachAvailableInRange] = useState<boolean | null>(null);
    const [bookingsInRange, setBookingsInRange] = useState<number | null>(null);

    useEffect(() => {
        if (!userToken || unavailabilities || isLoading) return;
        console.log("Fetching unavailabilities for coachId:", coachId);
        setIsLoading(true);
        getUnavailabilites(userToken, coachId).then((data) => {
            setUnavailabilities(data);
            setIsLoading(false);
        }).catch(() => {
            toast.error("Erreur lors de la récupération des indisponibilités");
            setIsLoading(false);
        })
    }, []);

    const handleUnavailabilityCreate = () => {
        if (!range || !range.from || !range.to) return;

        const rangeComplete = rangeToRangeComplete(range);

        console.log(rangeComplete)

        createBooking(userToken, {
            startDate: formatDateTimeForAPI(rangeComplete.from),
            endDate: formatDateTimeForAPI(rangeComplete.to),
            isActive: true,
            totalPrice: 0,
            coachId,
            userId,
        }).then((data) => {
            data = {
                ...data,
                startDate: formatDateTimeForAPI(rangeComplete.from!),
                endDate: formatDateTimeForAPI(rangeComplete.to!),
            }
            setUnavailabilities(prevItems => {
                if (prevItems) {
                    return [data, ...prevItems];
                }
                return [data]
            })

            toast.success("Votre indisponibilité a bien été créée !")
        }).catch(() => {
            toast.error("Une erreur a eu lieu lors de la création, veuillez rééssayer plus tard")
        })
    }

    useEffect(() => {
        if (!range || !range.from || !range.to) return;

        const rangeComplete = rangeToRangeComplete(range);

        console.log("Checking coach availability for range:", rangeComplete);

        isCoachAvailable(userToken, coachId, formatDateTimeForAPI(rangeComplete.from), formatDateTimeForAPI(rangeComplete.to)).then((data) => {
            console.log("isCoachAvailable response:", data);
            setIsCoachAvailableInRange(data.isAvailable);
            setBookingsInRange(data.count);
        }).catch(() => {
            toast.error("Une erreur est survenue lors de la vérification de la disponibilité du coach.");
        })
    }, [range]);

    const onDeleteUnavailability = (unavailability: CoachUnavailability) => {
        console.log("Deleting unavailability:", unavailability);
        if (!userToken) {
            toast.error("Vous devez être connecté pour supprimer une indisponibilité.");
            return;
        }

        deleteBooking(userToken, unavailability.id).then((data) => {
            setUnavailabilities(prevItems => {
                if (!prevItems) return null;
                return prevItems.filter(item => item.id !== unavailability.id);
            });
            toast.success("Votre indisponibilité a bien été supprimée !");
        }).catch(() => {
            toast.error("Une erreur est survenue lors de la suppression de l'indisponibilité.");
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <PalmtreeIcon/>
                    Gérer mes indisponibilités
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl p-8 bg-white">
                <DialogHeader>
                    <DialogTitle>Gérer vos indisponibilités</DialogTitle>
                    <DialogDescription>
                        Visualisez et modifiez vos périodes d'indisponibilité <span className="italic">(vacances, impératifs, ...)</span>
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="view">
                    <TabsList className="grid w-full grid-cols-2 mb-4 p-1">
                        <TabsTrigger value="view">Voir</TabsTrigger>
                        <TabsTrigger value="create">Ajouter une indisponibilité</TabsTrigger>
                    </TabsList>
                    <TabsContent value="view">
                        <div className="flex gap-2 flex-col">
                            {isLoading ? (
                                <p>Chargement des indisponibilités...</p>
                            ) : (
                                unavailabilities && unavailabilities.length > 0 ? (
                                    unavailabilities
                                        .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
                                        .map((unavailability) => (
                                        <Card key={unavailability.startDate + unavailability.endDate} className="py-2">
                                            <CardContent>
                                                <div className="flex flex-row justify-between items-center">
                                                    {unavailability.startDate === unavailability.endDate ? (
                                                        <p className="text-sm">
                                                            Le <strong>{formatDateWithTime(new Date(unavailability.startDate))}</strong>
                                                        </p>
                                                    ) : (
                                                        <p className="text-sm">
                                                            Du <strong>{formatDateWithTime(new Date(unavailability.startDate))}</strong> au <strong>{formatDateWithTime(new Date(unavailability.endDate))}</strong>
                                                        </p>
                                                    )}
                                                    <Button variant="ghost" onClick={() => onDeleteUnavailability(unavailability)} className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0">
                                                        <TrashIcon/>
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                ) : (
                                    <p>Aucune indisponibilité enregistrée.</p>
                                )
                            )}
                        </div>
                    </TabsContent>
                    <TabsContent value="create">
                        <Card className="bg-gray-100">
                            <CardHeader>
                                <CardTitle>Ajout d'une disponibilité</CardTitle>
                                <CardDescription>
                                    Ajoutez une période d'indisponibilité : vacances, impératif, ...
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <form>
                                    <div className="flex flex-col gap-3">
                                        <Label htmlFor="dates" className="px-1">
                                            Sélectionnez vos dates d'indisponibilité
                                        </Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    id="dates"
                                                    className="w-full justify-between font-normal"
                                                >
                                                    {range?.from && range?.to
                                                        ? `${formatDate(range.from)} - ${formatDate(range.to)}`
                                                        : "Choisissez des dates"}
                                                    <ChevronDownIcon/>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                <Calendar
                                                    mode="range"
                                                    selected={range}
                                                    captionLayout="dropdown"
                                                    onSelect={(range) => {
                                                        setRange(range)
                                                    }}
                                                    lang="fr"
                                                />
                                            </PopoverContent>
                                            <p className="text-sm text-gray-500">Vous pouvez choisr un seul jour ou un
                                                interval de jours</p>
                                        </Popover>
                                    </div>
                                </form>
                                {isCoachAvailableInRange !== null && (
                                    <div className="text-sm text-gray-700">
                                        {isCoachAvailableInRange || !bookingsInRange || bookingsInRange === 0 ? (
                                            <p>Vous n'avez aucune réservation pour cette période.</p>
                                        ) : (
                                            <p>
                                                Vous avez <strong>{bookingsInRange}</strong> réservation{bookingsInRange > 1 ? 's' : ''} pour cette période. Si vous ajoutez cette indisponibilité, {bookingsInRange > 1 ? 'ces' : 'cette'} réservation{bookingsInRange > 1 ? 's' : ''} {bookingsInRange > 1 ? 'seront' : 'sera'} automatiquement annulée{bookingsInRange > 1 ? 's' : ''}.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleUnavailabilityCreate}>
                                    <SaveIcon/>
                                    Enregistrer l'indisponibilité
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
