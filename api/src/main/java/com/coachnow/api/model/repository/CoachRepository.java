package com.coachnow.api.model.repository;

import com.coachnow.api.model.entity.Coach;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoachRepository extends CrudRepository<Coach, String> {

}
