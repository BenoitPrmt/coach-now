import {bookingStore, type CoachAvailabilities} from "~/store/bookingStore";
import {useEffect} from "react";
import {useUser} from "~/hooks/useUser";
import {CalendarDate, endOfMonth, startOfMonth} from "@internationalized/date";

type Props = {
    coachId: string;
}

export const useBooking = ({ coachId }: Props) => {
    const availabilities = bookingStore((state) => state.availabilities);
    const setAvailabilities = bookingStore((state) => state.setAvailabilities);
    const fetchAvailabilities = bookingStore((state) => state.fetchAvailabilities);

    const {userToken} = useUser();

    const selectedDate = bookingStore((state) => state.selectedDate);
    const setSelectedDate = bookingStore((state) => state.setSelectedDate);
    const selectedSlot = bookingStore((state) => state.selectedSlot);
    const setSelectedSlot = bookingStore((state) => state.setSelectedSlot);

    const resetSelectedDate = () => {
        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0];
        setSelectedDate(formattedDate);
    }

    // useEffect(() => {
    //     console.log("useBooking useEffect - selectedDate:", selectedDate);
    //     const lastDayOfMonth: string = getLastDayOfMonth(new Date(selectedDate));
    //     console.log("Fetching availabilities for coach:", coachId, "from", selectedDate, "to", lastDayOfMonth);
    //     fetchAvailabilities(userToken, coachId, selectedDate, lastDayOfMonth);
    // }, []);

    const fetCoachAvailabilities = () => {
        const lastDayOfMonth: string = getLastDayOfMonth(new Date(selectedDate));
        fetchAvailabilities(userToken, coachId, selectedDate, lastDayOfMonth);
    }

    const getLastDayOfMonth = (date: Date): string => {
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return lastDay.toISOString().split("T")[0];
    }

    const getAvailabilityByDate = (date: string): CoachAvailabilities | undefined => {
        return availabilities.find((availability) => {
            const availabilityDate = new Date(availability.date);
            return availabilityDate.toISOString().split("T")[0] === date.split("T")[0];
        });
    }

    const handleMonthChange = (direction: "next" | "prev") => {
        console.log("handleMonthChange - direction:", direction, "selectedDate:", selectedDate);
        let newMonth: CalendarDate;
        if (direction === "next") {
            const nextMonth = new Date(selectedDate);
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            newMonth = new CalendarDate(
                nextMonth.getFullYear(),
                nextMonth.getMonth() + 1,
                nextMonth.getDate()
            )
        } else {
            const previousMonth = new Date(selectedDate);
            previousMonth.setMonth(previousMonth.getMonth() - 1);
            newMonth = new CalendarDate(
                previousMonth.getFullYear(),
                previousMonth.getMonth() + 1,
                previousMonth.getDate()
            )
        }

        setSelectedDate(dateToISOString(newMonth.toDate("Europe/Paris")));
        fetchAvailabilities(
            userToken,
            coachId,
            dateToISOString(startOfMonth(newMonth).toDate("Europe/Paris")),
            dateToISOString(endOfMonth(newMonth).toDate("Europe/Paris")),
        );
    }

    const dateToISOString = (date: Date): string => {
        return date.toISOString().split("T")[0];
    }

    return {
        availabilities,
        setAvailabilities,
        fetchAvailabilities,
        selectedDate,
        setSelectedDate,
        selectedSlot,
        setSelectedSlot,
        getAvailabilityByDate,
        resetSelectedDate,
        handleMonthChange,
        fetCoachAvailabilities,
        dateToISOString
    };
};