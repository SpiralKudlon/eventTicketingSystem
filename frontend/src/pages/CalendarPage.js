import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import EventCalendar from '../components/EventCalendar';
import Newsletter from '../components/Newsletter';

/**
 * CalendarPage Component - Full calendar page
 */
function CalendarPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axiosInstance.get('/events');
                setEvents(response.data);
            } catch (err) {
                console.error('Error fetching events:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="calendar-page">
            {/* Hero Banner */}
            <section style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #6366f1 50%, #a855f7 100%)',
                padding: '180px 0 100px',
                color: 'white',
                textAlign: 'center'
            }}>
                <div className="container">
                    <span className="section-badge" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>
                        <i className="bi bi-calendar3 me-2"></i>
                        Event Calendar
                    </span>
                    <h1 style={{ 
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                        fontWeight: 800,
                        marginTop: '20px',
                        marginBottom: '20px'
                    }}>
                        Plan Your Event Schedule
                    </h1>
                    <p style={{ 
                        fontSize: '1.2rem', 
                        opacity: 0.9, 
                        maxWidth: '600px', 
                        margin: '0 auto',
                        lineHeight: 1.8
                    }}>
                        Browse our interactive calendar to find and plan for upcoming events 
                        across Kenya. Never miss an event again!
                    </p>
                </div>
            </section>

            {/* Calendar Section */}
            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <EventCalendar events={events} />
            )}

            <Newsletter />
        </div>
    );
}

export default CalendarPage;
