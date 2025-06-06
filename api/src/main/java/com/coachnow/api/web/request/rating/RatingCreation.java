package com.coachnow.api.web.request.rating;

public class RatingCreation {
    private String coachId;
    private String userId;
    private Float rating;
    private String comment;

    public RatingCreation(String coachId, String userId, Float rating, String comment) {
        this.coachId = coachId;
        this.userId = userId;
        this.rating = rating;
        this.comment = comment;
    }

    public String getCoachId() {
        return coachId;
    }

    public void setCoachId(String coachId) {
        this.coachId = coachId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
