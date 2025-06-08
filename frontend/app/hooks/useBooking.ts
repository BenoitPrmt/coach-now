import {bookingStore, type CoachAvailabilities} from "~/store/bookingStore";
import {useUser} from "~/hooks/useUser";
import {CalendarDate, endOfMonth, startOfMonth} from "@internationalized/date";

type Props = {
    coachId: string;
}

export const useBooking = ({ coachId }: Props) => {
    const availabilities = bookingStore((state) => state.availabilities);
    const setAvailabilities = bookingStore((state) => state.setAvailabilities);
    const fetchAvailabilities = bookingStore((state) => state.fetchAvailabilities);
    const isLoading = bookingStore((state) => state.isLoading);

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

    const getMonthRangeFromCalendarDate = (calendarDate: CalendarDate) => {
        const startCD = startOfMonth(calendarDate);
        const endCD = endOfMonth(calendarDate);
        return {
            start: startCD.toString(),
            end: endCD.toString()
        };
    }

    const fetchCoachAvailabilitiesForMonth = (calendarDate: CalendarDate) => {
        const { start, end } = getMonthRangeFromCalendarDate(calendarDate);
        fetchAvailabilities(userToken, coachId, start, end);
    }

    const fetchCoachAvailabilitiesForDate = (date: string) => {
        const jsDate = new Date(date);
        const calendarDate = new CalendarDate(jsDate.getFullYear(), jsDate.getMonth() + 1, jsDate.getDate());
        fetchCoachAvailabilitiesForMonth(calendarDate);
    }

    const getAvailabilityByDate = (date: string): CoachAvailabilities | undefined => {
        return availabilities.find((availability) => {
            const availabilityDate = new Date(availability.date);
            return availabilityDate.toISOString().split("T")[0] === date.split("T")[0];
        });
    }

    const handleMonthChange = (direction: "next" | "prev") => {
        let newMonth: CalendarDate;
        const jsDate = new Date(selectedDate);
        const currentCalendarDate = new CalendarDate(jsDate.getFullYear(), jsDate.getMonth() + 1, jsDate.getDate());
        if (direction === "next") {
            newMonth = currentCalendarDate.add({ months: 1 });
        } else {
            newMonth = currentCalendarDate.subtract({ months: 1 });
        }
        setSelectedDate(dateToISOString(newMonth.toDate("Europe/Paris")));
        fetchCoachAvailabilitiesForMonth(newMonth);
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
        fetchCoachAvailabilitiesForDate,
        dateToISOString,
        isLoading
    };
};