package com.coachnow.api.controller;

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
    RatingService ratingService;
    @Autowired
    private CoachService coachService;
    @Autowired
    private UserService userService;
    @Autowired
    private BookingService bookingService;

    @GetMapping("/ratings")
    public List<RatingDTO> all() {
        List<Rating> ratings = ratingService.selectAll();
        List<RatingDTO> listDTO = new ArrayList<>();
        for (Rating rating : ratings) {
            listDTO.add(new RatingDTO(rating));
        }
        return listDTO;
    }

    @GetMapping("/rating/{id}")
    public RatingDTO get(@PathVariable String id) {
        Rating rating = ratingService.select(id);

        return rating != null ? new RatingDTO(rating) : null;

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
            // Verification if the booking is in the past if so the user can rate the coach
            if (bookingService.getBookingByCoachAndUser(ratingData.getCoachId(), ratingData.getUserId()).getStartDate().after(new Date())) {
                throw new IllegalArgumentException("User with id " + ratingData.getUserId() + " cannot rate a coach for a future booking.");
            }
            Rating rating = getRating(ratingData, coach, user);
            return new ResponseEntity<>(new RatingDTO(ratingService.save(rating)), HttpStatus.CREATED);
        } catch (IllegalArgumentException | ParseException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    private static Rating getRating(RatingCreation ratingData, Coach coach, User user) throws ParseException {
        Rating rating = new Rating();
        rating.setRating(ratingData.getRating());
        rating.setComment(ratingData.getComment());
        rating.setCoach(coach);
        rating.setUser(user);
        return rating;
    }

    @PutMapping("/rating/{id}")
    public RatingDTO create(@RequestBody Rating rating, @PathVariable String id) {
        rating.setId(id);
        return new RatingDTO(ratingService.save(rating));
    }

    @DeleteMapping("/rating/{id}")
    public void deletePlayer(@PathVariable String id) {
        ratingService.delete(id);
    }
}
