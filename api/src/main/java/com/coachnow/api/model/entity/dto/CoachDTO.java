package com.coachnow.api.model.entity.dto;

import com.coachnow.api.model.entity.Coach;
import com.coachnow.api.types.Gender;
import com.coachnow.api.types.Level;
import com.coachnow.api.types.Sports;
import lombok.Data;
import lombok.Getter;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class CoachDTO {
    private String id;
    private String birthdate;
    private String profilePictureUrl;
    private Float hourlyRate;

    private Collection<Sports> sports;
    private Collection<Level> levels;

    private Gender gender;

    private UserDTO user;
    private List<RatingDTO> ratings;

    public CoachDTO(Coach coach) {
        this.id = coach.getId();
        this.birthdate = coach.getBirthdate().toString();
        this.profilePictureUrl = coach.getProfilePictureUrl();
        this.hourlyRate = coach.getHourlyRate();
        this.sports = coach.getSports();
        this.levels = coach.getLevels();
        this.gender = coach.getGender();
        this.user = coach.getUser() != null ? new UserDTO(coach.getUser()) : null;

        if (coach.getRatings() != null) {
            this.ratings = coach.getRatings().stream()
                    .map(RatingDTO::new)
                    .collect(Collectors.toList());
        } else {
            this.ratings = new ArrayList<>();
        }

    }

    public String getId() {
        return id;
    }

    public String getBirthdate() {
        return birthdate;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public Float getHourlyRate() {
        return hourlyRate;
    }

    public Collection<Sports> getSports() {
        return sports;
    }

    public Collection<Level> getLevels() {
        return levels;
    }

    public Gender getGender() {
        return gender;
    }

    public UserDTO getUser() {
        return user;
    }

    public List<RatingDTO> getRatings() {
        return ratings;
    }

}
