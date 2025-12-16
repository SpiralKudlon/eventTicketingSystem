package com.codestars.ticketing.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/session")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"}, allowCredentials = "true")
public class SessionController {

    @GetMapping("/user")
    public ResponseEntity<?> getCurrentUser(HttpSession session) {
        String userEmail = (String) session.getAttribute("userEmail");
        String userName = (String) session.getAttribute("userName");
        
        if (userEmail == null) {
            return ResponseEntity.ok(createResponse(false, null, null));
        }
        
        return ResponseEntity.ok(createResponse(true, userEmail, userName));
    }

    @PostMapping("/user")
    public ResponseEntity<?> setCurrentUser(@RequestBody UserSessionRequest request, HttpSession session) {
        session.setAttribute("userEmail", request.getUserEmail());
        session.setAttribute("userName", request.getUserName());
        
        return ResponseEntity.ok(createResponse(true, request.getUserEmail(), request.getUserName()));
    }

    @DeleteMapping("/user")
    public ResponseEntity<?> clearSession(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(Map.of("success", true, "message", "Session cleared"));
    }

    private Map<String, Object> createResponse(boolean hasSession, String email, String name) {
        Map<String, Object> response = new HashMap<>();
        response.put("hasSession", hasSession);
        response.put("userEmail", email);
        response.put("userName", name);
        return response;
    }

    public static class UserSessionRequest {
        private String userEmail;
        private String userName;

        public String getUserEmail() {
            return userEmail;
        }

        public void setUserEmail(String userEmail) {
            this.userEmail = userEmail;
        }

        public String getUserName() {
            return userName;
        }

        public void setUserName(String userName) {
            this.userName = userName;
        }
    }
}
