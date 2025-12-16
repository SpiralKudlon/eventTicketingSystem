# Event Ticketing System - Backend

## Overview
Spring Boot backend for the Event Ticketing System, providing RESTful APIs for managing events and ticket purchases for Kenyan events.

## Technology Stack
- Java: 11
- Spring Boot: 2.7.18
- Spring Data JPA: For database operations
- H2 Database: In-memory database for development
- Maven: Build and dependency management

## Project Structure
```
backend/
├── pom.xml
├── src/main/
│   ├── java/com/codestars/ticketing/
│   │   ├── EventTicketingApplication.java
│   │   ├── config/
│   │   │   └── DataLoader.java
│   │   ├── model/
│   │   │   ├── User.java
│   │   │   ├── Event.java
│   │   │   └── Ticket.java
│   │   ├── repository/
│   │   │   ├── UserRepository.java
│   │   │   ├── EventRepository.java
│   │   │   └── TicketRepository.java
│   │   ├── service/
│   │   │   └── TicketService.java
│   │   └── controller/
│   │       ├── EventController.java
│   │       └── TicketController.java
│   └── resources/
│       └── application.properties
```

## Setup Instructions

### Prerequisites
- Java 11 or higher
- Maven 3.6+
- IntelliJ IDEA (recommended)

### Running with IntelliJ IDEA

1. Open Project in IntelliJ:
   - Open IntelliJ IDEA
   - File → Open → Select the `backend` folder
   - IntelliJ will automatically detect the Maven project

2. Import Maven Dependencies:
   - IntelliJ should automatically import dependencies
   - If not, right-click on `pom.xml` → Maven → Reload Project

3. Run the Application:
   - Locate `EventTicketingApplication.java`
   - Right-click → Run 'EventTicketingApplication'
   - Or click the green play button in the gutter

4. Verify the Application:
   - Application runs on: `http://localhost:8080`
   - H2 Console: `http://localhost:8080/h2-console`
   - API Base URL: `http://localhost:8080/api`

### Running with Maven Command Line

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

## Database Configuration

### H2 Console Access
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:ticketingdb`
- Username: `sa`
- Password: (leave empty)

### Pre-loaded Data
The application automatically loads 8 Kenyan events on startup:
1. Nairobi Tech Summit 2024
2. Mombasa Beach Festival
3. Kisumu Jazz Festival
4. Nairobi Marathon 2024
5. Eldoret Agricultural Expo
6. Nakuru Comedy Night
7. Thika Food & Wine Festival
8. Machakos Cultural Festival

## API Endpoints

### Events

#### GET /api/events
Get all events
```bash
curl http://localhost:8080/api/events
```

#### GET /api/events/{id}
Get event by ID
```bash
curl http://localhost:8080/api/events/1
```

#### GET /api/events/location/{location}
Filter events by location
```bash
curl http://localhost:8080/api/events/location/Nairobi
```

#### GET /api/events/category/{category}
Filter events by category
```bash
curl http://localhost:8080/api/events/category/Technology
```

### Tickets

#### POST /api/ticket/purchase
Purchase a ticket
```bash
curl -X POST http://localhost:8080/api/ticket/purchase \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": 1,
    "userName": "John Doe",
    "userEmail": "john@example.com",
    "phoneNumber": "+254700000000",
    "quantity": 2
  }'
```

#### GET /api/ticket/{ticketCode}
Get ticket by code
```bash
curl http://localhost:8080/api/ticket/TKT-ABC12345
```

## Key Concepts Demonstrated

### 1. Dependency Injection
Spring Boot's IoC (Inversion of Control) container automatically manages bean lifecycle and dependencies. See examples in:
- `TicketService.java` - Constructor injection of repositories
- `EventController.java` - Automatic injection of EventRepository

### 2. JPA Entity Relationships
- One-to-Many: User → Tickets, Event → Tickets
- Many-to-One: Ticket → User, Ticket → Event

### 3. RESTful API Design
- Proper HTTP methods (GET, POST)
- Appropriate status codes (200 OK, 201 CREATED, 400 BAD REQUEST, 404 NOT FOUND)
- JSON request/response format

### 4. Error Handling
- Validation annotations (@NotBlank, @Email, @Positive)
- Try-catch blocks with meaningful error messages
- Proper HTTP status codes for errors

## CORS Configuration
CORS is configured to allow requests from `http://localhost:3000` (React frontend).

## Testing
Use the provided Postman collection (`documentation/Postman_Collection.json`) to test all API endpoints.

## Troubleshooting

### Port Already in Use
If port 8080 is already in use, change it in `application.properties`:
```properties
server.port=8081
```

### Database Issues
The H2 database is in-memory and resets on every restart. This is intentional for development.

## Next Steps
- Connect the React frontend
- Test the complete flow
- Review the ER diagram in `documentation/ER_Diagram.png`
