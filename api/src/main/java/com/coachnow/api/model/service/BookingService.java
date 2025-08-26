package com.coachnow.api.model.service;

import com.coachnow.api.model.entity.Booking;
import com.coachnow.api.model.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

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
  
  
    public SequencedCollection<Booking> getBookingsByCoach(String coachId, String startDate, String endDate) {
        Date startDateFormatted = null;
        Date endDateFormatted = null;

        try {
            if (startDate != null) {
                DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                startDateFormatted = formatter.parse(startDate);
            }

            if (endDate != null) {
                DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                endDateFormatted = formatter.parse(endDate);
            }
        } catch (ParseException e) {
            throw new RuntimeException(e);
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
