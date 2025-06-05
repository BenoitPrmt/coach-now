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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Boolean getWorkingDay() {
        return isWorkingDay;
    }

    public void setWorkingDay(Boolean workingDay) {
        isWorkingDay = workingDay;
    }

    public List<HourAvailability> getHours() {
        return hours;
    }

    public void setHours(List<HourAvailability> hours) {
        this.hours = hours;
    }

    private Boolean isWorkingDay; // true if it's a working day, false otherwise
    private List<HourAvailability> hours;

    public DayAvailability(Date date, List<HourAvailability> hours) {
        this.date = date;
        this.isWorkingDay =
                Calendar.getInstance().get(Calendar.DAY_OF_WEEK) != Calendar.SUNDAY &&
                Calendar.getInstance().get(Calendar.DAY_OF_WEEK) != Calendar.SATURDAY;
        this.hours = hours;
    }

    public Boolean isWorkingDay() {
        return isWorkingDay;
    }
}
