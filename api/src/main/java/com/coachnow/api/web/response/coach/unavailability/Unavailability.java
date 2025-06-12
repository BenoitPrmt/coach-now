package com.coachnow.api.web.response.coach.unavailability;

public class Unavailability {
    private String id;
    private String coachId;
    private String startDate;
    private String endDate;

    public Unavailability(String id, String coachId, String startDate, String endDate) {
        this.id = id;
        this.coachId = coachId;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCoachId() {
        return coachId;
    }

    public void setCoachId(String coachId) {
        this.coachId = coachId;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
}
