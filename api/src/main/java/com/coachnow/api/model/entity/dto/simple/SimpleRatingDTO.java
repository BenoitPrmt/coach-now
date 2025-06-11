package com.coachnow.api.model.entity.dto.simple;

import com.coachnow.api.model.entity.Rating;
import lombok.Data;

import java.util.Date;

@Data
public class SimpleRatingDTO {
    private String id;
    private SimpleCoachDTO coach;
    private Date date;
    private Float rating;
    private String comment;

    public SimpleRatingDTO(Rating rating) {
        this.id = rating.getId();
        this.coach = new SimpleCoachDTO(rating.getCoach());
        this.date = rating.getDate();
        this.rating = rating.getRating();
        this.comment = rating.getComment();
    }

    public String getId() {
        return id;
    }

    public SimpleCoachDTO getCoach() {
        return coach;
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
}