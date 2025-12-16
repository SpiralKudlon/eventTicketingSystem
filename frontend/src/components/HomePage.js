import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';

import HeroSection from './HeroSection';
import FeaturedEvents from './FeaturedEvents';
import Categories from './Categories';
import EventCalendar from './EventCalendar';
import AboutSection from './AboutSection';
import Testimonials from './Testimonials';
import Newsletter from './Newsletter';

/**
 * HomePage Component - Modern landing page with all sections
 */
function HomePage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
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
        <div className="home-page">
            <HeroSection />
            <FeaturedEvents events={events} loading={loading} />
            <Categories />
            <EventCalendar events={events} />
            <AboutSection />
            <Testimonials />
            <Newsletter />
        </div>
    );
}

export default HomePage;
