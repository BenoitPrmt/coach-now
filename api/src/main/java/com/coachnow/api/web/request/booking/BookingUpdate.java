package com.coachnow.api.web.request.booking;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BookingUpdate {

    private String startDate;
    private String endDate;
    private Boolean isActive;
    private Float totalPrice;
    private String coachId;
    private String userId;

    public BookingUpdate(String startDate, String endDate, Boolean isActive, Float totalPrice, String coachId, String userId) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.isActive = isActive;
        this.totalPrice = totalPrice;
        this.coachId = coachId;
        this.userId = userId;
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

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean active) {
        isActive = active;
    }

    public Float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
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
}
