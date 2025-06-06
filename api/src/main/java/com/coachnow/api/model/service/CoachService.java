package com.coachnow.api.model.service;

import com.coachnow.api.model.entity.Booking;
import com.coachnow.api.model.entity.Coach;
import com.coachnow.api.model.repository.CoachRepository;
import com.coachnow.api.web.response.coach.availability.DayAvailability;
import com.coachnow.api.web.response.coach.availability.HourAvailability;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Service
public class CoachService {
    @Autowired
    private CoachRepository coachRepository;

    public List<Coach> selectAll() {
        return (List<Coach>) coachRepository.findAll();
    }

    public Coach select(String id) {
        Optional<Coach> optionalPlayer = coachRepository.findById(id);
        return optionalPlayer.orElse(null);
    }

    public Coach save(Coach coach) {
        return coachRepository.save(coach);
    }

    public void delete(String id) {
        coachRepository.deleteById(id);
    }

    public void delete(Coach coach) {
        coachRepository.delete(coach);
    }

    public Boolean userHasCoach(String userId) {
        return coachRepository.findByUser_Id(userId) != null;
    }

    public List<DayAvailability> getAvailabilities(String coachId, Date startDate, Date endDate) throws ParseException {
        Coach coach = select(coachId);

        if (coach == null) {
            throw new IllegalArgumentException("Coach with id " + coachId + " does not exist.");
        }

        if (startDate == null || endDate == null) {
            throw new IllegalArgumentException("Start date and end date must be provided.");
        }

        if (startDate.after(endDate)) {
            throw new IllegalArgumentException("Start date cannot be after end date.");
        }

        if (TimeUnit.DAYS.convert(endDate.getTime() - startDate.getTime(), TimeUnit.MILLISECONDS) > 45) {
            throw new IllegalArgumentException("The date range cannot exceed 30 days.");
        }

        List<Booking> bookings = coach.getBookings();
        return generateAvailabilitiesWithBookings(bookings, startDate, endDate);
    }

    public List<DayAvailability> generateAvailabilitiesWithBookings(List<Booking> bookings, Date startDate, Date endDate) throws ParseException {
        DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        List<String> datesBetween = getStrings(startDate, endDate);

        List<DayAvailability> availabilities = new ArrayList<>();
        for (String rawDate : datesBetween) {
            DayAvailability dayAvailability = new DayAvailability(formatter.parse(rawDate + " 00:00:00"), new ArrayList<>());
            for (int hour = 9; hour <= 20; hour++) {
                HourAvailability hourAvailability = new HourAvailability(
                        String.format("%02d:00", hour),
                        String.format("%02d:00", hour + 1),
                        true
                );
                String date = rawDate + " " + hour + ":00:00.0";
                for (Booking booking : bookings) {
                    Calendar calendar = Calendar.getInstance();
                    calendar.setTime(booking.getEndDate());
                    int bookingEndHour = calendar.get(Calendar.HOUR_OF_DAY);

                    if (booking.getStartDate().toString().equals((date)) &&
                        bookingEndHour == hour + 1) {
                        hourAvailability.setAvailable(false);
                        break;
                    }
                }
                dayAvailability.getHours().add(hourAvailability);
            }
            availabilities.add(dayAvailability);
        }

        return availabilities;
    }

    private static List<String> getStrings(Date startDate, Date endDate) {
        List<String> datesBetween = new ArrayList<>();
        for (long i = startDate.getTime(); i <= endDate.getTime(); i += 86400000) {
            Date date = new Date(i);
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date);
            datesBetween.add(
                    String.format("%04d-%02d-%02d",
                            calendar.get(Calendar.YEAR),
                            calendar.get(Calendar.MONTH) + 1,
                            calendar.get(Calendar.DAY_OF_MONTH))
            );
        }
        return datesBetween;
    }

    public Boolean isCoachAvailable(String coachId, Date startDate, Date endDate) throws ParseException {
        List<DayAvailability> availabilities = getAvailabilities(coachId, startDate, endDate);

        String hourStart = new SimpleDateFormat("HH:mm").format(startDate);
        String hourEnd = new SimpleDateFormat("HH:mm").format(endDate);

        for (DayAvailability dayAvailability : availabilities) {
            for (HourAvailability hourAvailability : dayAvailability.getHours()) {
                if (hourAvailability.getStart().equals(hourStart) && hourAvailability.getEnd().equals(hourEnd)) {
                    return hourAvailability.isAvailable();
                }
            }
        }
        return false;
    }
}
