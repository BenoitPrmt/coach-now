package com.coachnow.api.model.service;

import com.coachnow.api.model.entity.Coach;
import com.coachnow.api.model.repository.CoachRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CoachService {
    @Autowired
    private CoachRepository coachRepository;

    public List<Coach> selectAll() {
        return (List<Coach>) coachRepository.findAll();
    }

    public Coach select(Integer id) {
        Optional<Coach> optionalPlayer = coachRepository.findById(id);
        return optionalPlayer.orElse(null);
    }

    public Coach save(Coach player) {
        return coachRepository.save(player);
    }

    public void delete(int id) {
        coachRepository.deleteById(id);
    }

    public void delete(Coach player) {
        coachRepository.delete(player);
    }
}
