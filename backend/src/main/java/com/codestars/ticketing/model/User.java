package com.codestars.ticketing.model;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

/**
 * User Entity - Represents a customer in the ticketing system
 * Updated for Assignment 14: Added authentication fields and Kenyan context
 * Demonstrates JPA Entity mapping, One-to-Many relationship, and Spring Security integration
 */
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Column(nullable = false)
    private String name;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String phoneNumber;

    // Authentication fields
    @Column(nullable = true)  // Nullable to support guest checkout
    private String password;  // BCrypt encrypted password

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role = UserRole.USER;  // Default role

    @Column(nullable = false)
    private Boolean enabled = true;  // Account status

    // Kenyan Context - Assignment 14 requirement
    @Column(nullable = true)
    private String county;  // e.g., "Nairobi", "Mombasa", "Kisumu"

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private List<Ticket> tickets = new ArrayList<>();

    public User() {
    }

    public User(String name, String email, String phoneNumber) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.role = UserRole.USER;
        this.enabled = true;
    }

    // Constructor for authenticated users
    public User(String name, String email, String phoneNumber, String password, String county) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;  // Should be BCrypt encrypted before passing
        this.county = county;
        this.role = UserRole.USER;
        this.enabled = true;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    public void addTicket(Ticket ticket) {
        tickets.add(ticket);
        ticket.setUser(this);
    }

    // Authentication getters and setters
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    // Kenyan context getter and setter
    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }
}
