package com.coachnow.api.model.repository;

import com.coachnow.api.model.entity.Rating;
import com.coachnow.api.model.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends CrudRepository<Rating, String> {
    boolean existsByUserIdAndCoachId(String userId, String coachId);
    List<Rating> findRatingsByUser(User user);
}
