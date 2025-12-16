package com.codestars.ticketing.repository;

import com.codestars.ticketing.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Event Repository - Data Access Layer for Event entity
 * Demonstrates Spring Data JPA repository pattern
 */
@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    
    List<Event> findByLocation(String location);
    
    List<Event> findByCategory(String category);
    
    List<Event> findByEventDateAfter(LocalDateTime date);
    
    List<Event> findByAvailableTicketsGreaterThan(Integer quantity);
    
    List<Event> findByNameContainingIgnoreCaseOrLocationContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
        String name, String location, String description
    );
    
    List<Event> findByCategoryIgnoreCase(String category);
    
    List<Event> findByLocationContainingIgnoreCase(String location);
    
    List<Event> findByEventDateBetween(LocalDateTime start, LocalDateTime end);
}
