package com.codestars.ticketing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Application Class for Event Ticketing System
 * Demonstrates Dependency Injection - Spring Boot's IoC container
 * automatically manages bean lifecycle and dependencies
 */
@SpringBootApplication
public class EventTicketingApplication {

    public static void main(String[] args) {
        SpringApplication.run(EventTicketingApplication.class, args);
        System.out.println("\n========================================");
        System.out.println("Event Ticketing System Started!");
        System.out.println("H2 Console: http://localhost:8080/h2-console");
        System.out.println("API Base URL: http://localhost:8080/api");
        System.out.println("========================================\n");
    }
}
