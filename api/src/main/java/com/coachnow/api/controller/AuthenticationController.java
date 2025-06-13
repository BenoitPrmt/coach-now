package com.coachnow.api.controller;

import com.coachnow.api.model.entity.Coach;
import com.coachnow.api.model.entity.User;
import com.coachnow.api.model.repository.UserRepository;
import com.coachnow.api.model.service.CoachService;
import com.coachnow.api.model.service.JwtService;
import com.coachnow.api.model.service.UserService;
import com.coachnow.api.types.Roles;
import com.coachnow.api.web.request.AuthRequest;
import com.coachnow.api.web.request.coach.CoachCreation;
import com.coachnow.api.web.request.coach.CoachRegistration;
import com.coachnow.api.web.response.AuthResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
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
public class AuthenticationController {
    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CoachService coachService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(), request.getPassword()
                )
        );

        User user = userRepository.findUserByEmail(request.getEmail()).orElseThrow();
        String token = jwtService.generateToken(user);
        return new ResponseEntity<>(
                new AuthResponse(token),
                HttpStatus.OK
        );
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        Optional<User> userFound = userRepository.findUserByEmail(user.getEmail());

        if (userFound.isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("User already exists with email: " + user.getEmail());
        }

        User savedUser = userService.registerUser(user);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedUser);
    }

    @PostMapping("/register/coach")
    public ResponseEntity<?> registerCoach(@RequestBody CoachRegistration coachRegistration) {
        Optional<User> userFound = userRepository.findUserByEmail(coachRegistration.getEmail());

        if (userFound.isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("L'email  " + coachRegistration.getEmail() + " est déjà utilisé.");
        }

        if (!coachRegistration.isCoach()) {
            return ResponseEntity.badRequest()
                    .body("Ce formulaire est réservé aux coachs.");
        }

        User user = new User();
        user.setFirstName(coachRegistration.getFirstName());
        user.setLastName(coachRegistration.getLastName());
        user.setEmail(coachRegistration.getEmail());
        user.setPassword(coachRegistration.getPassword());
        user.setRole(Roles.COACH);

        User savedUser = userService.registerUser(user);

        CoachCreation coachCreation = CoachCreation.fromCoachRegistration(coachRegistration, savedUser.getId());

        Coach coach = new Coach();
        coach.setUser(savedUser);
        coach.setCoachFromCoachCreation(coachCreation);

        coachService.save(coach);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedUser);
    }

}
