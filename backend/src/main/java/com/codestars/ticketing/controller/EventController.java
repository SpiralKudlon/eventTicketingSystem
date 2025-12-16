package com.codestars.ticketing.controller;

import com.codestars.ticketing.model.Event;
import com.codestars.ticketing.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Event Controller - REST API endpoints for events
 * Demonstrates RESTful API design with proper HTTP methods and status codes
 */
@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class EventController {

    private final EventRepository eventRepository;

    @Autowired
    public EventController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    /**
     * GET /api/events - Retrieve all events
     * Returns: 200 OK with list of events
     */
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        try {
            List<Event> events = eventRepository.findAll();
            return ResponseEntity.ok(events);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * GET /api/events/{id} - Retrieve a specific event
     * Returns: 200 OK if found, 404 NOT FOUND if not found
     */
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        return eventRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * GET /api/events/location/{location} - Filter events by location
     */
    @GetMapping("/location/{location}")
    public ResponseEntity<List<Event>> getEventsByLocation(@PathVariable String location) {
        List<Event> events = eventRepository.findByLocation(location);
        return ResponseEntity.ok(events);
    }

    /**
     * GET /api/events/category/{category} - Filter events by category
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Event>> getEventsByCategory(@PathVariable String category) {
        List<Event> events = eventRepository.findByCategory(category);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Event>> searchEvents(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String location
    ) {
        try {
            List<Event> events = eventRepository.findAll();
            
            if (query != null && !query.trim().isEmpty()) {
                events = eventRepository.findByNameContainingIgnoreCaseOrLocationContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                    query, query, query
                );
            }
            
            if (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("All")) {
                events = events.stream()
                    .filter(e -> e.getCategory().equalsIgnoreCase(category))
                    .collect(java.util.stream.Collectors.toList());
            }
            
            if (location != null && !location.trim().isEmpty() && !location.equalsIgnoreCase("All")) {
                events = events.stream()
                    .filter(e -> e.getLocation().toLowerCase().contains(location.toLowerCase()))
                    .collect(java.util.stream.Collectors.toList());
            }
            
            return ResponseEntity.ok(events);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        try {
            List<String> categories = eventRepository.findAll().stream()
                .map(Event::getCategory)
                .distinct()
                .sorted()
                .collect(java.util.stream.Collectors.toList());
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/locations")
    public ResponseEntity<List<String>> getLocations() {
        try {
            List<String> locations = eventRepository.findAll().stream()
                .map(event -> {
                    String loc = event.getLocation();
                    if (loc.contains(",")) {
                        return loc.substring(loc.lastIndexOf(",") + 1).trim();
                    }
                    return loc;
                })
                .distinct()
                .sorted()
                .collect(java.util.stream.Collectors.toList());
            return ResponseEntity.ok(locations);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
