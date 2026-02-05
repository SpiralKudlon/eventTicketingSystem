import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge, Form, InputGroup } from 'react-bootstrap';
import useEventStore from '../stores/eventStore';
import useUIStore from '../stores/uiStore';

/**
 * EventList Component - Refactored to use Zustand event store
 * No more prop drilling, centralized state management
 */
function EventList() {
    const navigate = useNavigate();
    const { showError } = useUIStore();

    // Get state and actions from event store
    const {
        loading,
        error,
        searchQuery,
        selectedCategory,
        selectedLocation,
        sortBy,
        categories,
        locations,
        fetchEvents,
        fetchCategories,
        fetchLocations,
        getFilteredEvents,
        setSearchQuery,
        setSelectedCategory,
        setSelectedLocation,
        setSortBy,
        clearFilters,
        clearError,
    } = useEventStore();

    // Get filtered events
    const events = useEventStore((state) => state.events);
    const filteredEvents = getFilteredEvents();

    // Fetch data on mount
    useEffect(() => {
        fetchEvents();
        fetchCategories();
        fetchLocations();
    }, [fetchEvents, fetchCategories, fetchLocations]);

    // Show error toast if error occurs
    useEffect(() => {
        if (error) {
            showError(error);
        }
    }, [error, showError]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-KE', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES'
        }).format(price);
    };

    const handleBuyTicket = (eventId) => {
        navigate(`/checkout/${eventId}`);
    };

    const handleRetry = () => {
        clearError();
        fetchEvents(true); // Force refresh
    };

    if (loading && events.length === 0) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p className="mt-3">Loading events...</p>
            </Container>
        );
    }

    if (error && events.length === 0) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">
                    <Alert.Heading>Error Loading Events</Alert.Heading>
                    <p>{error}</p>
                    <Button variant="outline-danger" onClick={handleRetry}>
                        Try Again
                    </Button>
                </Alert>
            </Container>
        );
    }

    if (events.length === 0) {
        return (
            <Container className="mt-4">
                <Alert variant="info">
                    <Alert.Heading>No Events Available</Alert.Heading>
                    <p>There are currently no events scheduled. Please check back later!</p>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <div className="text-center mb-4">
                <h1 className="display-4">Upcoming Events in Kenya</h1>
                <p className="lead text-muted">Discover and book tickets for amazing events across Kenya</p>
            </div>

            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <Row className="g-3">
                        <Col md={12}>
                            <InputGroup>
                                <InputGroup.Text>
                                    <i className="bi bi-search"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Search events by name, location, or description..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <Button variant="outline-secondary" onClick={() => setSearchQuery('')}>
                                        <i className="bi bi-x-lg"></i>
                                    </Button>
                                )}
                            </InputGroup>
                        </Col>

                        <Col md={4}>
                            <Form.Select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="All">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </Form.Select>
                        </Col>

                        <Col md={4}>
                            <Form.Select
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                            >
                                <option value="All">All Locations</option>
                                {locations.map(loc => (
                                    <option key={loc} value={loc}>{loc}</option>
                                ))}
                            </Form.Select>
                        </Col>

                        <Col md={4}>
                            <Form.Select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="date-asc">Date (Earliest First)</option>
                                <option value="date-desc">Date (Latest First)</option>
                                <option value="price-asc">Price (Low to High)</option>
                                <option value="price-desc">Price (High to Low)</option>
                                <option value="availability">Most Tickets Available</option>
                            </Form.Select>
                        </Col>

                        <Col md={12}>
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="text-muted">
                                    Showing {filteredEvents.length} of {events.length} events
                                </span>
                                {(searchQuery || selectedCategory !== 'All' || selectedLocation !== 'All' || sortBy !== 'date-asc') && (
                                    <Button variant="outline-secondary" size="sm" onClick={clearFilters}>
                                        <i className="bi bi-x-circle me-1"></i>
                                        Clear Filters
                                    </Button>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {filteredEvents.length === 0 ? (
                <Alert variant="warning">
                    <Alert.Heading>No Events Found</Alert.Heading>
                    <p>No events match your search criteria. Try adjusting your filters.</p>
                    <Button variant="outline-warning" onClick={clearFilters}>
                        Clear Filters
                    </Button>
                </Alert>
            ) : (
                <Row>
                    {filteredEvents.map((event) => (
                        <Col key={event.id} md={6} lg={4} className="mb-4">
                            <Card className="h-100 shadow-sm hover-shadow">
                                <Card.Img
                                    variant="top"
                                    src={event.imageUrl || 'https://via.placeholder.com/400x200?text=Event'}
                                    alt={event.name}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <div className="mb-2">
                                        <Badge bg="primary" className="me-2">
                                            {event.category}
                                        </Badge>
                                        <Badge bg={event.availableTickets > 0 ? 'success' : 'danger'}>
                                            {event.availableTickets > 0
                                                ? `${event.availableTickets} tickets left`
                                                : 'Sold Out'}
                                        </Badge>
                                    </div>

                                    <Card.Title>{event.name}</Card.Title>

                                    <Card.Text className="text-muted small">
                                        <i className="bi bi-geo-alt-fill me-1"></i>
                                        {event.location}
                                    </Card.Text>

                                    <Card.Text className="text-muted small">
                                        <i className="bi bi-calendar-event me-1"></i>
                                        {formatDate(event.eventDate)}
                                    </Card.Text>

                                    <Card.Text className="flex-grow-1">
                                        {event.description.substring(0, 100)}...
                                    </Card.Text>

                                    <div className="d-flex justify-content-between align-items-center mt-auto">
                                        <h4 className="text-primary mb-0">
                                            {formatPrice(event.priceKES)}
                                        </h4>
                                        <Button
                                            variant="primary"
                                            onClick={() => handleBuyTicket(event.id)}
                                            disabled={event.availableTickets === 0}
                                        >
                                            {event.availableTickets > 0 ? 'Buy Ticket' : 'Sold Out'}
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default EventList;
