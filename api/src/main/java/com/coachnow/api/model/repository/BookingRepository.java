package com.coachnow.api.model.repository;

import com.coachnow.api.model.entity.Booking;
import com.coachnow.api.model.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends CrudRepository<Booking, String> {
    boolean existsByUserIdAndCoachIdAndEndDateBefore(String userId, String coachId, java.util.Date endDate);

    Optional<Booking> findByCoachIdAndUserId(String coachId, String userId);

    List<Booking> findBookingsByUser(User user);
}
