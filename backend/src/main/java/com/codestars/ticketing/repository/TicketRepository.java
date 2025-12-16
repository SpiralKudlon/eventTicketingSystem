package com.codestars.ticketing.repository;

import com.codestars.ticketing.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Ticket Repository - Data Access Layer for Ticket entity
 * Demonstrates Spring Data JPA repository pattern
 */
@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    
    Optional<Ticket> findByTicketCode(String ticketCode);
    
    List<Ticket> findByUserId(Long userId);
    
    List<Ticket> findByEventId(Long eventId);
    
    List<Ticket> findByStatus(Ticket.TicketStatus status);
}
