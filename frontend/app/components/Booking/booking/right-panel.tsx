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
                           }: {
    date: DateValue;
    timeZone: string;
    weeksInMonth: number;
    handleChangeAvailableTime: (time: string) => void;
}) {
    const {locale} = useLocale();
    const [dayNumber, dayName] = date
        .toDate(timeZone)
        .toLocaleDateString(locale, {
            weekday: "short",
            day: "numeric",
        })
        .split(" ");

    const {getAvailabilityByDate, selectedDate} = useBooking({
        coachId: "304cad21-c1a2-456d-a1fe-6f3b5485aa5b",
    });

    const [availableTimes, setAvailableTimes] = useState<HourAvailability[]>([]);

    useEffect(() => {
        const availability = getAvailabilityByDate(selectedDate);
        // console.log("Availability for date:", selectedDate, availability);
        if (availability) {
            setAvailableTimes(availability.hours);
        }
    }, [selectedDate]);


    return (
        <div
            defaultValue="24"
            className="flex flex-col gap-4 w-[280px] border-l pl-6"
        >
            <div className="flex justify-between items-center">
                <p
                    aria-hidden
                    className="flex-1 align-center font-bold text-md text-gray-950"
                >
                    {dayName} <span className="text-gray-11">{dayNumber}</span>
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
                        {availableTimes.map((availableTime) => (
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
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
