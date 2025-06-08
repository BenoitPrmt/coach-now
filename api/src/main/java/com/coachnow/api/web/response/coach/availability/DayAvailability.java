package com.coachnow.api.web.response.coach.availability;

import lombok.Data;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Data
public class DayAvailability {

    public final static String HOUR_START = "09:00";
    public final static String HOUR_END = "19:00";

    private Date date; // eg: "2025-06-03"
    private Boolean isWorkingDay; // true if it's a working day, false otherwise
    private List<HourAvailability> hours;

    public DayAvailability(Date date, List<HourAvailability> hours) {
        this.date = date;
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
        this.isWorkingDay = (dayOfWeek != Calendar.SATURDAY && dayOfWeek != Calendar.SUNDAY);
        this.hours = hours;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Boolean getIsWorkingDay() {
        return isWorkingDay;
    }

    public void setIsWorkingDay(Boolean workingDay) {
        isWorkingDay = workingDay;
    }

    public List<HourAvailability> getHours() {
        return hours;
    }

    public void setHours(List<HourAvailability> hours) {
        this.hours = hours;
    }
}
