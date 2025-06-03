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

        List<Booking> bookings = coach.getBookings();
        return generateAvailabilitiesWithBookings(bookings, startDate, endDate);
    }

    public List<DayAvailability> generateAvailabilitiesWithBookings(List<Booking> bookings, Date startDate, Date endDate) throws ParseException {
        DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        List<Date> datesBetween = new ArrayList<>();
        for (long i = startDate.getTime(); i <= endDate.getTime(); i += 86400000) {
            Date date = new Date(i);
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date);
            datesBetween.add(
                    formatter.parse(String.format("%04d-%02d-%02d 00:00:00",
                            calendar.get(Calendar.YEAR),
                            calendar.get(Calendar.MONTH) + 1,
                            calendar.get(Calendar.DAY_OF_MONTH)))
            );
        }

        List<DayAvailability> availabilities = new ArrayList<>();
        for (Date date : datesBetween) {
            DayAvailability dayAvailability = new DayAvailability(date, new ArrayList<>());
            for (int hour = 15; hour <= 18; hour++) {
                HourAvailability hourAvailability = new HourAvailability(
                        String.format("%02d:00:00", hour),
                        String.format("%02d:00:00", hour + 1),
                        true
                );
                for (Booking booking : bookings) {
                    Calendar calendar = Calendar.getInstance();
                    calendar.setTime(booking.getEndDate());
                    int bookingEndHour = calendar.get(Calendar.HOUR_OF_DAY);

                    if (booking.getStartDate().equals((date)) &&
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

    public Boolean areDateSameDay(Date date1, Date date2) {
        Calendar cal1 = Calendar.getInstance();
        cal1.setTime(date1);
        Calendar cal2 = Calendar.getInstance();
        cal2.setTime(date2);
        return cal1.get(Calendar.YEAR) == cal2.get(Calendar.YEAR) &&
               cal1.get(Calendar.DAY_OF_YEAR) == cal2.get(Calendar.DAY_OF_YEAR);
    }
}
