package com.coachnow.api.model.service;

import com.coachnow.api.model.entity.Rating;
import com.coachnow.api.model.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    public List<Rating> selectAll() {
        return (List<Rating>) ratingRepository.findAll();
    }

    public Rating select(String id) {
        Optional<Rating> optionalRating = ratingRepository.findById(id);
        return optionalRating.orElse(null);
    }

    public Rating save(Rating rating) {
        return ratingRepository.save(rating);
    }

    public void delete(String id) {
        ratingRepository.deleteById(id);
    }

    public void delete(Rating rating) {
        ratingRepository.delete(rating);
    }

    public boolean userHasAlreadyRated(String userId, String coachId) {
        return ratingRepository.existsByUserIdAndCoachId(userId, coachId);
    }
}
