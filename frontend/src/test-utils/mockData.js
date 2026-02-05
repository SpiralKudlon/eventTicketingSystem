/**
 * Mock Data for Testing
 * Provides realistic test data for events, users, categories, and locations
 */

export const mockEvents = [
    {
        id: 1,
        name: "Nairobi Jazz Festival",
        description: "Annual jazz festival featuring local and international artists",
        category: "Music",
        location: "Nairobi",
        eventDate: "2024-03-15T18:00:00",
        priceKES: 2500,
        totalTickets: 500,
        availableTickets: 350,
        imageUrl: "https://example.com/jazz.jpg"
    },
    {
        id: 2,
        name: "Tech Summit Kenya",
        description: "Technology conference showcasing innovation in East Africa",
        category: "Conference",
        location: "Nairobi",
        eventDate: "2024-04-20T09:00:00",
        priceKES: 5000,
        totalTickets: 300,
        availableTickets: 50,
        imageUrl: "https://example.com/tech.jpg"
    },
    {
        id: 3,
        name: "Mombasa Food Festival",
        description: "Coastal cuisine celebration with local chefs",
        category: "Food & Drink",
        location: "Mombasa",
        eventDate: "2024-05-10T12:00:00",
        priceKES: 1500,
        totalTickets: 200,
        availableTickets: 0,
        imageUrl: "https://example.com/food.jpg"
    },
    {
        id: 4,
        name: "Kisumu Art Exhibition",
        description: "Contemporary art showcase from Western Kenya artists",
        category: "Arts & Culture",
        location: "Kisumu",
        eventDate: "2024-03-25T10:00:00",
        priceKES: 1000,
        totalTickets: 150,
        availableTickets: 120,
        imageUrl: "https://example.com/art.jpg"
    }
];

export const mockCategories = [
    "Music",
    "Conference",
    "Food & Drink",
    "Arts & Culture",
    "Sports",
    "Comedy"
];

export const mockLocations = [
    "Nairobi",
    "Mombasa",
    "Kisumu",
    "Nakuru",
    "Eldoret"
];

export const mockUser = {
    id: 1,
    name: "John Doe",
    email: "john@tiketi.co.ke",
    phoneNumber: "+254712345678",
    county: "Nairobi",
    role: "USER"
};

export const mockAdminUser = {
    id: 2,
    name: "Admin User",
    email: "admin@tiketi.co.ke",
    phoneNumber: "+254787654321",
    county: "Nairobi",
    role: "ADMIN"
};

export const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export const mockLoginResponse = {
    token: mockToken,
    user: mockUser,
    tokenExpiration: Date.now() + 24 * 60 * 60 * 1000 // 24 hours from now
};

export const mockRegisterResponse = {
    message: "User registered successfully",
    user: mockUser
};

export const mockTicket = {
    id: 1,
    eventId: 1,
    eventName: "Nairobi Jazz Festival",
    eventLocation: "Nairobi",
    eventDate: "2024-03-15T18:00:00",
    quantity: 2,
    totalPrice: 5000,
    ticketCode: "TKT-2024-001",
    purchaseDate: new Date().toISOString()
};

export const mockToast = {
    id: "toast-1",
    message: "Test toast message",
    type: "success",
    duration: 5000
};

// Helper to create a mock event with custom properties
export const createMockEvent = (overrides = {}) => ({
    id: Math.floor(Math.random() * 1000),
    name: "Test Event",
    description: "Test event description",
    category: "Music",
    location: "Nairobi",
    eventDate: new Date().toISOString(),
    priceKES: 1000,
    totalTickets: 100,
    availableTickets: 50,
    imageUrl: "https://example.com/test.jpg",
    ...overrides
});

// Helper to create multiple mock events
export const createMockEvents = (count = 5) => {
    return Array.from({ length: count }, (_, i) => createMockEvent({ id: i + 1 }));
};

// Helper to create a sold-out event
export const createSoldOutEvent = (overrides = {}) => createMockEvent({
    availableTickets: 0,
    ...overrides
});

// Helper to create an almost sold-out event (< 20% available)
export const createAlmostSoldOutEvent = (overrides = {}) => createMockEvent({
    totalTickets: 100,
    availableTickets: 15,
    ...overrides
});
