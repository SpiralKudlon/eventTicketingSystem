# Event Ticketing System

A full-stack event ticketing platform for Kenyan events, built with Spring Boot and React.

![Project Banner](https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=300&fit=crop)

## Project Overview

This Event Ticketing System is a comprehensive full-stack application designed specifically for the Kenyan market. It allows users to browse events across Kenya, purchase tickets online, and receive digital tickets with QR codes for event entry.

### Key Features

🎫 **Event Browsing** - View events from Nairobi, Mombasa, Kisumu, and other Kenyan cities  
📊 **Real-time Availability** - Live ticket availability tracking  
🔒 **Secure Purchasing** - Safe and reliable ticket purchase system  
📱 **QR Code Tickets** - Automatic generation of scannable QR codes for entry  
💰 **Kenyan Currency** - All prices displayed in KES (Kenyan Shillings)  
📅 **Event Calendar** - Interactive calendar view for event planning  
🎨 **Modern UI** - Beautiful, responsive design with gradient themes  
🔍 **Smart Search** - Filter events by category, location, and date  
📧 **Email Notifications** - Instant ticket confirmation emails  
🌐 **RESTful API** - Clean separation between frontend and backend  

### User Flow
1. **Browse Events** → Discover events on the homepage or events page
2. **Select Event** → View event details and available tickets
3. **Checkout** → Fill in your details and select quantity
4. **Get QR Ticket** → Receive instant digital ticket with QR code  

##  Technology Stack

### Backend
- Java 11 - Programming language
- Spring Boot 2.7 - Application framework
- Spring Data JPA - Database operations
- H2 Database - In-memory database (development)
- Maven - Build and dependency management

### Frontend
- React 18 - UI framework
- React Router 6 - Navigation
- Axios - HTTP client
- Bootstrap 5 - CSS framework
- QRCode.react - QR code generation

## Project Structure

```
EventTicketingSystem/
├── backend/                        # Spring Boot backend
│   ├── src/main/java/com/codestars/ticketing/
│   │   ├── EventTicketingApplication.java
│   │   ├── model/                  # JPA Entities
│   │   │   ├── User.java
│   │   │   ├── Event.java
│   │   │   └── Ticket.java
│   │   ├── repository/             # Data access layer
│   │   │   ├── UserRepository.java
│   │   │   ├── EventRepository.java
│   │   │   └── TicketRepository.java
│   │   ├── service/                # Business logic
│   │   │   ├── TicketService.java
│   │   │   └── EmailService.java
│   │   ├── controller/             # REST endpoints
│   │   │   ├── EventController.java
│   │   │   ├── TicketController.java
│   │   │   └── SessionController.java
│   │   └── config/                 # Configuration
│   │       └── DataLoader.java
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── pom.xml
│   └── README-backend.md
│
├── frontend/                       # React frontend
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── Navbar.js           # Modern navigation header
│   │   │   ├── Footer.js           # Site footer
│   │   │   ├── EventCard.js        # Event display card
│   │   │   ├── EventList.js        # Event listing component
│   │   │   ├── CheckoutForm.js     # Ticket purchase form
│   │   │   ├── TicketCheckout.js   # Checkout page component
│   │   │   ├── TicketConfirmation.js # QR code ticket display
│   │   │   ├── TicketConfirmationModal.js
│   │   │   └── SkipLink.js         # Accessibility component
│   │   ├── pages/                  # Page components
│   │   │   ├── EventsPage.js       # Events listing with filters
│   │   │   ├── AboutPage.js        # About us page
│   │   │   ├── AboutSection.js     # About section component
│   │   │   ├── ContactPage.js      # Contact form page
│   │   │   ├── CalendarPage.js     # Event calendar view
│   │   │   ├── Testimonials.js     # Customer reviews carousel
│   │   │   └── Newsletter.js       # Email subscription
│   │   ├── styles/                 # CSS stylesheets
│   │   │   ├── modern-theme.css    # Modern UI theme
│   │   │   ├── events-page.css     # Events page styles
│   │   │   ├── checkout.css        # Checkout page styles
│   │   │   └── responsive.css      # Mobile responsive styles
│   │   ├── api/
│   │   │   └── axiosConfig.js      # API configuration
│   │   ├── App.js                  # Root component with routing
│   │   ├── index.js                # Entry point
│   │   ├── theme.css               # Base theme variables
│   │   └── custom.css              # Custom overrides
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── README-frontend.md
│
└── documentation/                  # Project documentation
    ├── Project_Report.md
    ├── Postman_Collection.json
    └── UI_Screenshots/
        └── README.md
```

## Quick Start

### Prerequisites
- Java 11+ installed
- Node.js 14+ and npm installed
- Maven 3.6+ installed
- IntelliJ IDEA (recommended for backend)

### Backend Setup

1. Open in IntelliJ IDEA:
   ```bash
   cd backend
   # Open the backend folder in IntelliJ IDEA
   # IntelliJ will automatically detect the Maven project
   ```

2. Run the application:
   - Locate `EventTicketingApplication.java`
   - Right-click → Run 'EventTicketingApplication'
   - Or use Maven: `mvn spring-boot:run`

3. Verify:
   - Backend: http://localhost:8080
   - H2 Console: http://localhost:8080/h2-console
   - API: http://localhost:8080/api/events

### Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start development server:
   ```bash
   npm start
   ```

3. Access the application:
   - Open browser to http://localhost:3000

## Database Schema

The system uses three main entities with proper JPA relationships:

### Entities
- User - Customer information
- Event - Event details (name, location, date, price in KES)
- Ticket - Purchased tickets with unique codes

### Relationships
- User → Tickets (One-to-Many)
- Event → Tickets (One-to-Many)
- Ticket → User & Event (Many-to-One)

See `documentation/ER_Diagram.png` for the complete ER diagram.

## API Endpoints

### Events
- `GET /api/events` - Get all events
- `GET /api/events/{id}` - Get event by ID
- `GET /api/events/location/{location}` - Filter by location
- `GET /api/events/category/{category}` - Filter by category

### Tickets
- `POST /api/ticket/purchase` - Purchase a ticket
- `GET /api/ticket/{ticketCode}` - Get ticket by code

See `documentation/Postman_Collection.json` for complete API testing.

## Key Concepts Demonstrated

### 1. Dependency Injection (Spring Boot)
Spring Boot's IoC container automatically manages bean lifecycle and dependencies. Demonstrated in services and controllers with constructor injection.

### 2. Virtual DOM (React)
React efficiently updates only changed components rather than re-rendering the entire page, improving performance.

### 3. RESTful API Design
- Proper HTTP methods (GET, POST)
- Meaningful resource URLs
- Appropriate status codes (200, 201, 400, 404)
- JSON request/response format

### 4. React Hooks
- `useState` - State management
- `useEffect` - Data fetching and side effects
- `useNavigate` - Programmatic navigation
- `useParams` - URL parameter extraction

### 5. JPA Relationships
- One-to-Many and Many-to-One relationships
- Cascade operations
- Lazy loading

## Kenyan Context

### Pre-loaded Events
The system comes with 8 authentic Kenyan events:
1. Nairobi Tech Summit - Technology conference at KICC
2. Mombasa Beach Festival - Coastal celebration at Diani Beach
3. Kisumu Jazz Festival - Music event at Lake Victoria
4. Nairobi Marathon - Sports event at Uhuru Park
5. Eldoret Agricultural Expo - Agricultural showcase
6. Nakuru Comedy Night - Entertainment event
7. Thika Food & Wine Festival - Culinary experience
8. Machakos Cultural Festival - Cultural celebration

### Localization
- Prices in KES (Kenyan Shillings)
- Phone numbers in Kenyan format (+254)
- Events from major Kenyan cities
- Date/time in East African timezone

## Documentation

Comprehensive documentation is available in the `documentation/` folder:

- Project_Report.md - Complete project documentation
- Postman_Collection.json - API testing collection
- ER_Diagram.png - Database schema visualization
- README-backend.md - Backend setup and details
- README-frontend.md - Frontend setup and details

## Testing

### Backend Testing
Use the Postman collection to test all API endpoints:
```bash
Import documentation/Postman_Collection.json into Postman
```

### Frontend Testing
```bash
cd frontend
npm test
```

## Video Demo Requirements

For your assignment submission, create a 5-7 minute video demonstrating:

1. Application Functionality
   - Browse events
   - Purchase tickets
   - View QR code confirmation

2. Kenyan Context
   - Show events from different Kenyan cities
   - Demonstrate KES pricing
   - Highlight local event themes

3. Code Walkthrough
   - Explain Dependency Injection in `TicketService.java`
   - Show Virtual DOM concept in React components
   - Demonstrate JPA relationships in entities
   - Walk through the ticket purchase flow

## Security Features

- Input validation on backend
- Email format validation
- Quantity validation
- CORS configuration
- Error handling with proper HTTP status codes

## Future Enhancements

- M-Pesa payment integration
- User authentication (JWT)
- Admin dashboard for event management
- Email/SMS notifications
- Seat selection
- Discount codes
- Social media sharing

## License

This project is created for educational purposes as part of Assignment 14.

## Contributors

### Founding Team
- **Kuldon Kiariga** - CEO & Founder
- **Robinson Crusoe** - CTO
- **Joseph Chacha** - Head of Operations
- **Levi Njoroge** - Lead Developer
- **Gaudencia Omondi** - Marketing Director

## Support

For questions or issues:
- Check the documentation in `documentation/`
- Review the README files in backend and frontend folders
- Test APIs using the Postman collection

---

Built for Kenyan Events
