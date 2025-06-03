package com.coachnow.api.model.repository;

import com.coachnow.api.model.entity.Coach;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CoachRepository extends CrudRepository<Coach, String> {
    public Coach findByUser_Id(String id);
}
