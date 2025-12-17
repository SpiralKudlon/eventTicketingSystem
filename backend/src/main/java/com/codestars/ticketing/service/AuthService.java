package com.codestars.ticketing.service;

import com.codestars.ticketing.model.User;
import com.codestars.ticketing.model.UserRole;
import com.codestars.ticketing.repository.UserRepository;
import com.codestars.ticketing.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.regex.Pattern;

/**
 * Authentication Service - Business logic for user registration and login
 * Assignment 14: Includes Kenyan phone number validation
 */
@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    // Kenyan phone number patterns
    private static final Pattern KENYAN_PHONE_PATTERN = 
        Pattern.compile("^(\\+254|0)[17]\\d{8}$");

    /**
     * Register a new user
     * Assignment 14: Validates Kenyan phone format and includes county
     */
    public User register(String name, String email, String password, String phoneNumber, String county) {
        // Validate email uniqueness
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        // Validate Kenyan phone number format
        if (!isValidKenyanPhone(phoneNumber)) {
            throw new RuntimeException("Invalid Kenyan phone number. Must start with +254 or 07/01");
        }

        // Validate password strength
        if (password == null || password.length() < 6) {
            throw new RuntimeException("Password must be at least 6 characters long");
        }

        // Create new user
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password)); // BCrypt encryption
        user.setPhoneNumber(phoneNumber);
        user.setCounty(county);
        user.setRole(UserRole.USER);
        user.setEnabled(true);

        return userRepository.save(user);
    }

    /**
     * Authenticate user and generate JWT token
     */
    public String login(String email, String password) {
        try {
            // Authenticate using Spring Security
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
            );

            // If authentication successful, generate JWT token
            return jwtUtil.generateToken(email);

        } catch (Exception e) {
            throw new RuntimeException("Invalid email or password");
        }
    }

    /**
     * Get user by email
     */
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Validate Kenyan phone number format
     * Assignment 14: Kenyan Context requirement
     * 
     * Valid formats:
     * - +254712345678 (international format)
     * - 0712345678 (local format starting with 07)
     * - 0112345678 (local format starting with 01)
     */
    private boolean isValidKenyanPhone(String phoneNumber) {
        if (phoneNumber == null || phoneNumber.trim().isEmpty()) {
            return false;
        }
        
        // Remove spaces and dashes
        String cleanPhone = phoneNumber.replaceAll("[\\s-]", "");
        
        return KENYAN_PHONE_PATTERN.matcher(cleanPhone).matches();
    }
}
