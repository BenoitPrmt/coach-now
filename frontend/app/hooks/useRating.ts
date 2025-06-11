import { useCallback } from 'react';
import { ratingStore } from "~/store/ratingStore";
import type { Booking } from '~/types';

export const useRating = () => {
    const {
        isModalOpen,
        setIsModalOpen,
        selectedBooking,
        setSelectedBooking,
        openRatingModal: storeOpenRatingModal,
        closeRatingModal: storeCloseRatingModal
    } = ratingStore(
        (state) => ({
            isModalOpen: state.isModalOpen,
            setIsModalOpen: state.setIsModalOpen,
            selectedBooking: state.selectedBooking,
            setSelectedBooking: state.setSelectedBooking,
            openRatingModal: state.openRatingModal,
            closeRatingModal: state.closeRatingModal,
        }),
    );

    const openRatingModal = useCallback((booking: Booking) => {
        storeOpenRatingModal(booking);
    }, [storeOpenRatingModal]);

    const closeRatingModal = useCallback(() => {
        storeCloseRatingModal();
    }, [storeCloseRatingModal]);

    return {
        isModalOpen,
        setIsModalOpen,
        selectedBooking,
        setSelectedBooking,
        openRatingModal,
        closeRatingModal,
    };
};