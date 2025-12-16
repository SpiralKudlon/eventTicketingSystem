package com.codestars.ticketing.service;

import com.codestars.ticketing.model.Event;
import com.codestars.ticketing.model.Ticket;
import com.codestars.ticketing.model.User;
import com.codestars.ticketing.repository.EventRepository;
import com.codestars.ticketing.repository.TicketRepository;
import com.codestars.ticketing.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Ticket Service - Business Logic Layer
 * Demonstrates Dependency Injection and Service Layer pattern
 * Spring automatically injects repository dependencies via @Autowired
 */
@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Autowired
    public TicketService(TicketRepository ticketRepository, 
                        EventRepository eventRepository,
                        UserRepository userRepository,
                        EmailService emailService) {
        this.ticketRepository = ticketRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    /**
     * Purchase a ticket for an event
     * Demonstrates transactional business logic with proper error handling
     */
    @Transactional
    public Ticket purchaseTicket(Long eventId, String userName, String userEmail, 
                                String phoneNumber, Integer quantity) {
        
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + eventId));

        if (!event.hasAvailableTickets(quantity)) {
            throw new RuntimeException("Not enough tickets available. Only " + 
                    event.getAvailableTickets() + " tickets remaining.");
        }

        User user = userRepository.findByEmail(userEmail)
                .orElseGet(() -> {
                    User newUser = new User(userName, userEmail, phoneNumber);
                    return userRepository.save(newUser);
                });

        Double totalPrice = event.getPriceKES() * quantity;
        Ticket ticket = new Ticket(user, event, quantity, totalPrice);

        event.reduceAvailableTickets(quantity);
        eventRepository.save(event);
        
        Ticket savedTicket = ticketRepository.save(ticket);
        
        try {
            emailService.sendTicketConfirmation(savedTicket, user);
        } catch (Exception e) {
            System.err.println("Failed to send confirmation email: " + e.getMessage());
        }
        
        return savedTicket;
    }

    /**
     * Get ticket by ticket code
     */
    public Ticket getTicketByCode(String ticketCode) {
        return ticketRepository.findByTicketCode(ticketCode)
                .orElseThrow(() -> new RuntimeException("Ticket not found with code: " + ticketCode));
    }

    /**
     * Cancel a ticket
     */
    @Transactional
    public Ticket cancelTicket(String ticketCode) {
        Ticket ticket = getTicketByCode(ticketCode);
        
        if (ticket.getStatus() != Ticket.TicketStatus.ACTIVE) {
            throw new RuntimeException("Only active tickets can be cancelled");
        }

        ticket.setStatus(Ticket.TicketStatus.CANCELLED);

        Event event = ticket.getEvent();
        event.setAvailableTickets(event.getAvailableTickets() + ticket.getQuantity());
        eventRepository.save(event);

        return ticketRepository.save(ticket);
    }
}
