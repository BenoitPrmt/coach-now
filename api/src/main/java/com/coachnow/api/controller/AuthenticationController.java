package com.coachnow.api.controller;

import com.coachnow.api.model.repository.UserRepository;
import com.coachnow.api.model.service.JwtService;
import com.coachnow.api.web.request.AuthRequest;
import com.coachnow.api.web.response.AuthResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(), request.getPassword()
                )
        );

        var user = userRepository.findUserByEmail(request.getEmail()).orElseThrow();
        var token = jwtService.generateToken(
                org.springframework.security.core.userdetails.User
                        .withUsername(user.getEmail())
                        .password(user.getPassword())
                        .roles(user.getRole().name())
                        .build()
        );
        return new AuthResponse(token);
    }
}
