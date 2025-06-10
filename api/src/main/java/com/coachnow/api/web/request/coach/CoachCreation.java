package com.coachnow.api.web.request.coach;

import com.coachnow.api.types.Gender;
import com.coachnow.api.types.Level;
import com.coachnow.api.types.Sports;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Set;

@Data
public class CoachCreation {
    // 🔹 Données utilisateur
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    @JsonProperty("isCoach")
    private boolean coach;

    // 🔹 Données coach
    private String birthdate;
    private String profilePictureUrl;
    private Float hourlyRate;
    private Set<Sports> sports;
    private Set<Level> levels;
    private Gender gender;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @JsonProperty("isCoach")
    public boolean isCoach() {
        return coach;
    }

    @JsonProperty("isCoach")
    public void setCoach(boolean coach) {
        this.coach = coach;
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

}
