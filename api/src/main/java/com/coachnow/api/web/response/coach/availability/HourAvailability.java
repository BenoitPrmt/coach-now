package com.coachnow.api.web.response.coach.availability;

import lombok.Data;

@Data
public class HourAvailability {
    private String start; // eg: "08:00"

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    private String end;   // eg: "09:00"
    private boolean available;

    public HourAvailability(String start, String end, boolean available) {
        this.start = start;
        this.end = end;
        this.available = available;
    }
}
