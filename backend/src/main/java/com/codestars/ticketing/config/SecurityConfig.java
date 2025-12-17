package com.codestars.ticketing.config;

import com.codestars.ticketing.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

/**
 * Security Configuration - Spring Security Filter Chain Setup
 * Assignment 14: EXAM CONCEPT - Demonstrates Spring Security Filter Chain
 * 
 * SPRING SECURITY FILTER CHAIN EXPLANATION:
 * ==========================================
 * Spring Security uses a chain of filters to process HTTP requests:
 * 
 * 1. CORS Filter - Handles Cross-Origin Resource Sharing
 * 2. CSRF Filter - Protects against Cross-Site Request Forgery (disabled for stateless JWT)
 * 3. Authentication Filters - Our JwtAuthenticationFilter validates JWT tokens
 * 4. Authorization Filter - Checks if authenticated user has required permissions
 * 5. Exception Translation Filter - Handles security exceptions
 * 
 * Each filter can:
 * - Allow request to proceed (filterChain.doFilter())
 * - Block request (return 401/403)
 * - Modify request/response
 * 
 * Our custom JwtAuthenticationFilter is inserted BEFORE UsernamePasswordAuthenticationFilter
 * to validate JWT tokens before Spring's default authentication.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    /**
     * Password encoder bean - Uses BCrypt for secure password hashing
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Authentication Manager bean - Required for login authentication
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    /**
     * Security Filter Chain - Defines which endpoints are public vs protected
     * Assignment 14: Supports both guest checkout and authenticated users
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF for stateless JWT authentication
            .csrf().disable()
            
            // Configure CORS
            .cors().configurationSource(corsConfigurationSource())
            .and()
            
            // Configure authorization rules
            .authorizeRequests()
                // Public endpoints - No authentication required
                .antMatchers("/api/auth/**").permitAll()           // Login, Register
                .antMatchers("/api/events/**").permitAll()         // Browse events
                .antMatchers("/api/ticket/purchase").permitAll()   // Guest checkout support
                .antMatchers("/api/ticket/**").permitAll()         // View tickets
                .antMatchers("/h2-console/**").permitAll()         // H2 database console
                
                // Protected endpoints - Require authentication
                // .antMatchers("/api/admin/**").hasRole("ADMIN")  // Future: Admin endpoints
                
                // All other requests require authentication
                .anyRequest().authenticated()
            .and()
            
            // Stateless session management (JWT doesn't need sessions)
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            
            // Add our JWT filter BEFORE the default authentication filter
            // This is the KEY part of the filter chain configuration
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        // Allow H2 console frames (for development only)
        http.headers().frameOptions().disable();

        return http.build();
    }

    /**
     * CORS Configuration - Allow frontend to access backend
     * Assignment 14: Configured for React frontend on localhost:3000
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:3001"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setExposedHeaders(Arrays.asList("Authorization"));
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
