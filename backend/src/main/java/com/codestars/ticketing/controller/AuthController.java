package com.codestars.ticketing.controller;

import com.codestars.ticketing.model.User;
import com.codestars.ticketing.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Authentication Controller - REST endpoints for user authentication
 * Assignment 14: Simplified endpoints (no refresh token)
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * POST /api/auth/register - Register a new user
     * Assignment 14: Includes Kenyan context (county field)
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            // Validate required fields
            if (request.getName() == null || request.getEmail() == null || 
                request.getPassword() == null || request.getPhoneNumber() == null) {
                return ResponseEntity.badRequest()
                    .body(createErrorResponse("All fields are required"));
            }

            // Register user
            User user = authService.register(
                request.getName(),
                request.getEmail(),
                request.getPassword(),
                request.getPhoneNumber(),
                request.getCounty()
            );

            // Return success response
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Registration successful");
            response.put("user", createUserResponse(user));

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(createErrorResponse(e.getMessage()));
        }
    }

    /**
     * POST /api/auth/login - Authenticate user and return JWT token
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            // Validate credentials
            if (request.getEmail() == null || request.getPassword() == null) {
                return ResponseEntity.badRequest()
                    .body(createErrorResponse("Email and password are required"));
            }

            // Authenticate and generate token
            String token = authService.login(request.getEmail(), request.getPassword());

            // Get user details
            User user = authService.getUserByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

            // Return success response with token
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Login successful");
            response.put("token", token);
            response.put("user", createUserResponse(user));

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(createErrorResponse("Invalid email or password"));
        }
    }

    /**
     * GET /api/auth/me - Get current authenticated user
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        try {
            // Get authentication from SecurityContext
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            
            if (authentication == null || !authentication.isAuthenticated() || 
                authentication.getPrincipal().equals("anonymousUser")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(createErrorResponse("Not authenticated"));
            }

            String email = authentication.getName();
            User user = authService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("user", createUserResponse(user));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createErrorResponse("Error fetching user details"));
        }
    }

    // Helper methods
    private Map<String, Object> createErrorResponse(String message) {
        Map<String, Object> error = new HashMap<>();
        error.put("success", false);
        error.put("error", message);
        return error;
    }

    private Map<String, Object> createUserResponse(User user) {
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("id", user.getId());
        userMap.put("name", user.getName());
        userMap.put("email", user.getEmail());
        userMap.put("phoneNumber", user.getPhoneNumber());
        userMap.put("county", user.getCounty());
        userMap.put("role", user.getRole().name());
        return userMap;
    }

    // Request DTOs
    public static class RegisterRequest {
        private String name;
        private String email;
        private String password;
        private String phoneNumber;
        private String county;

        // Getters and setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        
        public String getPhoneNumber() { return phoneNumber; }
        public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
        
        public String getCounty() { return county; }
        public void setCounty(String county) { this.county = county; }
    }

    public static class LoginRequest {
        private String email;
        private String password;

        // Getters and setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
