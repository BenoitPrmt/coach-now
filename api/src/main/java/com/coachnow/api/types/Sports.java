package com.coachnow.api.types;

public enum Sports {
    FITNESS("FITNESS"),
    BASKETBALL("BASKETBALL"),
    CYCLING("CYCLING"),
    TENNIS("TENNIS"),
    RUGBY("RUGBY"),
    HANDBALL("HANDBALL"),
    BOXING("BOXING"),
    HORSE_RIDING("HORSE_RIDING"),
    YOGA("YOGA"),
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