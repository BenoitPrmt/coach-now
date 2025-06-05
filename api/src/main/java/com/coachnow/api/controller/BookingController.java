package com.coachnow.api.controller;

import com.coachnow.api.model.entity.Booking;
import com.coachnow.api.model.entity.Coach;
import com.coachnow.api.model.entity.User;
import com.coachnow.api.model.entity.dto.BookingDTO;
import com.coachnow.api.model.service.BookingService;
import com.coachnow.api.model.service.CoachService;
import com.coachnow.api.model.service.UserService;
import com.coachnow.api.web.request.booking.BookingCreation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "${frontend.url}")
@RequestMapping("/api")
public class BookingController {

    @Autowired
    BookingService bookingService;

    @Autowired
    CoachService coachService;

    @Autowired
    UserService userService;

    @GetMapping("/bookings")
    public List<BookingDTO> all() {
        List<Booking> bookings = bookingService.selectAll();
        List<BookingDTO> listDTO = new ArrayList<BookingDTO>();
        for(Booking booking : bookings) {
            listDTO.add(new BookingDTO(booking));
        }
        return listDTO;
    }

    @GetMapping("/booking/{id}")
    public BookingDTO get(
            @PathVariable String id
    ) {
        return new BookingDTO(bookingService.select(id));
    }

    @PostMapping("/booking")
    public ResponseEntity<BookingDTO> create(@RequestBody BookingCreation bookingData) throws ParseException {
        try {
            Coach coach = coachService.select(bookingData.getCoachId());
            if (coach == null) {
                throw new IllegalArgumentException("Coach with id " + bookingData.getCoachId() + " does not exist.");
            }

            User user = userService.select(bookingData.getUserId());
            if (user == null) {
                throw new IllegalArgumentException("User with id " + bookingData.getUserId() + " does not exist.");
            }

            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            Boolean isCoachAvailable = coachService.isCoachAvailable(
                    bookingData.getCoachId(),
                    formatter.parse(bookingData.getStartDate()),
                    formatter.parse(bookingData.getEndDate())
            );
            if (!isCoachAvailable) {
                throw new IllegalArgumentException("Coach is not available for the selected time.");
            }

            Booking booking = new Booking();
            booking.setBookingWithBookingCreation(bookingData);
            booking.setCoach(coach);
            booking.setUser(user);

            if (booking.getStartDate().after(booking.getEndDate())) {
                throw new IllegalArgumentException("Start date cannot be after end date.");
            }

            if (booking.getStartDate().before(new java.util.Date())) {
                throw new IllegalArgumentException("Start date cannot be in the past.");
            }

            return new ResponseEntity<>(new BookingDTO(bookingService.save(booking)), HttpStatus.CREATED);
        } catch (IllegalArgumentException | ParseException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/booking/{id}")
    public BookingDTO create(@RequestBody Booking booking, @PathVariable String id) {
        booking.setId(id);
        return new BookingDTO(bookingService.save(booking));
    }

    @DeleteMapping("/booking/{id}")
    public void deletePlayer(@PathVariable String id) {bookingService.delete(id);
    }
}