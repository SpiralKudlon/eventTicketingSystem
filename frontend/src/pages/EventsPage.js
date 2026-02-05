import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useEventStore from '../stores/eventStore';
import useUIStore from '../stores/uiStore';

/**
 * EventsPage Component - Refactored to use event store
 * Modern event listing with filters - no duplicate API calls!
 */
function EventsPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
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

    // Get events
    const events = useEventStore((state) => state.events);
    const filteredEvents = getFilteredEvents();

    // Initialize category from URL params
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [searchParams, setSelectedCategory]);

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
        return {
            day: date.getDate(),
            month: date.toLocaleDateString('en-US', { month: 'short' }),
            time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
            full: date.toLocaleDateString('en-KE', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
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

    const handleRetry = () => {
        clearError();
        fetchEvents(true); // Force refresh
    };

    if (loading && events.length === 0) {
        return (
            <div className="events-page" style={{ paddingTop: '120px' }}>
                <div className="container">
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3" style={{ color: '#64748b' }}>Loading amazing events...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error && events.length === 0) {
        return (
            <div className="events-page" style={{ paddingTop: '120px' }}>
                <div className="container">
                    <div className="text-center py-5">
                        <i className="bi bi-exclamation-triangle" style={{ fontSize: '4rem', color: '#ef4444' }}></i>
                        <h3 className="mt-3">Error Loading Events</h3>
                        <p style={{ color: '#64748b' }}>{error}</p>
                        <button className="btn-gradient" onClick={handleRetry}>
                            <i className="bi bi-arrow-clockwise me-2"></i>
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="events-page" style={{ paddingTop: '100px', paddingBottom: '60px', background: '#f8fafc', minHeight: '100vh' }}>
            <div className="container">
                {/* Page Header */}
                <div className="text-center mb-5">
                    <span className="section-badge">
                        <i className="bi bi-calendar-event me-2"></i>
                        Discover Events
                    </span>
                    <h1 style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: 800,
                        marginTop: '16px',
                        marginBottom: '16px'
                    }}>
                        Upcoming Events in Kenya
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        Discover and book tickets for amazing events across Kenya
                    </p>
                </div>

                {/* Search & Filter Bar */}
                <div className="search-filter-bar mb-5">
                    <div className="row g-3">
                        <div className="col-12">
                            <div className="search-input-group">
                                <i className="bi bi-search"></i>
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Search events by name, location, or description..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <select
                                className="filter-select"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="All">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-4">
                            <select
                                className="filter-select"
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                            >
                                <option value="All">All Locations</option>
                                {locations.map(loc => (
                                    <option key={loc} value={loc}>{loc}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-4">
                            <select
                                className="filter-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="date-asc">Date (Earliest First)</option>
                                <option value="date-desc">Date (Latest First)</option>
                                <option value="price-asc">Price (Low to High)</option>
                                <option value="price-desc">Price (High to Low)</option>
                                <option value="availability">Most Tickets Available</option>
                            </select>
                        </div>

                        <div className="col-12">
                            <div className="d-flex justify-content-between align-items-center">
                                <span style={{ color: '#64748b' }}>
                                    Showing <strong>{filteredEvents.length}</strong> of <strong>{events.length}</strong> events
                                </span>
                                {(searchQuery || selectedCategory !== 'All' || selectedLocation !== 'All' || sortBy !== 'date-asc') && (
                                    <button className="btn-outline-gradient" onClick={clearFilters}>
                                        <i className="bi bi-x-circle me-2"></i>
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Events Grid */}
                {filteredEvents.length === 0 ? (
                    <div className="text-center py-5">
                        <i className="bi bi-calendar-x" style={{ fontSize: '4rem', color: '#cbd5e1' }}></i>
                        <h3 className="mt-3">No Events Found</h3>
                        <p style={{ color: '#64748b' }}>No events match your search criteria. Try adjusting your filters.</p>
                        <button className="btn-gradient" onClick={clearFilters}>
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="row g-4">
                        {filteredEvents.map((event) => {
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
                )}
            </div>
        </div>
    );
}

export default EventsPage;
