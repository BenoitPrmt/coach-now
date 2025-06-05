package com.coachnow.api.web.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class AuthResponse {

    public AuthResponse(String token) {
        this.token = token;
    }

    private String token;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
