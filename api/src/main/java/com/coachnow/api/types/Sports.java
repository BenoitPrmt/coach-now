package com.coachnow.api.types;

public enum Sports {
    FITNESS("FITNESS"),
    BASKETBALL("BASKETBALL"),
    RUNNING("RUNNING"),
    SWIMMING("SWIMMING"),
    FOOTBALL("FOOTBALL");

    private final String sport;

    Sports(final String sport) {
        this.sport = sport;
    }

    /*
     * @see java.lang.Enum#toString()
     */
    @Override
    public String toString() {
        return sport;
    }
}