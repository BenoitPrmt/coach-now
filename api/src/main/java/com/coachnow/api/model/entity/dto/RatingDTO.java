package com.coachnow.api.model.entity.dto;

import com.coachnow.api.model.entity.Rating;
import com.coachnow.api.model.entity.dto.simple.SimpleCoachDTO;
import lombok.Data;

import java.util.Date;

@Data
public class RatingDTO {
    private String id;
    private Date date;
    private Float rating;
    private String comment;
    private SimpleCoachDTO coach;
    private RatingUserDTO user;

    public RatingDTO(Rating rating) {
        this.id = rating.getId();
        this.date = rating.getDate();
        this.rating = rating.getRating();
        this.comment = rating.getComment();
        this.coach = new SimpleCoachDTO(rating.getCoach());
        this.user = rating.getUser() != null ? new RatingUserDTO(rating.getUser()) : null;
    }

    public String getId() {
        return id;
    }

    public Date getDate() {
        return date;
    }

    public Float getRating() {
        return rating;
    }

    public String getComment() {
        return comment;
    }

    public SimpleCoachDTO getCoach() {
        return coach;
    }

    public RatingUserDTO getUser() {
        return user;
    }
}