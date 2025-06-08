import {create} from 'zustand'
import {getAvailabilities} from "~/actions/coach.action";

export type HourAvailability = {
    start: string,
    end: string,
    available: boolean
}

export type CoachAvailabilities = {
    date: number;
    hours: HourAvailability[];
    isWorkingDay: boolean;
}


type BookingStore = {
    availabilities: CoachAvailabilities[] | [];
    setAvailabilities: (availabilities: CoachAvailabilities[]) => void;
    fetchAvailabilities: (bearerToken: any, coachId: string, dateStart: string, dateEnd: string) => Promise<void>;
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    selectedSlot: string | null;
    setSelectedSlot: (slot: string | null) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

export const bookingStore = create<BookingStore>((set) => ({
    availabilities: [],
    setAvailabilities: (availabilities) => set({availabilities}),
    isLoading: false,
    setIsLoading: (loading: boolean) => set({ isLoading: loading }),
    fetchAvailabilities: async (bearerToken: any, coachId: string, dateStart: string, dateEnd: string) => {
        set({ isLoading: true });
        try {
            const response = await getAvailabilities(bearerToken, coachId, dateStart, dateEnd);
            set({availabilities: response, isLoading: false})
            console.log("Fetched availabilities:", response);
        } catch (error) {
            set({ isLoading: false });
            console.error('Error fetching availabilities:', error);
        }
    },

    selectedDate: new Date(Date.now()).toISOString().split("T")[0],
    setSelectedDate: (date: string) => set({selectedDate: date}),
    selectedSlot: null,
    setSelectedSlot: (slot: string | null) => set({selectedSlot: slot })
}))
