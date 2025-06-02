package com.coachnow.api.model.service;

import com.coachnow.api.model.entity.User;
import com.coachnow.api.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> selectAll() {
        return (List<User>) userRepository.findAll();
    }

    public User select(String id) {
        Optional<User> optionalPlayer = userRepository.findById(id);
        return optionalPlayer.orElse(null);
    }

    public User save(User player) {
        return userRepository.save(player);
    }

    public void delete(String id) {
        userRepository.deleteById(id);
    }

    public void delete(User player) {
        userRepository.delete(player);
    }
}