package com.codestars.ticketing.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

/**
 * JWT Utility Class - Simple JWT token generation and validation
 * Assignment 14: 24-hour token expiration, no refresh tokens
 */
@Component
public class JwtUtil {

    // Secret key for JWT signing (In production, use environment variable)
    private static final String SECRET_KEY = "TiketiAfrikaSecretKeyForJWTTokenGeneration2026EventTicketingSystemKenyanEvents";
    private static final long EXPIRATION_TIME = 86400000; // 24 hours in milliseconds

    private final Key key;

    public JwtUtil() {
        this.key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    /**
     * Generate JWT token for a user
     * @param email User's email (used as subject)
     * @return JWT token string
     */
    public String generateToken(String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extract email from JWT token
     * @param token JWT token
     * @return User's email
     */
    public String getEmailFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    /**
     * Validate JWT token
     * @param token JWT token
     * @return true if valid, false otherwise
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            System.err.println("Invalid JWT token: " + e.getMessage());
            return false;
        }
    }

    /**
     * Check if token is expired
     * @param token JWT token
     * @return true if expired
     */
    public boolean isTokenExpired(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            
            return claims.getExpiration().before(new Date());
        } catch (JwtException e) {
            return true;
        }
    }
}
