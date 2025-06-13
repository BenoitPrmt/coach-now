package com.coachnow.api.controller;

import com.coachnow.api.model.entity.Booking;
import com.coachnow.api.model.entity.Coach;
import com.coachnow.api.model.entity.Rating;
import com.coachnow.api.model.entity.User;
import com.coachnow.api.model.entity.dto.RatingDTO;
import com.coachnow.api.model.service.BookingService;
import com.coachnow.api.model.service.CoachService;
import com.coachnow.api.model.service.RatingService;
import com.coachnow.api.model.service.UserService;
import com.coachnow.api.web.request.rating.RatingCreation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class RatingController {

    @Autowired
    private RatingService ratingService;
    @Autowired
    private CoachService coachService;
    @Autowired
    private UserService userService;
    @Autowired
    private BookingService bookingService;

    @GetMapping("/ratings")
    public ResponseEntity<List<RatingDTO>> all() {
        List<Rating> ratings = ratingService.selectAll();
        List<RatingDTO> listDTO = new ArrayList<>();
        for (Rating rating : ratings) {
            listDTO.add(new RatingDTO(rating));
        }
        return new ResponseEntity<>(listDTO, HttpStatus.OK);
    }

    @GetMapping("/rating/{id}")
    public ResponseEntity<RatingDTO> get(@PathVariable String id) {
        Rating rating = ratingService.select(id);

        if (rating == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        RatingDTO ratingDTO = new RatingDTO(rating);
        return new ResponseEntity<>(ratingDTO, HttpStatus.OK);
    }

    @PostMapping("/rating")
    public ResponseEntity<RatingDTO> create(@RequestBody RatingCreation ratingData) throws ParseException {
        try {
            Coach coach = coachService.select(ratingData.getCoachId());
            if (coach == null) {
                throw new IllegalArgumentException("Coach with id " + ratingData.getCoachId() + " does not exist.");
            }
            User user = userService.select(ratingData.getUserId());
            if (user == null) {
                throw new IllegalArgumentException("User with id " + ratingData.getUserId() + " does not exist.");
            }

            if (user.isCoach()) {
                throw new IllegalArgumentException("User with id " + ratingData.getUserId() + " is a coach.");
            }

            if (ratingService.userHasAlreadyRated(ratingData.getUserId(), ratingData.getCoachId())) {
                throw new IllegalArgumentException("User with id " + ratingData.getUserId() + " has already rated this coach.");
            }

            if (ratingData.getRating() < 0.5 || ratingData.getRating() > 5) {
                throw new IllegalArgumentException("Rating must be between 0.5 and 5.");
            }
            // Verification if the user had a booking with the coach
            if (!bookingService.userHasBookedWithCoach(ratingData.getUserId(), ratingData.getCoachId())) {
                throw new IllegalArgumentException("User with id " + ratingData.getUserId() + " has not booked with this coach.");
            }

            Rating rating = ratingService.getRating(ratingData, coach, user);
            return new ResponseEntity<>(new RatingDTO(ratingService.save(rating)), HttpStatus.CREATED);
        } catch (IllegalArgumentException | ParseException e) {
            System.err.println("Error creating rating: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/rating/{id}")
    public ResponseEntity<RatingDTO> create(@RequestBody Rating rating, @PathVariable String id) {
        rating.setId(id);
        return new ResponseEntity<>(new RatingDTO(ratingService.save(rating)), HttpStatus.OK);
    }

    @DeleteMapping("/rating/{id}")
    public void deletePlayer(@PathVariable String id) {
        ratingService.delete(id);
    }
}
