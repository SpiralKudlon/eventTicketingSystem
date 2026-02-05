import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useEventStore from '../stores/eventStore';

/**
 * FeaturedEvents Component - Refactored to use event store
 * Showcase top events with modern cards
 */
function FeaturedEvents() {
    const navigate = useNavigate();

    // Get events from store
    const { events, loading, fetchEvents } = useEventStore();

    useEffect(() => {
        fetchEvents(); // Uses cache if available
    }, [fetchEvents]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return {
            day: date.getDate(),
            month: date.toLocaleDateString('en-US', { month: 'short' }),
            time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            weekday: date.toLocaleDateString('en-US', { weekday: 'short' })
        };
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0
        }).format(price);
    };

    const getAvailabilityStatus = (available, total) => {
        const percentage = (available / total) * 100;
        if (available === 0) return { text: 'Sold Out', class: 'badge-soldout' };
        if (percentage <= 20) return { text: 'Almost Gone', class: 'badge-limited' };
        return { text: `${available} Left`, class: 'badge-available' };
    };

    const handleBuyTicket = (eventId) => {
        navigate(`/checkout/${eventId}`);
    };

    // Get featured events (first 6)
    const featuredEvents = events.slice(0, 6);

    if (loading && events.length === 0) {
        return (
            <section className="section featured-events">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">
                            <i className="bi bi-fire"></i>
                            Hot Events
                        </span>
                        <h2 className="section-title">Featured Events</h2>
                        <p className="section-description">Loading amazing events...</p>
                    </div>
                    <div className="row g-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="col-md-6 col-lg-4">
                                <div className="event-card-modern">
                                    <div className="event-card-image loading-skeleton" style={{ height: '220px' }}></div>
                                    <div className="event-card-content">
                                        <div className="loading-skeleton" style={{ height: '20px', width: '60%', marginBottom: '10px' }}></div>
                                        <div className="loading-skeleton" style={{ height: '24px', marginBottom: '10px' }}></div>
                                        <div className="loading-skeleton" style={{ height: '16px', width: '80%' }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="section featured-events">
            <div className="container">
                <div className="section-header">
                    <span className="section-badge">
                        <i className="bi bi-fire"></i>
                        Hot Events
                    </span>
                    <h2 className="section-title">Featured Events This Month</h2>
                    <p className="section-description">
                        Don't miss out on the hottest events happening across Kenya.
                        Get your tickets now before they sell out!
                    </p>
                </div>

                <div className="row g-4">
                    {featuredEvents.map((event) => {
                        const dateInfo = formatDate(event.eventDate);
                        const availability = getAvailabilityStatus(event.availableTickets, event.totalTickets);

                        return (
                            <div key={event.id} className="col-md-6 col-lg-4">
                                <div className="event-card-modern">
                                    <div className="event-card-image">
                                        <img
                                            src={event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600'}
                                            alt={event.name}
                                        />
                                        <div className="event-card-badge">
                                            <span className="badge-category">{event.category}</span>
                                            <span className={`badge-status ${availability.class}`}>
                                                {availability.text}
                                            </span>
                                        </div>
                                        <button className="event-card-favorite" aria-label="Add to favorites">
                                            <i className="bi bi-heart"></i>
                                        </button>
                                    </div>

                                    <div className="event-card-content">
                                        <div className="event-card-date">
                                            <div className="date-box">
                                                <span className="month">{dateInfo.month}</span>
                                                <span className="day">{dateInfo.day}</span>
                                            </div>
                                            <div className="event-time">
                                                <div><strong>{dateInfo.weekday}</strong></div>
                                                <div>{dateInfo.time}</div>
                                            </div>
                                        </div>

                                        <h3 className="event-card-title">
                                            <a href={`/checkout/${event.id}`}>{event.name}</a>
                                        </h3>

                                        <div className="event-card-location">
                                            <i className="bi bi-geo-alt-fill"></i>
                                            <span>{event.location}</span>
                                        </div>

                                        <div className="event-card-footer">
                                            <div className="event-price">
                                                <span className="currency">From </span>
                                                <span className="amount">{formatPrice(event.priceKES)}</span>
                                            </div>
                                            <button
                                                className="btn-buy-ticket"
                                                onClick={() => handleBuyTicket(event.id)}
                                                disabled={event.availableTickets === 0}
                                            >
                                                {event.availableTickets > 0 ? 'Get Tickets' : 'Sold Out'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-5">
                    <a href="/events" className="btn-gradient">
                        <i className="bi bi-grid-3x3-gap me-2"></i>
                        View All Events
                    </a>
                </div>
            </div>
        </section>
    );
}

export default FeaturedEvents;
