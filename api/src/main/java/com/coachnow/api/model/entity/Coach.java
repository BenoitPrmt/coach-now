package com.coachnow.api.model.entity;

import com.coachnow.api.types.Gender;
import com.coachnow.api.types.Level;
import com.coachnow.api.types.Roles;
import com.coachnow.api.types.Sports;
import com.coachnow.api.web.request.coach.CoachCreation;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class Coach {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private Date birthdate;

    @Column(nullable = true)
    private String profilePictureUrl;

    @Column(nullable = false)
    private Float hourlyRate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Set<Sports> sports;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Set<Level> levels;

    @Column(nullable = false)
    private Gender gender;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "coach")
    private List<Booking> bookings = new ArrayList<Booking>();

    @OneToMany(mappedBy = "coach", fetch = FetchType.EAGER)
    private List<Rating> ratings;

    @Override
    public String toString() {
        return "Coach{" +
                "id='" + id + '\'' +
                ", birthdate=" + birthdate +
                ", profilePictureUrl='" + profilePictureUrl + '\'' +
                ", hourlyRate=" + hourlyRate +
                ", sports=" + sports +
                ", levels=" + levels +
                ", gender=" + gender +
                ", user=" + user.getEmail() +
                ", bookings=" + bookings +
                '}';
    }

    public void setCoachFromCoachCreation(CoachCreation coachData) {
        this.birthdate = Date.valueOf(coachData.getBirthdate());
        this.profilePictureUrl = coachData.getProfilePictureUrl();
        this.hourlyRate = coachData.getHourlyRate();
        this.sports = coachData.getSports();
        this.levels = coachData.getLevels();
        this.gender = coachData.getGender();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    public List<Rating> getRatings() {
        return ratings;
    }

    public void setRatings(List<Rating> ratings) {
        this.ratings = ratings;
    }

}
