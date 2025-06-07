package com.coachnow.api.model.entity.dto.simple;

import com.coachnow.api.model.entity.Coach;
import com.coachnow.api.types.Level;
import com.coachnow.api.types.Sports;
import lombok.Data;

import java.util.List;

@Data
public class SimpleCoachDTO {
    private String id;
    private Float hourlyRate;
    private String profilePictureUrl;
    private SimpleUserDTO user;
    private Sports sports;
    private List<Level> levels;

    public SimpleCoachDTO(Coach coach) {
        this.id = coach.getId();
        this.hourlyRate = coach.getHourlyRate();
        this.profilePictureUrl = coach.getProfilePictureUrl();
        this.user = coach.getUser() != null ? new SimpleUserDTO(coach.getUser()) : null;
        this.sports = coach.getSports() != null ? coach.getSports().stream().findFirst().orElse(null) : null;
        this.levels = coach.getLevels() != null ? coach.getLevels().stream().toList() : null;
    }
}
