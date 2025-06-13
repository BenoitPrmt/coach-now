package com.coachnow.api.controller;

import com.coachnow.api.component.CsvGeneratorUtil;
import com.coachnow.api.component.PdfGeneratorUtil;
import com.coachnow.api.model.entity.Booking;
import com.coachnow.api.model.entity.Coach;
import com.coachnow.api.model.entity.User;
import com.coachnow.api.model.entity.dto.BookingDTO;
import com.coachnow.api.model.service.BookingService;
import com.coachnow.api.model.service.CoachService;
import com.coachnow.api.model.service.UserService;
import com.coachnow.api.types.Roles;
import com.coachnow.api.web.request.booking.BookingCreation;
import com.coachnow.api.web.request.booking.BookingUpdate;
import com.coachnow.api.web.response.coach.IsCoachAvailable;
import com.itextpdf.text.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private CoachService coachService;

    @Autowired
    private UserService userService;

    @Autowired
    private CsvGeneratorUtil csvGeneratorUtil;

    @Autowired
    private PdfGeneratorUtil pdfGeneratorUtil;

    @GetMapping("/bookings")
    public ResponseEntity<List<BookingDTO>> all() {
        List<Booking> bookings = bookingService.selectAll();
        List<BookingDTO> listDTO = new ArrayList<>();
        for (Booking booking : bookings) {
            listDTO.add(new BookingDTO(booking));
        }
        return new ResponseEntity<>(listDTO, HttpStatus.OK);
    }

    @GetMapping("/booking/{id}")
    public ResponseEntity<BookingDTO> get(
            @PathVariable String id
    ) {
        try {
            Booking booking = bookingService.select(id);

            if (booking == null) {
                throw new IllegalArgumentException("Booking with id " + id + " does not exist.");
            }

            BookingDTO bookingDTO = new BookingDTO(booking);
            return new ResponseEntity<>(bookingDTO, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/bookings/coach/{coachId}")
    public ResponseEntity<List<BookingDTO>> getByCoach(
            @PathVariable String coachId,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate
    ) throws ParseException {
        List<Booking> bookings = (List<Booking>) bookingService.getBookingsByCoach(coachId, startDate, endDate);
        if (bookings == null || bookings.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<BookingDTO> listDTO = new ArrayList<>();
        for (Booking booking : bookings) {
            listDTO.add(new BookingDTO(booking));
        }
        return new ResponseEntity<>(listDTO, HttpStatus.OK);
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

            // Only the coach is allow to create a booking for themselves (holiday, etc.)
            if (user.getRole().equals(Roles.COACH) && !user.getId().equals(coach.getUser().getId())) {
                throw new IllegalArgumentException("User is a coach but does not match the coach's user ID.");
            }

            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            IsCoachAvailable isCoachAvailable = coachService.isCoachAvailable(
                    bookingData.getCoachId(),
                    formatter.parse(bookingData.getStartDate()),
                    formatter.parse(bookingData.getEndDate())
            );
            if (!isCoachAvailable.isAvailable()) {
                if (user.getRole().equals(Roles.COACH) && user.getId().equals(coach.getUser().getId())) {
                    bookingService.cancelBookingsBetweenDates(
                            bookingData.getCoachId(),
                            formatter.parse(bookingData.getStartDate()),
                            formatter.parse(bookingData.getEndDate())
                    );
                } else {
                    throw new IllegalArgumentException("Coach is not available for the selected time.");
                }
            }

            Booking booking = getBooking(bookingData, coach, user);

            return new ResponseEntity<>(new BookingDTO(bookingService.save(booking)), HttpStatus.CREATED);
        } catch (IllegalArgumentException | ParseException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    private static Booking getBooking(BookingCreation bookingData, Coach coach, User user) throws ParseException {
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
        return booking;
    }

    @PutMapping("/booking/{id}")
    public ResponseEntity<BookingDTO> update(@RequestBody BookingUpdate bookingUpdate, @PathVariable String id) throws ParseException {
        try {
            Booking booking = bookingService.select(id);

            if (booking == null) {
                throw new IllegalArgumentException("Booking with id " + id + " does not exist.");
            }

            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            if (bookingUpdate.getStartDate() != null) {
                booking.setStartDate(formatter.parse(bookingUpdate.getStartDate()));
            }
            if (bookingUpdate.getEndDate() != null) {
                booking.setEndDate(formatter.parse(bookingUpdate.getEndDate()));
            }
            if (bookingUpdate.getIsActive() != null) {
                booking.setIsActive(bookingUpdate.getIsActive());
            }
            if (bookingUpdate.getTotalPrice() != null) {
                booking.setTotalPrice(bookingUpdate.getTotalPrice());
            }
            if (bookingUpdate.getCoachId() != null) {
                Coach coach = coachService.select(bookingUpdate.getCoachId());
                if (coach == null) {
                    throw new IllegalArgumentException("Coach with id " + bookingUpdate.getCoachId() + " does not exist.");
                }
                booking.setCoach(coach);
            }
            if (bookingUpdate.getUserId() != null) {
                User user = userService.select(bookingUpdate.getUserId());
                if (user == null) {
                    throw new IllegalArgumentException("User with id " + bookingUpdate.getUserId() + " does not exist.");
                }
                booking.setUser(user);
            }

            return new ResponseEntity<>(new BookingDTO(bookingService.save(booking)), HttpStatus.OK);
        } catch (IllegalArgumentException | ParseException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/booking/{id}")
    public ResponseEntity<?> deletePlayer(@PathVariable String id) {
        bookingService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/bookings/export/csv")
    public ResponseEntity<byte[]> generateCsvFile() {
        List<Booking> bookings = bookingService.selectAll();
        bookings = bookingService.sortBookingsByStartDate(bookings);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "bookings.csv");

        byte[] csvBytes = csvGeneratorUtil.generateCsv(bookings);

        return new ResponseEntity<>(csvBytes, headers, HttpStatus.OK);
    }

    @GetMapping("/bookings/export/csv/{coachId}")
    public ResponseEntity<byte[]> generateCsvFileByCoach(@PathVariable String coachId) {
        List<Booking> bookings = bookingService.selectAllByCoachId(coachId);
        bookings = bookingService.sortBookingsByStartDate(bookings);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "bookings_" + coachId + ".csv");

        byte[] csvBytes = csvGeneratorUtil.generateCsv(bookings);

        return new ResponseEntity<>(csvBytes, headers, HttpStatus.OK);
    }

    @GetMapping("/bookings/export/pdf")
    public ResponseEntity<byte[]> generatePdfFile() throws DocumentException, IOException {
        List<Booking> bookings = bookingService.selectAll();
        bookings = bookingService.sortBookingsByStartDate(bookings);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "bookings.pdf");

        byte[] pdfBytes = pdfGeneratorUtil.generateBookingsPdf(bookings, "Toutes les réservations");

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }

    @GetMapping("/bookings/export/pdf/{coachId}")
    public ResponseEntity<byte[]> generatePdfFileByCoach(@PathVariable String coachId) throws DocumentException, IOException {
        List<Booking> bookings = bookingService.selectAllByCoachId(coachId);
        bookings = bookingService.sortBookingsByStartDate(bookings);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "bookings_" + coachId + ".pdf");

        byte[] pdfBytes = pdfGeneratorUtil.generateBookingsPdf(bookings, "Réservations du coach");

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }
}