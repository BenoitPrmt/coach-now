package com.coachnow.api.types;

public enum Roles {
    USER("USER"),
    COACH("COACH"),
    ADMIN("ADMIN");

    private final String role;

    Roles(final String role) {
        this.role = role;
    }

    /*
     * @see java.lang.Enum#toString()
     */
    @Override
    public String toString() {
        return role;
    }
}