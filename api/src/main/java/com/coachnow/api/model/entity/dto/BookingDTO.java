package com.coachnow.api.model.entity.dto;

import com.coachnow.api.model.entity.Booking;
import com.coachnow.api.model.entity.dto.simple.SimpleCoachDTO;
import com.coachnow.api.model.entity.dto.simple.SimpleUserDTO;
import lombok.Data;


@Data
public class BookingDTO {
    private String id;
    private String startDate;
    private String endDate;
    private Boolean isActive;
    private Float totalPrice;

    private SimpleCoachDTO coach;
    private SimpleUserDTO user;

    public BookingDTO(Booking booking) {
        this.id = booking.getId();
        this.startDate = booking.getStartDate() != null ? booking.getStartDate().toString() : null;
        this.endDate = booking.getEndDate() != null ? booking.getEndDate().toString() : null;
        this.isActive = booking.getIsActive();
        this.totalPrice = booking.getTotalPrice();
        this.coach = booking.getCoach() != null ? new SimpleCoachDTO(booking.getCoach()) : null;
        this.user = booking.getUser() != null ? new SimpleUserDTO(booking.getUser()) : null;
    }
}
