package com.codestars.ticketing.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * JWT Authentication Filter - Part of Spring Security Filter Chain
 * Assignment 14: Exam Concept - Demonstrates how Spring Security filters work
 * 
 * FILTER CHAIN EXPLANATION:
 * 1. This filter intercepts EVERY HTTP request before it reaches the controller
 * 2. It extracts the JWT token from the Authorization header
 * 3. Validates the token using JwtUtil
 * 4. If valid, loads user details and sets authentication in SecurityContext
 * 5. The request then proceeds to the next filter in the chain
 * 6. Controllers can access the authenticated user via SecurityContextHolder
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {
        
        // Step 1: Extract JWT token from Authorization header
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String email = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7); // Remove "Bearer " prefix
            
            try {
                // Step 2: Extract email from token
                email = jwtUtil.getEmailFromToken(token);
            } catch (Exception e) {
                System.err.println("Error extracting email from token: " + e.getMessage());
            }
        }

        // Step 3: Validate token and set authentication
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            
            // Step 4: Load user details from database
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);

            // Step 5: Validate token
            if (jwtUtil.validateToken(token) && !jwtUtil.isTokenExpired(token)) {
                
                // Step 6: Create authentication object and set in SecurityContext
                UsernamePasswordAuthenticationToken authentication = 
                    new UsernamePasswordAuthenticationToken(
                        userDetails, 
                        null, 
                        userDetails.getAuthorities()
                    );
                
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                // This makes the user "authenticated" for this request
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        // Step 7: Continue the filter chain
        filterChain.doFilter(request, response);
    }
}
