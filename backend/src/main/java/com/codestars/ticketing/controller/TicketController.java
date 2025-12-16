package com.codestars.ticketing.controller;

import com.codestars.ticketing.model.Ticket;
import com.codestars.ticketing.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.apache.commons.validator.routines.EmailValidator;

import java.util.HashMap;
import java.util.Map;

/**
 * Ticket Controller - REST API endpoints for ticket operations
 * Demonstrates RESTful API design with proper error handling
 */
@RestController
@RequestMapping("/api/ticket")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class TicketController {

    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    /**
     * POST /api/ticket/purchase - Purchase a ticket
     * Request Body: {eventId, userName, userEmail, phoneNumber, quantity}
     * Returns: 201 CREATED with ticket details, 400 BAD REQUEST on error
     */
    @PostMapping("/purchase")
    public ResponseEntity<?> purchaseTicket(@RequestBody TicketPurchaseRequest request) {
        try {
            if (request.getEventId() == null || request.getUserName() == null || 
                request.getUserEmail() == null || request.getQuantity() == null) {
                return ResponseEntity.badRequest()
                        .body(createErrorResponse("Missing required fields"));
            }

            if (request.getQuantity() <= 0) {
                return ResponseEntity.badRequest()
                        .body(createErrorResponse("Quantity must be greater than 0"));
            }

            if (!EmailValidator.getInstance().isValid(request.getUserEmail())) {
                return ResponseEntity.badRequest()
                        .body(createErrorResponse("Invalid email format. Please enter a valid email address."));
            }

            Ticket ticket = ticketService.purchaseTicket(
                    request.getEventId(),
                    request.getUserName(),
                    request.getUserEmail(),
                    request.getPhoneNumber(),
                    request.getQuantity()
            );

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Ticket purchased successfully");
            response.put("ticketCode", ticket.getTicketCode());
            response.put("ticketId", ticket.getId());
            response.put("quantity", ticket.getQuantity());
            response.put("totalPrice", ticket.getTotalPrice());
            response.put("purchaseDate", ticket.getPurchaseDate());
            response.put("eventName", ticket.getEvent().getName());
            response.put("eventDate", ticket.getEvent().getEventDate());
            response.put("eventLocation", ticket.getEvent().getLocation());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(createErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("An error occurred while processing your request"));
        }
    }

    /**
     * GET /api/ticket/{ticketCode} - Retrieve ticket by code
     * Returns: 200 OK with ticket details, 404 NOT FOUND if not found
     */
    @GetMapping("/{ticketCode}")
    public ResponseEntity<?> getTicketByCode(@PathVariable String ticketCode) {
        try {
            Ticket ticket = ticketService.getTicketByCode(ticketCode);
            
            Map<String, Object> response = new HashMap<>();
            response.put("ticketCode", ticket.getTicketCode());
            response.put("quantity", ticket.getQuantity());
            response.put("totalPrice", ticket.getTotalPrice());
            response.put("status", ticket.getStatus());
            response.put("purchaseDate", ticket.getPurchaseDate());
            response.put("eventName", ticket.getEvent().getName());
            response.put("eventDate", ticket.getEvent().getEventDate());
            response.put("eventLocation", ticket.getEvent().getLocation());
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(createErrorResponse(e.getMessage()));
        }
    }

    private Map<String, Object> createErrorResponse(String message) {
        Map<String, Object> error = new HashMap<>();
        error.put("success", false);
        error.put("error", message);
        return error;
    }

    public static class TicketPurchaseRequest {
        private Long eventId;
        private String userName;
        private String userEmail;
        private String phoneNumber;
        private Integer quantity;

        public Long getEventId() {
            return eventId;
        }

        public void setEventId(Long eventId) {
            this.eventId = eventId;
        }

        public String getUserName() {
            return userName;
        }

        public void setUserName(String userName) {
            this.userName = userName;
        }

        public String getUserEmail() {
            return userEmail;
        }

        public void setUserEmail(String userEmail) {
            this.userEmail = userEmail;
        }

        public String getPhoneNumber() {
            return phoneNumber;
        }

        public void setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
        }

        public Integer getQuantity() {
            return quantity;
        }

        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }
    }
}
