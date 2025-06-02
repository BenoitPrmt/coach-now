package com.coachnow.api.types;

public enum Level {
    BEGINNER("BEGINNER"),
    MEDIUM("MEDIUM"),
    HIGHLEVEL("HIGHLEVEL");

    private final String level;

    Level(final String level) {
        this.level = level;
    }

    /*
     * @see java.lang.Enum#toString()
     */
    @Override
    public String toString() {
        return level;
    }
}