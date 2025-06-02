package com.coachnow.api.model.entity.dto;

import com.coachnow.api.model.entity.Coach;
import com.coachnow.api.types.Gender;
import com.coachnow.api.types.Level;
import com.coachnow.api.types.Sports;
import lombok.Data;

import java.util.Set;

@Data
public class CoachDTO {
    private String id;
    private String birthdate;
    private String profilePictureUrl;
    private Float hourlyRate;

    private Set<Sports> sports;
    private Set<Level> levels;

    private Gender gender;

    private String userId;

    public CoachDTO(Coach coach) {
        this.id = coach.getId();
        this.birthdate = coach.getBirthdate().toString();
        this.profilePictureUrl = coach.getProfilePictureUrl();
        this.hourlyRate = coach.getHourlyRate();
        this.sports = coach.getSports();
        this.levels = coach.getLevels();
        this.userId = coach.getUser() != null ? coach.getUser().getId() : null;
    }

}
