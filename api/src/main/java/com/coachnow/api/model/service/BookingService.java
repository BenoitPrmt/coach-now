package com.coachnow.api.model.service;

import com.coachnow.api.model.entity.Booking;
import com.coachnow.api.model.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    public List<Booking> selectAll() {
        return (List<Booking>) bookingRepository.findAll();
    }

    public List<Booking> selectAllByCoachId(String coachId) {
        return bookingRepository.findByCoachId(coachId);
    }

    public Booking select(String id) {
        Optional<Booking> optionalPlayer = bookingRepository.findById(id);
        return optionalPlayer.orElse(null);
    }

    public Booking save(Booking booking) {
        return bookingRepository.save(booking);
    }

    public void delete(String id) {
        bookingRepository.deleteById(id);
    }

    public void delete(Booking booking) {
        bookingRepository.delete(booking);
    }

    public boolean userHasBookedWithCoach(String userId, String coachId) {
        return bookingRepository.existsByUserIdAndCoachIdAndEndDateBefore(userId, coachId, new Date());
    }

    public Booking getBookingByCoachAndUser(String coachId, String userId) {
        return bookingRepository.findByCoachIdAndUserId(coachId, userId)
                .orElse(null);
    }

    public List<Booking> sortBookingsByStartDate(List<Booking> bookings) {
        bookings.sort((b1, b2) -> {
            Date startDate1 = b1.getStartDate();
            Date startDate2 = b2.getStartDate();
            return startDate2.compareTo(startDate1);
        });
        return bookings;
    }

    public void cancelBookingsBetweenDates(String coachId, Date startDate, Date endDate) {
        List<Booking> bookings = bookingRepository.findByCoachIdAndStartDateBetween(coachId, startDate, endDate);
        for (Booking booking : bookings) {
            booking.setIsActive(false);
            bookingRepository.save(booking);
        }
    }
}
