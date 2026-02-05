import React from 'react';

import HeroSection from './HeroSection';
import FeaturedEvents from './FeaturedEvents';
import Categories from './Categories';
import EventCalendar from './EventCalendar';
import AboutSection from './AboutSection';
import Testimonials from './Testimonials';
import Newsletter from './Newsletter';

/**
 * HomePage Component - Refactored to use event store
 * Modern landing page with all sections - no prop drilling!
 */
function HomePage() {
    // No need to fetch events here - child components use the store directly
    return (
        <div className="home-page">
            <HeroSection />
            <FeaturedEvents />
            <Categories />
            <EventCalendar />
            <AboutSection />
            <Testimonials />
            <Newsletter />
        </div>
    );
}

export default HomePage;
