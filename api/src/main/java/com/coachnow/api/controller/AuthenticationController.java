package com.coachnow.api.controller;

import com.coachnow.api.model.entity.User;
import com.coachnow.api.model.repository.UserRepository;
import com.coachnow.api.model.service.JwtService;
import com.coachnow.api.model.service.UserService;
import com.coachnow.api.web.request.AuthRequest;
import com.coachnow.api.web.response.AuthResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
//Using @CrossOrigin to allow requests from the frontend URL environment variable
@CrossOrigin(origins = "${frontend.url}")
public class AuthenticationController {
    @Autowired
    private UserService userService;

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

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        Optional<User> userFound = userRepository.findUserByEmail(user.getEmail());

        if (userFound.isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT) // 409 Conflict
                    .body("User already exists with email: " + user.getEmail());
        }

        User savedUser = userService.save(user);
        return ResponseEntity
                .status(HttpStatus.CREATED) // 201 Created
                .body(savedUser);
    }
}
