package com.coachnow.api.types;

public enum Gender {
    MALE("MALE"),
    FEMALE("FEMALE");

    private final String gender;

    Gender(final String gender) {
        this.gender = gender;
    }

    /*
     * @see java.lang.Enum#toString()
     */
    @Override
    public String toString() {
        return gender;
    }
}