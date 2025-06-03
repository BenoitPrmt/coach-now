package com.coachnow.api.web.response.coach.availability;

import lombok.Data;

@Data
public class HourAvailability {
    private String start; // eg: "08:00"
    private String end;   // eg: "09:00"
    private boolean available;

    public HourAvailability(String start, String end, boolean available) {
        this.start = start;
        this.end = end;
        this.available = available;
    }
}
