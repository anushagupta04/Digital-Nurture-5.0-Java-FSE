package com.cognizant.springrest.controller;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.Map;

@RestController
public class JwtController {

    /*
     * The key must contain at least 32 bytes for HS256.
     * This fixed key is acceptable for this training exercise.
     * In a real application, store it securely outside the source code.
     */
    private static final String SECRET =
            "DigitalNurtureWeek3SecretKey1234567890";

    private final SecretKey key =
            Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    @GetMapping("/authenticate")
    public ResponseEntity<Map<String, String>> authenticate(
            @RequestHeader(value = "Authorization", required = false)
            String authorizationHeader) {

        if (authorizationHeader == null ||
                !authorizationHeader.startsWith("Basic ")) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Basic Authorization header is required"));
        }

        try {
            String encodedCredentials =
                    authorizationHeader.substring(6).trim();

            String decodedCredentials =
                    new String(
                            Base64.getDecoder().decode(encodedCredentials),
                            StandardCharsets.UTF_8
                    );

            String[] credentials = decodedCredentials.split(":", 2);

            if (credentials.length != 2) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Invalid Authorization header"));
            }

            String username = credentials[0];
            String password = credentials[1];

            /*
             * Credentials used for this hands-on:
             * username: user
             * password: pwd
             */
            if (!username.equals("user") || !password.equals("pwd")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Invalid username or password"));
            }

            Instant now = Instant.now();

            String token = Jwts.builder()
                    .subject(username)
                    .issuedAt(Date.from(now))
                    .expiration(Date.from(now.plusSeconds(20 * 60)))
                    .signWith(key)
                    .compact();

            return ResponseEntity.ok(Map.of("token", token));

        } catch (IllegalArgumentException exception) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid Base64 credentials"));
        }
    }
}