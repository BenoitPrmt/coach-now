import {create} from "zustand";
import type {Rating, Booking} from "~/types";

export type RatingStore = {
    ratings: Rating[];
    setRatings: (ratings: Rating[]) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    selectedBooking: Booking | null;
    setSelectedBooking: (booking: Booking | null) => void;
    openRatingModal: (booking: Booking) => void;
    closeRatingModal: () => void;
}

export const ratingStore = create<RatingStore>((set) => ({
    ratings: [],
    setRatings: (ratings) => set({ratings}),
    isLoading: false,
    setIsLoading: (loading) => set({isLoading: loading}),
    isModalOpen: false,
    setIsModalOpen: (isOpen) => set({isModalOpen: isOpen}),
    selectedBooking: null,
    setSelectedBooking: (booking) => set({selectedBooking: booking}),
    openRatingModal: (booking) => set({
        isModalOpen: true,
        selectedBooking: booking
    }),
    closeRatingModal: () => set({
        isModalOpen: false,
        selectedBooking: null
    }),
}));

export const useRating = () => {
    const openRatingModal = ratingStore((state) => state.openRatingModal);
    const closeRatingModal = ratingStore((state) => state.closeRatingModal);
    const isModalOpen = ratingStore((state) => state.isModalOpen);
    const selectedBooking = ratingStore((state) => state.selectedBooking);

    return {
        isModalOpen,
        selectedBooking,
        openRatingModal,
        closeRatingModal,
    };
};