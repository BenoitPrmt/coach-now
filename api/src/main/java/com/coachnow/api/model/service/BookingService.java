package com.coachnow.api.model.service;

import com.coachnow.api.model.entity.Booking;
import com.coachnow.api.model.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.*;
import java.text.DateFormat;

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

    public SequencedCollection<Booking> getBookingsByCoach(String coachId, String startDate, String endDate) throws ParseException {
        DateFormat df = DateFormat.getDateInstance(DateFormat.LONG, Locale.FRANCE);

        Date startDateFormatted = null;
        Date endDateFormatted = null;

        if (startDate != null) {
            startDateFormatted = df.parse(startDate);
        }

        if (endDate != null) {
            endDateFormatted = df.parse(endDate);
        }

        if (startDateFormatted == null && endDateFormatted == null) {
            return bookingRepository.findByCoachId(coachId);
        } else if (startDateFormatted != null && endDateFormatted != null) {
            return bookingRepository.findByCoachIdAndStartDateAfterAndEndDateBefore(
                    coachId,
                    startDateFormatted,
                    endDateFormatted
            );
        } else if (startDateFormatted != null) {
            return bookingRepository.findByCoachIdAndStartDateAfter(coachId, startDateFormatted);
        } else {
            return bookingRepository.findByCoachIdAndEndDateBefore(coachId, endDateFormatted);
        }
    }
}
