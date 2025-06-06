package com.coachnow.api.model.repository;

import com.coachnow.api.model.entity.Rating;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepository extends CrudRepository<Rating, String> {
    boolean existsByUserIdAndCoachId(String userId, String coachId);
}
