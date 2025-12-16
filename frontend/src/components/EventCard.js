import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaCalendarAlt, FaTicketAlt } from 'react-icons/fa';

function EventCard({ event, onBuyTicket }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-KE', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0
        }).format(price);
    };

    const isAvailable = event.availableTickets > 0;

    return (
        <Card
            className="h-100 hover-shadow"
            role="article"
            aria-labelledby={`event-title-${event.id}`}
        >
            <Card.Img
                variant="top"
                src={event.imageUrl || 'https://via.placeholder.com/400x225?text=Event'}
                alt={`${event.name} event image`}
                loading="lazy"
            />
            <Card.Body className="d-flex flex-column">
                <div className="mb-2 d-flex gap-2 flex-wrap">
                    <Badge
                        bg="primary"
                        aria-label={`Category: ${event.category}`}
                    >
                        {event.category}
                    </Badge>
                    <Badge
                        bg={isAvailable ? 'success' : 'danger'}
                        aria-label={isAvailable ? `${event.availableTickets} tickets available` : 'Sold out'}
                    >
                        {isAvailable ? (
                            <>
                                <FaTicketAlt className="me-1" aria-hidden="true" />
                                {event.availableTickets} left
                            </>
                        ) : (
                            'Sold Out'
                        )}
                    </Badge>
                </div>

                <Card.Title
                    id={`event-title-${event.id}`}
                    className="mb-3"
                >
                    {event.name}
                </Card.Title>

                <div className="mb-2 text-muted d-flex align-items-center">
                    <FaMapMarkerAlt className="me-2" aria-hidden="true" />
                    <span>{event.location}</span>
                </div>

                <div className="mb-3 text-muted d-flex align-items-center">
                    <FaCalendarAlt className="me-2" aria-hidden="true" />
                    <time dateTime={event.eventDate}>
                        {formatDate(event.eventDate)}
                    </time>
                </div>

                <Card.Text className="flex-grow-1 text-secondary">
                    {event.description.substring(0, 120)}...
                </Card.Text>

                <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                    <div>
                        <div className="text-muted small">Price</div>
                        <h4 className="mb-0 text-primary fw-bold">
                            {formatPrice(event.priceKES)}
                        </h4>
                    </div>
                    <Button
                        variant="primary"
                        onClick={() => onBuyTicket(event.id)}
                        disabled={!isAvailable}
                        aria-label={isAvailable ? `Buy ticket for ${event.name}` : `${event.name} is sold out`}
                    >
                        {isAvailable ? 'Buy Ticket' : 'Sold Out'}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default EventCard;
