package com.coachnow.api.web.request.coach;

import com.coachnow.api.types.Gender;
import com.coachnow.api.types.Level;
import com.coachnow.api.types.Sports;
import lombok.Data;

import java.util.Set;

@Data
public class CoachCreation {
    private String birthdate;
    private String profilePictureUrl;
    private Float hourlyRate;
    private Set<Sports> sports;
    private Set<Level> levels;
    private Gender gender;
    private String userId;

    public CoachCreation(CoachRegistration coachRegistration, String userId) {
        this.birthdate = coachRegistration.getBirthdate();
        this.profilePictureUrl = coachRegistration.getProfilePictureUrl();
        this.hourlyRate = coachRegistration.getHourlyRate();
        this.sports = coachRegistration.getSports();
        this.levels = coachRegistration.getLevels();
        this.gender = coachRegistration.getGender();
        this.userId = userId;
    }

    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public void setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }

    public Float getHourlyRate() {
        return hourlyRate;
    }

    public void setHourlyRate(Float hourlyRate) {
        this.hourlyRate = hourlyRate;
    }

    public Set<Sports> getSports() {
        return sports;
    }

    public void setSports(Set<Sports> sports) {
        this.sports = sports;
    }

    public Set<Level> getLevels() {
        return levels;
    }

    public void setLevels(Set<Level> levels) {
        this.levels = levels;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
