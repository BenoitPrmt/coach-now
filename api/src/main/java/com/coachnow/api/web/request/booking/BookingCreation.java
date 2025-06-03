package com.coachnow.api.web.request.booking;

import lombok.Data;

@Data
public class BookingCreation {
    private String startDate;
    private String endDate;
    private Boolean isActive;
    private Float totalPrice;
    private String coachId;
    private String userId;

    public BookingCreation(String startDate, String endDate, Boolean isActive, Float totalPrice, String coachId, String userId) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.isActive = isActive;
        this.totalPrice = totalPrice;
        this.coachId = coachId;
        this.userId = userId;
    }
}
