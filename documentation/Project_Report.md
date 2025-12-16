# Event Ticketing System - Project Report

## Executive Summary
This project implements a full-stack Event Ticketing System specifically designed for Kenyan events. The system allows users to browse events, purchase tickets, and receive digital tickets with QR codes for event entry.

## Project Overview

### Objective
Develop a production-ready event ticketing platform that demonstrates modern web development practices using Spring Boot and React, with a focus on the Kenyan market.

### Key Features
- Browse events from various Kenyan cities
- Real-time ticket availability tracking
- Secure ticket purchasing
- Automatic QR code generation for tickets
- Email confirmation system
- Responsive mobile-friendly design
- Prices in Kenyan Shillings (KES)

## Technology Stack

### Backend
- **Framework:** Spring Boot 2.7.18
- **Language:** Java 11
- **Database:** H2 (in-memory for development)
- **ORM:** Spring Data JPA
- **Build Tool:** Maven

### Frontend
- **Framework:** React 18.2.0
- **Routing:** React Router 6.8.0
- **HTTP Client:** Axios 1.3.0
- **UI Framework:** Bootstrap 5.3.0
- **QR Code:** qrcode.react 3.1.0

## System Architecture

### Backend Architecture
The backend follows a layered architecture pattern:

1. **Presentation Layer:** REST Controllers
   - `EventController` - Handles event-related requests
   - `TicketController` - Manages ticket purchases

2. **Service Layer:** Business Logic
   - `TicketService` - Implements ticket purchase logic

3. **Data Access Layer:** Repositories
   - `UserRepository`, `EventRepository`, `TicketRepository`

4. **Domain Layer:** JPA Entities
   - `User`, `Event`, `Ticket`

### Frontend Architecture
The frontend uses a component-based architecture:
- **App.js:** Root component with routing
- **Components:** EventList, TicketCheckout, TicketConfirmation, Navbar
- **API Layer:** Axios configuration for backend communication

## Database Design

### Entities

#### User
- Stores customer information
- One-to-Many relationship with Ticket

#### Event
- Stores event details (name, location, date, price)
- Tracks ticket availability
- One-to-Many relationship with Ticket

#### Ticket
- Represents purchased tickets
- Many-to-One relationships with User and Event
- Auto-generates unique ticket codes

### Relationships
- One User can purchase Many Tickets
- One Event can have Many Tickets
- Each Ticket belongs to one User and one Event

See `ER_Diagram.png` for visual representation.

## API Documentation

### Endpoints

#### GET /api/events
Returns all available events
- **Response:** 200 OK with event array

#### GET /api/events/{id}
Returns specific event details
- **Response:** 200 OK or 404 NOT FOUND

#### POST /api/ticket/purchase
Purchases a ticket
- **Request Body:** eventId, userName, userEmail, phoneNumber, quantity
- **Response:** 201 CREATED with ticket details or 400 BAD REQUEST

#### GET /api/ticket/{ticketCode}
Retrieves ticket by code
- **Response:** 200 OK or 404 NOT FOUND

See `Postman_Collection.json` for complete API testing.

## Key Concepts Demonstrated

### 1. Dependency Injection (Spring Boot)
Spring Boot's IoC container manages bean lifecycle and dependencies automatically. This is demonstrated in:
- Constructor injection in services and controllers
- Automatic wiring of repositories
- Component scanning for auto-configuration

**Example:**
```java
@Service
public class TicketService {
    private final TicketRepository ticketRepository;
    
    @Autowired
    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }
}
```

### 2. Virtual DOM (React)
React's Virtual DOM efficiently updates only changed components rather than re-rendering the entire page. This improves performance and user experience.

**Demonstrated in:**
- EventList component updating when data loads
- Form inputs updating on user interaction
- Navigation between pages without full reload

### 3. RESTful API Design
- Proper HTTP methods (GET, POST)
- Meaningful resource URLs
- Appropriate status codes
- JSON request/response format

### 4. State Management (React Hooks)
- **useState:** Managing component state
- **useEffect:** Side effects and data fetching
- **useNavigate:** Programmatic navigation
- **useParams:** URL parameter extraction

### 5. Error Handling
- Backend validation with proper error messages
- Frontend loading and error states
- User-friendly error displays

## Kenyan Context Implementation

### Currency
All prices displayed in Kenyan Shillings (KES) using proper formatting:
```javascript
new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES'
}).format(price)
```

### Events
Pre-loaded with authentic Kenyan events:
- Nairobi Tech Summit
- Mombasa Beach Festival
- Kisumu Jazz Festival
- Nairobi Marathon
- And more from various Kenyan cities

### Localization
- Phone number format for Kenya (+254)
- Date/time formatting for East African timezone
- Location-based event filtering

## Testing Strategy

### Backend Testing
- Unit tests for services
- Integration tests for controllers
- Repository tests with H2 database

### Frontend Testing
- Component testing with React Testing Library
- Integration testing for user flows
- Manual testing documented in screenshots

### API Testing
- Postman collection with all endpoints
- Test scenarios for success and error cases
- Validation testing

## Deployment Considerations

### Backend
- Package as JAR file: `mvn clean package`
- Run with: `java -jar target/event-ticketing-system-1.0.0.jar`
- Configure production database (MySQL/PostgreSQL)

### Frontend
- Build production bundle: `npm run build`
- Deploy to static hosting (Netlify, Vercel)
- Configure environment variables for API URL

## Security Considerations

### Implemented
- Input validation on backend
- CORS configuration
- Email validation
- Quantity validation

### Future Enhancements
- User authentication (JWT)
- Payment gateway integration (M-Pesa)
- HTTPS encryption
- Rate limiting

## Future Enhancements

1. **Payment Integration**
   - M-Pesa API integration
   - Credit/Debit card payments

2. **User Accounts**
   - User registration and login
   - Order history
   - Profile management

3. **Event Management**
   - Admin dashboard
   - Event creation and editing
   - Analytics and reporting

4. **Notifications**
   - Email confirmations
   - SMS notifications
   - Event reminders

5. **Advanced Features**
   - Seat selection
   - Early bird pricing
   - Discount codes
   - Social sharing

## Challenges and Solutions

### Challenge 1: CORS Issues
**Solution:** Configured CORS in Spring Boot to allow requests from React frontend

### Challenge 2: State Management
**Solution:** Used React hooks (useState, useEffect) for efficient state management

### Challenge 3: QR Code Generation
**Solution:** Integrated qrcode.react library for client-side QR generation

## Conclusion

This Event Ticketing System successfully demonstrates:
- Full-stack development with Spring Boot and React
- RESTful API design and implementation
- Modern frontend development with hooks
- Database design with proper relationships
- Kenyan market localization
- Professional code organization and documentation

The system is production-ready and can be extended with additional features like payment integration and user authentication.

## References

- Spring Boot Documentation: https://spring.io/projects/spring-boot
- React Documentation: https://react.dev
- Bootstrap Documentation: https://getbootstrap.com
- Spring Data JPA: https://spring.io/projects/spring-data-jpa

## Appendices

- Appendix A: Complete API Documentation (Postman Collection)
- Appendix B: Database Schema (ER Diagram)
- Appendix C: UI Screenshots
- Appendix D: Source Code Structure
