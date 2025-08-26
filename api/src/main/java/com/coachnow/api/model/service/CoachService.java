package com.coachnow.api.model.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import com.coachnow.api.model.repository.BookingRepository;
import com.coachnow.api.web.response.coach.IsCoachAvailable;
import com.coachnow.api.web.response.coach.unavailability.Unavailability;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coachnow.api.model.entity.Booking;
import com.coachnow.api.model.entity.Coach;
import com.coachnow.api.model.repository.CoachRepository;
import com.coachnow.api.web.response.coach.availability.DayAvailability;
import com.coachnow.api.web.response.coach.availability.HourAvailability;

@Service
public class CoachService {

    @Autowired
    private CoachRepository coachRepository;

    @Autowired
    private BookingRepository bookingRepository;

    public List<Coach> selectAll() {
        return (List<Coach>) coachRepository.findAll();
    }

    public List<Coach> selectAllWithPagination(int page, int pageSize, Optional<String> search, Optional<String> filter, Optional<String> filterBy, Optional<String> sortBy) {
        List<Coach> allCoaches = (List<Coach>) coachRepository.findAll();

        if (search.isPresent() && !search.get().trim().isEmpty()) {
            String searchTerm = search.get().toLowerCase().trim();
            allCoaches = allCoaches.stream()
                    .filter(coach -> matchesSearchCriteria(coach, searchTerm))
                    .collect(Collectors.toList());
        }

        if (filter.isPresent() && !filter.get().trim().isEmpty()
                && filterBy.isPresent() && !filterBy.get().trim().isEmpty()) {
            allCoaches = applyFilter(allCoaches, filter.get(), filterBy.get());
        }

        if (sortBy.isPresent() && !sortBy.get().trim().isEmpty()) {
            allCoaches = sortCoaches(allCoaches, sortBy.get());
        }

        int start = page * pageSize;
        if (start >= allCoaches.size()) {
            return Collections.emptyList();
        }

        int end = Math.min(start + pageSize, allCoaches.size());
        return allCoaches.subList(start, end);
    }

    private List<Coach> applyFilter(List<Coach> coaches, String filter, String filterBy) {
        return coaches.stream()
                .filter(coach -> matchesFilterCriteria(coach, filter, filterBy))
                .collect(Collectors.toList());
    }

    private boolean matchesFilterCriteria(Coach coach, String filter, String filterBy) {
        String filterValue = filter.toLowerCase().trim();

        switch (filterBy.toLowerCase()) {
            case "firstname":
                return coach.getUser().getFirstName() != null
                        && coach.getUser().getFirstName().toLowerCase().equals(filterValue);
            case "lastname":
                return coach.getUser().getLastName() != null
                        && coach.getUser().getLastName().toLowerCase().equals(filterValue);
            case "email":
                return coach.getUser().getEmail() != null
                        && coach.getUser().getEmail().toLowerCase().equals(filterValue);
            case "id":
                return coach.getId() != null
                        && coach.getId().toLowerCase().equals(filterValue);
            case "gender":
                return coach.getGender() != null
                        && coach.getGender().toString().toLowerCase().equals(filterValue);
            case "levels":
                return coach.getLevels() != null
                        && coach.getLevels().stream()
                                .anyMatch(level -> level.toString().toLowerCase().equals(filterValue));
            case "sports":
                return coach.getSports() != null
                        && coach.getSports().stream()
                                .anyMatch(sport -> sport.toString().toLowerCase().equals(filterValue));
            case "hourlyrate_min":
                try {
                    Float minRate = Float.parseFloat(filterValue);
                    return coach.getHourlyRate() != null && coach.getHourlyRate() >= minRate;
                } catch (NumberFormatException e) {
                    return false;
                }
            case "hourlyrate_max":
                try {
                    Float maxRate = Float.parseFloat(filterValue);
                    return coach.getHourlyRate() != null && coach.getHourlyRate() <= maxRate;
                } catch (NumberFormatException e) {
                    return false;
                }
            default:
                return true;
        }
    }

    private boolean matchesSearchCriteria(Coach coach, String searchTerm) {
        return (coach.getUser().getFirstName() != null && coach.getUser().getFirstName().toLowerCase().contains(searchTerm))
                || (coach.getUser().getLastName() != null && coach.getUser().getLastName().toLowerCase().contains(searchTerm))
                || (coach.getUser().getEmail() != null && coach.getUser().getEmail().toLowerCase().contains(searchTerm));
    }

    private List<Coach> sortCoaches(List<Coach> coaches, String sortBy) {
        if (sortBy == null || sortBy.trim().isEmpty()) {
            return coaches;
        }

        return coaches.stream()
                .sorted(getCoachComparator(sortBy))
                .collect(Collectors.toList());
    }

    private Comparator<Coach> getCoachComparator(String sortBy) {
        return switch (sortBy.toLowerCase()) {
            case "firstname" ->
                Comparator.comparing((Coach coach) -> coach.getUser().getFirstName() != null ? coach.getUser().getFirstName().toLowerCase() : "");
            case "lastname" ->
                Comparator.comparing((Coach coach) -> coach.getUser().getLastName() != null ? coach.getUser().getLastName().toLowerCase() : "");
            case "email" ->
                Comparator.comparing((Coach coach) -> coach.getUser().getEmail() != null ? coach.getUser().getEmail().toLowerCase() : "");
            case "gender" ->
                Comparator.comparing((Coach coach) -> coach.getGender() != null ? coach.getGender().toString().toLowerCase() : "");
            case "hourlyrate" ->
                Comparator.comparing((Coach coach) -> coach.getHourlyRate() != null ? coach.getHourlyRate() : 0.0f);
            case "hourlyrate_desc" ->
                Comparator.comparing((Coach coach) -> coach.getHourlyRate() != null ? coach.getHourlyRate() : 0.0f).reversed();
            default ->
                Comparator.comparing(Coach::getId);
        };
    }

    public int getTotalCountWithFilters(Optional<String> search, Optional<String> filter, Optional<String> filterBy) {
        List<Coach> allCoaches = (List<Coach>) coachRepository.findAll();

        if (search.isPresent() && !search.get().trim().isEmpty()) {
            String searchTerm = search.get().toLowerCase().trim();
            allCoaches = allCoaches.stream()
                    .filter(coach -> matchesSearchCriteria(coach, searchTerm))
                    .collect(Collectors.toList());
        }

        if (filter.isPresent() && !filter.get().trim().isEmpty()
                && filterBy.isPresent() && !filterBy.get().trim().isEmpty()) {
            allCoaches = applyFilter(allCoaches, filter.get(), filterBy.get());
        }

        return allCoaches.size();
    }

    public List<Coach> selectAllWithFilters(Optional<String> search, Optional<String> filter, Optional<String> filterBy, Optional<String> sortBy) {
        List<Coach> allCoaches = (List<Coach>) coachRepository.findAll();

        if (search.isPresent() && !search.get().trim().isEmpty()) {
            String searchTerm = search.get().toLowerCase().trim();
            allCoaches = allCoaches.stream()
                    .filter(coach -> matchesSearchCriteria(coach, searchTerm))
                    .collect(Collectors.toList());
        }

        if (filter.isPresent() && !filter.get().trim().isEmpty()
                && filterBy.isPresent() && !filterBy.get().trim().isEmpty()) {
            allCoaches = applyFilter(allCoaches, filter.get(), filterBy.get());
        }

        if (sortBy.isPresent() && !sortBy.get().trim().isEmpty()) {
            allCoaches = sortCoaches(allCoaches, sortBy.get());
        }

        return allCoaches;
    }

    public Coach select(String id) {
        Optional<Coach> optionalPlayer = coachRepository.findById(id);
        return optionalPlayer.orElse(null);
    }

    public Coach selectByUserId(String userId) {
        return coachRepository.findByUser_Id(userId);
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

        List<Booking> bookings = coach.getBookings().stream().filter((Booking booking) -> {
            return booking.getStartDate().after(startDate) && booking.getEndDate().before(endDate) && booking.getIsActive();
        }).collect(Collectors.toList());
        return generateAvailabilitiesWithBookings(bookings, startDate, endDate);
    }

    public List<DayAvailability> generateAvailabilitiesWithBookings(List<Booking> bookings, Date startDate, Date endDate) throws ParseException {
        DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        List<String> datesBetween = getStrings(startDate, endDate);

        List<DayAvailability> availabilities = new ArrayList<>();
        for (String rawDate : datesBetween) {
            DayAvailability dayAvailability = new DayAvailability(formatter.parse(rawDate + " 00:00:00"), new ArrayList<>());

            if (dayAvailability.getIsWorkingDay()) {
                for (int hour = 9; hour <= 20; hour++) {
                    HourAvailability hourAvailability = new HourAvailability(
                            String.format("%02d:00", hour),
                            String.format("%02d:00", hour + 1),
                            rawDate
                    );

                    if (!hourAvailability.isAvailable()) {
                        continue;
                    }

                    String date = rawDate + " " + hour + ":00:00.0";
                    for (Booking booking : bookings) {
                        Calendar calendar = Calendar.getInstance();
                        calendar.setTime(booking.getEndDate());
                        int bookingEndHour = calendar.get(Calendar.HOUR_OF_DAY);

                        if (booking.getStartDate().toString().equals((date))
                                && bookingEndHour == hour + 1) {
                            hourAvailability.setAvailable(false);
                            break;
                        } else if (isDateBetween(convertHourAvailabilityToDate(dayAvailability.getDate(), hourAvailability.getStart()), booking.getStartDate(), booking.getEndDate()) && isDateBetween(convertHourAvailabilityToDate(dayAvailability.getDate(), hourAvailability.getEnd()), booking.getStartDate(), booking.getEndDate())) {
                            hourAvailability.setAvailable(false);
                            break;
                        }
                    }
                    dayAvailability.getHours().add(hourAvailability);
                    boolean hasAvailability = dayAvailability.getHours().stream()
                            .anyMatch(HourAvailability::isAvailable);
                    if (!hasAvailability) {
                        dayAvailability.setIsWorkingDay(false);
                    }
                }
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

    public IsCoachAvailable isCoachAvailable(String coachId, Date startDate, Date endDate) throws ParseException {
        List<DayAvailability> availabilities = getAvailabilities(coachId, startDate, endDate);

        String hourStart = new SimpleDateFormat("HH:mm").format(startDate);
        String hourEnd = new SimpleDateFormat("HH:mm").format(endDate);

        int countEvents = 0;

        for (DayAvailability dayAvailability : availabilities) {
            for (HourAvailability hourAvailability : dayAvailability.getHours()) {
                if (hourAvailability.isAvailable()) {
                    continue;
                }
                boolean isSameHour = hourAvailability.getStart().equals(hourStart) && hourAvailability.getEnd().equals(hourEnd);
                if (isSameHour) {
                    countEvents++;
                } else if (isDateBetween(convertHourAvailabilityToDate(dayAvailability.getDate(), hourAvailability.getStart()), startDate, endDate)) {
                    countEvents++;
                }
            }
        }

        return new IsCoachAvailable(countEvents == 0, countEvents);
    }

    public Date convertHourAvailabilityToDate(Date date, String hour) throws ParseException {
        DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = new SimpleDateFormat("yyyy-MM-dd").format(date) + " " + hour + ":00";
        return formatter.parse(dateString);
    }

    public List<Unavailability> getUnavailabilities(String coachId) {
        Coach coach = select(coachId);
        if (coach == null) {
            throw new IllegalArgumentException("Coach with id " + coachId + " does not exist.");
        }

        List<Booking> bookings = bookingRepository.findBookingByCoachIdAndUserIdAndEndDateAfter(coach.getId(), coach.getUser().getId(), new Date());

        List<Unavailability> unavailabilities = new ArrayList<>();
        for (Booking booking : bookings) {
            if (!booking.getIsActive()) {
                continue;
            }
            Unavailability unavailability = new Unavailability(
                    booking.getId(),
                    coachId,
                    booking.getStartDate().toString(),
                    booking.getEndDate().toString()
            );
            unavailabilities.add(unavailability);
        }
        return unavailabilities;
    }

    public Boolean isDateBetween(Date date, Date startDate, Date endDate) {
        return (date.equals(startDate) || date.equals(endDate) || (date.after(startDate) && date.before(endDate)));
    }
}
