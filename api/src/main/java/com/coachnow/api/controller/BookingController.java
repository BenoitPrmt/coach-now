package com.coachnow.api.controller;

import com.coachnow.api.model.entity.Booking;
import com.coachnow.api.model.entity.dto.BookingDTO;
import com.coachnow.api.model.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8000")
@RequestMapping("/api")
public class BookingController {

    @Autowired BookingService bookingService;

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
    public BookingDTO create(@RequestBody Booking booking) {
        return new BookingDTO(bookingService.save(booking));
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