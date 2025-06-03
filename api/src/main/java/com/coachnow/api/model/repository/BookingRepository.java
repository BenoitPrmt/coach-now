package com.coachnow.api.model.repository;

import com.coachnow.api.model.entity.Booking;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends CrudRepository<Booking, String> {

}
