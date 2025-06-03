package com.coachnow.api.model.entity.dto;

import com.coachnow.api.model.entity.Booking;
import com.coachnow.api.model.entity.Coach;
import com.coachnow.api.types.Gender;
import com.coachnow.api.types.Level;
import com.coachnow.api.types.Sports;
import lombok.Data;

import java.util.Set;

@Data
public class BookingDTO {
    private String id;
    private String startDate;
    private String endDate;
    private Boolean isActive;
    private Float totalPrice;

    private String coachId;
    private String userId;

    public BookingDTO(Booking booking) {
        this.id = booking.getId();
        this.startDate = booking.getStartDate() != null ? booking.getStartDate().toString() : null;
        this.endDate = booking.getEndDate() != null ? booking.getEndDate().toString() : null;
        this.isActive = booking.getIsActive();
        this.totalPrice = booking.getTotalPrice();
        this.coachId = booking.getCoach() != null ? booking.getCoach().getId() : null;
        this.userId = booking.getUser() != null ? booking.getUser().getId() : null;
    }

}
