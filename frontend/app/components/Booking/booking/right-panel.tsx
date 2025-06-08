import {Button} from "~/components/ui/button";
import {ScrollArea} from "~/components/ui/scroll-area";

import type {DateValue} from "@react-aria/calendar";
import {useLocale} from "@react-aria/i18n";
import {useBooking} from "~/hooks/useBooking";
import type {HourAvailability} from "~/store/bookingStore";
import {useEffect, useState} from "react";

export function RightPanel({
                               date,
                               timeZone,
                               weeksInMonth,
                               handleChangeAvailableTime,
    coachId
                           }: {
    date: DateValue;
    timeZone: string;
    weeksInMonth: number;
    handleChangeAvailableTime: (time: string) => void;
    coachId: string;
}) {
    const {locale} = useLocale();
    const [dayNumber, dayName] = date
        .toDate(timeZone)
        .toLocaleDateString(locale, {
            weekday: "short",
            day: "numeric",
        })
        .split(" ");

    const {
        getAvailabilityByDate,
        fetchCoachAvailabilitiesForDate,
        dateToISOString,
        isLoading
    } = useBooking({
        coachId,
    });

    const [availableTimes, setAvailableTimes] = useState<HourAvailability[]>([]);
    const isoDate = dateToISOString(date.toDate(timeZone));

    useEffect(() => {
        const availability = getAvailabilityByDate(isoDate);
        if (!availability) {
            fetchCoachAvailabilitiesForDate(isoDate);
        } else {
            setAvailableTimes(availability.hours);
        }
    }, [isoDate]);

    useEffect(() => {
        const availability = getAvailabilityByDate(isoDate);
        if (availability) {
            setAvailableTimes(availability.hours);
        }
    }, [getAvailabilityByDate(isoDate)]);

    return (
        <div
            defaultValue="24"
            className="flex flex-col gap-4 w-[280px] lg:border-l pl-6"
        >
            <div className="flex justify-between items-center">
                <p
                    aria-hidden
                    className="flex-1 align-center font-bold text-md text-gray-950"
                >
                    <span className="text-gray-11">{dayNumber}</span> {dayName}
                </p>
            </div>
            <div>
                <ScrollArea
                    type="always"
                    className="h-full"
                    style={{
                        maxHeight: weeksInMonth > 5 ? "380px" : "320px",
                    }}
                >
                    <div className="grid gap-2 pr-3">
                        {isLoading ? (
                            Array.from({ length: 4 }).map((_, idx) => (
                                <Button
                                    key={idx}
                                    variant="outline"
                                    disabled
                                    className="animate-pulse bg-gray-200 text-gray-200 border-gray-200"
                                >
                                    00:00
                                </Button>
                            ))
                        ) : (
                            availableTimes.map((availableTime) => (
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        handleChangeAvailableTime(
                                            availableTime.start
                                        )
                                    }
                                    key={availableTime.start}
                                    disabled={!availableTime.available}
                                >
                                    {availableTime.start}
                                </Button>
                            ))
                        )}
                        {!isLoading && availableTimes.length === 0 && (
                            <p className="text-gray-500 text-sm">
                                Aucune disponibilité pour cette date
                            </p>
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
