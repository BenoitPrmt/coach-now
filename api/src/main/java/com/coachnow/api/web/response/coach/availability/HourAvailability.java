package com.coachnow.api.web.response.coach.availability;

import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class HourAvailability {
    private String start; // eg: "08:00"
    private String end;   // eg: "09:00"
    private boolean available;

    public HourAvailability(String start, String end, String date) {
        this.start = start;
        this.end = end;

        boolean areDatesValid = true;
        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime startDate = LocalDateTime.parse(date + " " + start, dateFormat);
        LocalDateTime nowDate = LocalDateTime.now();

        // Check if start date is before the current date
        if (startDate.isBefore(nowDate)) {
            areDatesValid = false;
        }

        this.available = areDatesValid;
    }

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
}
