# Event Ticketing System - Frontend

## Overview
React-based frontend for the Event Ticketing System, providing a user-friendly interface for browsing events and purchasing tickets.

## Technology Stack
- React: 18.2.0
- React Router: 6.8.0 for navigation
- Axios: 1.3.0 for API calls
- Bootstrap: 5.3.0 for styling
- React Bootstrap: 2.7.0 for React components
- QRCode.react: 3.1.0 for QR code generation

## Project Structure
```
frontend/
├── package.json
├── public/
│   └── index.html
└── src/
    ├── index.js
    ├── App.js
    ├── api/
    │   └── axiosConfig.js
    └── components/
        ├── Navbar.js
        ├── EventList.js
        ├── TicketCheckout.js
        └── TicketConfirmation.js
```

## Setup Instructions

### Prerequisites
- Node.js 14+ and npm

### Installation

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Access the application:
   - Open browser to `http://localhost:3000`
   - The app will automatically reload on code changes

## Components

### 1. EventList.js
- Purpose: Display all available events
- Features:
  - Fetches events from backend API
  - Shows loading spinner while fetching
  - Displays error messages if API fails
  - Responsive card layout with event details
  - Filter by category and location
  - Shows ticket availability
  - Prices displayed in KES (Kenyan Shillings)

### 2. TicketCheckout.js
- Purpose: Purchase ticket form
- Features:
  - Event details display
  - User information form (name, email, phone)
  - Quantity selector
  - Real-time price calculation
  - Form validation
  - Loading state during purchase
  - Error handling

### 3. TicketConfirmation.js
- Purpose: Display purchased ticket with QR code
- Features:
  - QR code generation with ticket code
  - Event and ticket details
  - Print functionality
  - Instructions for event attendance

### 4. Navbar.js
- Purpose: Navigation bar
- Features:
  - Brand logo and name
  - Links to Events and About pages
  - Responsive mobile menu

## Key Concepts Demonstrated

### 1. React Hooks
- useState: Managing component state (events, loading, errors, form data)
- useEffect: Fetching data on component mount
- useNavigate: Programmatic navigation
- useParams: Reading URL parameters
- useLocation: Accessing route state

### 2. Virtual DOM
React efficiently updates only the components that change, rather than re-rendering the entire page. This is demonstrated in:
- EventList updating when data loads
- Form inputs updating on user interaction
- Navigation between pages without full page reload

### 3. Component Composition
Breaking down the UI into reusable components:
- Navbar (used across all pages)
- EventList, TicketCheckout, TicketConfirmation (page components)
- Each component has a single responsibility

### 4. State Management
- Local state with useState
- Prop drilling for passing data
- React Router state for navigation data

### 5. API Integration
- Axios instance with base URL configuration
- Request/response interceptors for logging
- Error handling for network failures
- Loading states for better UX

## API Configuration

The frontend connects to the backend at `http://localhost:8080/api`. This is configured in `src/api/axiosConfig.js`.

To change the backend URL, edit:
```javascript
baseURL: 'http://localhost:8080/api'
```

## User Flow

1. Browse Events (`/`)
   - View all available Kenyan events
   - See event details, prices in KES, and availability

2. Select Event
   - Click "Buy Ticket" button
   - Navigate to checkout page

3. Checkout (`/checkout/:eventId`)
   - View event details
   - Fill in personal information
   - Select ticket quantity
   - See total price calculation
   - Submit purchase

4. Confirmation (`/confirmation`)
   - View ticket details
   - See QR code for event entry
   - Print ticket
   - Return to browse more events

## Styling

The application uses Bootstrap 5 for responsive design:
- Mobile-first approach
- Responsive grid system
- Pre-built components (Cards, Forms, Buttons)
- Bootstrap Icons for visual elements

## Error Handling

The application handles various error scenarios:
- Backend server not running
- Network failures
- Invalid form data
- Sold out events
- Missing ticket data

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Testing

```bash
npm test
```

## Kenyan Context

The application is specifically designed for the Kenyan market:
- Prices displayed in KES (Kenyan Shillings)
- Events from various Kenyan cities (Nairobi, Mombasa, Kisumu, etc.)
- Phone number format for Kenyan numbers (+254)
- Date/time formatted for East African timezone

## Troubleshooting

### Backend Connection Issues
- Ensure backend is running on `http://localhost:8080`
- Check CORS configuration in backend
- Verify network connectivity

### npm Install Errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 Already in Use
Set a different port:
```bash
PORT=3001 npm start
```

## Next Steps
- Connect to running backend
- Test complete user flow
- Take screenshots for documentation
