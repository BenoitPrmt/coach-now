package com.coachnow.api.web.response.coach.availability;

import lombok.Data;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Data
public class DayAvailability {

    public final static String HOUR_START = "09:00";
    public final static String HOUR_END = "20:00";

    private Date date; // eg: "2025-06-03"
    private Boolean isWorkingDay; // true if it's a working day, false otherwise
    private List<HourAvailability> hours;

    public DayAvailability(Date date, List<HourAvailability> hours) {
        this.date = date;
        this.isWorkingDay =
                Calendar.getInstance().get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY ||
                Calendar.getInstance().get(Calendar.DAY_OF_WEEK) == Calendar.SATURDAY;
        this.hours = hours;
    }

    public Boolean isWorkingDay() {
        return isWorkingDay;
    }
}
