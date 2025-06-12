package com.coachnow.api.web.response.coach;

public class IsCoachAvailable {
    private boolean isAvailable;
    private Integer count;

    public IsCoachAvailable(boolean isAvailable, Integer count) {
        this.isAvailable = isAvailable;
        this.count = count;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}
