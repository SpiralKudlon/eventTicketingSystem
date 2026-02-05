import React, { useState, useEffect } from 'react';
import useEventStore from '../stores/eventStore';

/**
 * EventCalendar Component - Refactored to use event store
 * Interactive calendar showing events
 */
function EventCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Get events from store
    const { events, fetchEvents } = useEventStore();

    useEffect(() => {
        fetchEvents(); // Uses cache if available
    }, [fetchEvents]);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const navigateMonth = (direction) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + direction);
            return newDate;
        });
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const today = new Date();

    // Get events for current month
    const monthEvents = events.filter(event => {
        const eventDate = new Date(event.eventDate);
        return eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });

    // Get event dates for highlighting
    const eventDates = monthEvents.map(e => new Date(e.eventDate).getDate());

    // Generate calendar days
    const calendarDays = [];

    // Previous month days
    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
        calendarDays.push({
            day: prevMonthDays - i,
            isOtherMonth: true,
            hasEvent: false
        });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push({
            day: i,
            isOtherMonth: false,
            isToday: today.getDate() === i && today.getMonth() === month && today.getFullYear() === year,
            hasEvent: eventDates.includes(i)
        });
    }

    // Next month days
    const remainingDays = 42 - calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
        calendarDays.push({
            day: i,
            isOtherMonth: true,
            hasEvent: false
        });
    }

    // Get upcoming events for display
    const upcomingEvents = monthEvents.slice(0, 4);

    return (
        <section className="section calendar-section">
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-6">
                        <div className="section-header text-start">
                            <span className="section-badge">
                                <i className="bi bi-calendar3"></i>
                                Event Calendar
                            </span>
                            <h2 className="section-title">Upcoming Events Schedule</h2>
                            <p className="section-description">
                                Plan ahead and never miss an event. Browse our calendar to see
                                what's coming up in Kenya's vibrant events scene.
                            </p>
                        </div>

                        <div className="calendar-events-list mt-4">
                            <h4 style={{ color: 'white', marginBottom: '20px' }}>
                                Events in {months[month]} {year}
                            </h4>
                            {upcomingEvents.length > 0 ? (
                                upcomingEvents.map((event, index) => {
                                    const eventDate = new Date(event.eventDate);
                                    return (
                                        <div key={index} className="calendar-event-item">
                                            <div className="calendar-event-date">
                                                <div className="day">{eventDate.getDate()}</div>
                                                <div className="month">
                                                    {eventDate.toLocaleDateString('en-US', { month: 'short' })}
                                                </div>
                                            </div>
                                            <div className="calendar-event-info">
                                                <h4>{event.name}</h4>
                                                <p>
                                                    <i className="bi bi-geo-alt me-2"></i>
                                                    {event.location}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="calendar-event-item">
                                    <div className="calendar-event-info">
                                        <p>No events scheduled for this month</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="calendar-container">
                            <div className="calendar-header">
                                <h3 className="calendar-title">
                                    {months[month]} {year}
                                </h3>
                                <div className="calendar-nav">
                                    <button onClick={() => navigateMonth(-1)}>
                                        <i className="bi bi-chevron-left"></i>
                                    </button>
                                    <button onClick={() => navigateMonth(1)}>
                                        <i className="bi bi-chevron-right"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="calendar-grid">
                                {daysOfWeek.map((day, index) => (
                                    <div key={index} className="calendar-day-header">
                                        {day}
                                    </div>
                                ))}
                                {calendarDays.map((dayInfo, index) => (
                                    <div
                                        key={index}
                                        className={`calendar-day 
                                            ${dayInfo.isOtherMonth ? 'other-month' : ''} 
                                            ${dayInfo.isToday ? 'today' : ''} 
                                            ${dayInfo.hasEvent ? 'has-event' : ''}`}
                                    >
                                        {dayInfo.day}
                                    </div>
                                ))}
                            </div>

                            <div className="text-center mt-4">
                                <a href="/events" className="btn-gradient">
                                    View All Events
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default EventCalendar;
