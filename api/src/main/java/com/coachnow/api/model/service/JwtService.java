package com.coachnow.api.model.service;

import com.coachnow.api.model.entity.User;
import com.coachnow.api.types.Roles;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    @Autowired
    private CoachService coachService;

    private Key getSigningKey() {
        byte[] keyBytes = Base64.getDecoder().decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(User user) {
        String coachId = "";
        if (user.getRole() == Roles.COACH) {
            coachId = coachService.selectByUserId(user.getId()).getId();
            if (coachId == null) {
                throw new IllegalArgumentException("Coach with user id " + user.getId() + " does not exist.");
            }
        }
        JwtBuilder jwts = Jwts.builder()
                .setClaims(new HashMap<>())
                .setSubject(user.getEmail())
                .claim("id", user.getId())
                .claim("email", user.getEmail())
                .claim("role", user.getRole())
                .claim("name", user.getFirstName() + " " + user.getLastName().charAt(0));

        if (user.getRole() == Roles.COACH) {
            jwts.claim("coachId", coachId);
        }

        return jwts.setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration)) // 24h
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            .compact();
    }

    public String extractEmail(String token) {
        return Jwts.parserBuilder().setSigningKey(getSigningKey()).build()
                .parseClaimsJws(token)
                .getBody().getSubject();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        return extractEmail(token).equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parserBuilder().setSigningKey(getSigningKey()).build()
                .parseClaimsJws(token).getBody().getExpiration();
        return expiration.before(new Date());
    }
}
