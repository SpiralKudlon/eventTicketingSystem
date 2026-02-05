import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import axiosInstance from '../api/axiosConfig';
import useEventStore from '../stores/eventStore';
import useUIStore from '../stores/uiStore';

/**
 * TicketCheckout Component - Refactored to use event store
 * No need to fetch event data - uses cached data from store
 */
function TicketCheckout() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const { showSuccess, showError } = useUIStore();

    // Get event from store (cached)
    const getEventById = useEventStore((state) => state.getEventById);
    const fetchEventById = useEventStore((state) => state.fetchEventById);
    const purchaseTicket = useEventStore((state) => state.purchaseTicket);

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [emailError, setEmailError] = useState('');

    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        phoneNumber: '',
        quantity: 1
    });

    useEffect(() => {
        const loadEvent = async () => {
            try {
                setLoading(true);
                // Try to get from cache first
                let eventData = getEventById(eventId);

                // If not in cache, fetch from API
                if (!eventData) {
                    eventData = await fetchEventById(eventId);
                }

                setEvent(eventData);
            } catch (err) {
                setError('Failed to load event details');
                showError('Failed to load event details');
                console.error('Error fetching event:', err);
            } finally {
                setLoading(false);
            }
        };

        loadEvent();
    }, [eventId, getEventById, fetchEventById, showError]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'userEmail') {
            validateEmail(value);
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError('');
            return true;
        }
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
            return false;
        }
        setEmailError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.userName || !formData.userEmail || !formData.phoneNumber) {
            setError('Please fill in all required fields');
            return;
        }

        if (formData.quantity < 1 || formData.quantity > event.availableTickets) {
            setError(`Please select between 1 and ${event.availableTickets} tickets`);
            return;
        }

        try {
            setSubmitting(true);
            setError(null);

            const purchaseData = {
                eventId: parseInt(eventId),
                userName: formData.userName,
                userEmail: formData.userEmail,
                phoneNumber: formData.phoneNumber,
                quantity: parseInt(formData.quantity)
            };

            // Use store action with optimistic update
            const ticketData = await purchaseTicket(purchaseData);

            // Store user info for confirmation page
            sessionStorage.setItem('userEmail', formData.userEmail);
            sessionStorage.setItem('userName', formData.userName);

            // Show success toast
            showSuccess('Ticket purchased successfully!');

            // Navigate to confirmation
            navigate('/confirmation', {
                state: { ticketData }
            });

        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Failed to purchase ticket. Please try again.';
            setError(errorMessage);
            showError(errorMessage);
            console.error('Error purchasing ticket:', err);
        } finally {
            setSubmitting(false);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES'
        }).format(price);
    };

    const calculateTotal = () => {
        if (!event) return 0;
        return event.priceKES * formData.quantity;
    };

    if (loading) {
        return (
            <Container className="text-center" style={{ paddingTop: '150px', paddingBottom: '50px' }}>
                <Spinner animation="border" role="status" variant="primary" style={{ width: '3rem', height: '3rem' }} />
                <p className="mt-3" style={{ color: '#64748b' }}>Loading event details...</p>
            </Container>
        );
    }

    if (!event) {
        return (
            <Container style={{ paddingTop: '150px' }}>
                <Alert variant="danger">Event not found</Alert>
            </Container>
        );
    }

    return (
        <div style={{ paddingTop: '120px', paddingBottom: '60px', background: '#f8fafc', minHeight: '100vh' }}>
            <Container>
                <Row className="g-4">
                    <Col lg={6}>
                        <Card className="border-0 overflow-hidden" style={{ borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
                            <Card.Img
                                variant="top"
                                src={event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600'}
                                alt={event.name}
                                style={{ height: '300px', objectFit: 'cover' }}
                            />
                            <Card.Body>
                                <Card.Title as="h2">{event.name}</Card.Title>
                                <Card.Text>
                                    <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                                    {event.location}
                                </Card.Text>
                                <Card.Text>
                                    <i className="bi bi-calendar-event me-2 text-primary"></i>
                                    {new Date(event.eventDate).toLocaleDateString('en-KE', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </Card.Text>
                                <Card.Text>{event.description}</Card.Text>
                                <Card.Text>
                                    <strong>Available Tickets:</strong> {event.availableTickets} / {event.totalTickets}
                                </Card.Text>
                                <h3 className="text-primary">{formatPrice(event.priceKES)} per ticket</h3>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title as="h3" className="mb-4">Purchase Tickets</Card.Title>

                                {error && (
                                    <Alert variant="danger" dismissible onClose={() => setError(null)}>
                                        {error}
                                    </Alert>
                                )}

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Full Name *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="userName"
                                            value={formData.userName}
                                            onChange={handleInputChange}
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Email Address *</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="userEmail"
                                            value={formData.userEmail}
                                            onChange={handleInputChange}
                                            placeholder="your.email@example.com"
                                            required
                                            isInvalid={!!emailError}
                                        />
                                        {emailError && (
                                            <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                                                {emailError}
                                            </Form.Control.Feedback>
                                        )}
                                        <Form.Text className="text-muted">
                                            Your ticket will be sent to this email
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone Number *</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            placeholder="+254 700 000 000"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Number of Tickets *</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="quantity"
                                            value={formData.quantity}
                                            onChange={handleInputChange}
                                            min="1"
                                            max={event.availableTickets}
                                            required
                                        />
                                    </Form.Group>

                                    <Card className="bg-light mb-4">
                                        <Card.Body>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span>Price per ticket:</span>
                                                <strong>{formatPrice(event.priceKES)}</strong>
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span>Quantity:</span>
                                                <strong>{formData.quantity}</strong>
                                            </div>
                                            <hr />
                                            <div className="d-flex justify-content-between">
                                                <h5>Total:</h5>
                                                <h5 className="text-primary">{formatPrice(calculateTotal())}</h5>
                                            </div>
                                        </Card.Body>
                                    </Card>

                                    <div className="d-grid gap-2">
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            size="lg"
                                            disabled={submitting || event.availableTickets === 0}
                                        >
                                            {submitting ? (
                                                <>
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        className="me-2"
                                                    />
                                                    Processing...
                                                </>
                                            ) : (
                                                'Complete Purchase'
                                            )}
                                        </Button>
                                        <Button
                                            variant="outline-secondary"
                                            onClick={() => navigate('/events')}
                                            disabled={submitting}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default TicketCheckout;
