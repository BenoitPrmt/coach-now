package com.coachnow.api.model.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name= "date", nullable = false)
    private Date date;

    @Column(name = "rating", nullable = false)
    private Float rating;

    @Column(name = "comment", columnDefinition = "TEXT", nullable = true)
    private String comment;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "coach_id", nullable = false)
    private Coach coach;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rate) {
        this.rating = rate;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Coach getCoach() {
        return coach;
    }

    public void setCoach(Coach coach) {
        this.coach = coach;
    }

}
