package com.coachnow.api.model.repository;

import com.coachnow.api.model.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
    public Optional<User> findUserByEmail(String email);
}
