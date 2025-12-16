package com.codestars.ticketing.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Event Entity - Represents a Kenyan event in the ticketing system
 * Demonstrates JPA Entity mapping and One-to-Many relationship
 */
@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Event name is required")
    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    @NotBlank(message = "Location is required")
    @Column(nullable = false)
    private String location;

    @NotNull(message = "Event date is required")
    @Column(nullable = false)
    private LocalDateTime eventDate;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    @Column(nullable = false)
    private Double priceKES;

    @NotNull(message = "Available tickets is required")
    @Column(nullable = false)
    private Integer availableTickets;

    @Column(nullable = false)
    private Integer totalTickets;

    private String category;

    @Version
    private Long version;

    private String imageUrl;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ticket> tickets = new ArrayList<>();

    public Event() {
    }

    public Event(String name, String description, String location, LocalDateTime eventDate, 
                 Double priceKES, Integer totalTickets, String category, String imageUrl) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.eventDate = eventDate;
        this.priceKES = priceKES;
        this.totalTickets = totalTickets;
        this.availableTickets = totalTickets;
        this.category = category;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDateTime eventDate) {
        this.eventDate = eventDate;
    }

    public Double getPriceKES() {
        return priceKES;
    }

    public void setPriceKES(Double priceKES) {
        this.priceKES = priceKES;
    }

    public Integer getAvailableTickets() {
        return availableTickets;
    }

    public void setAvailableTickets(Integer availableTickets) {
        this.availableTickets = availableTickets;
    }

    public Integer getTotalTickets() {
        return totalTickets;
    }

    public void setTotalTickets(Integer totalTickets) {
        this.totalTickets = totalTickets;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    public boolean hasAvailableTickets(int quantity) {
        return this.availableTickets >= quantity;
    }

    public void reduceAvailableTickets(int quantity) {
        this.availableTickets -= quantity;
    }

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", eventDate=" + eventDate +
                ", priceKES=" + priceKES +
                ", availableTickets=" + availableTickets +
                '}';
    }
}
