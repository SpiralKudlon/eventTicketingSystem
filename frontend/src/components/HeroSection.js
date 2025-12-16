import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * HeroSection Component - Stunning hero with background carousel
 */
function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&q=80',
            title: 'Live Concerts',
        },
        {
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80',
            title: 'Tech Events',
        },
        {
            image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80',
            title: 'Festivals',
        },
        {
            image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1920&q=80',
            title: 'Music Events',
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <section className="hero-section">
            {/* Background Carousel */}
            <div className="hero-carousel">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${slide.image})` }}
                    />
                ))}
            </div>

            {/* Hero Content */}
            <div className="container">
                <div className="hero-content">
                    <div className="hero-badge">
                        <i className="bi bi-stars"></i>
                        <span>Kenya's #1 Event Platform</span>
                    </div>

                    <h1 className="hero-title">
                        Discover Amazing <span>Events</span> Across Kenya
                    </h1>

                    <p className="hero-description">
                        From electrifying concerts to innovative tech conferences, 
                        find and book tickets to the most exciting events happening 
                        in Nairobi, Mombasa, Kisumu, and beyond.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/events" className="btn-hero-primary">
                            <i className="bi bi-search"></i>
                            Explore Events
                        </Link>
                        <Link to="/about" className="btn-hero-secondary">
                            <i className="bi bi-play-circle"></i>
                            How It Works
                        </Link>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <div className="stat-number">80+</div>
                            <div className="stat-label">Events Listed</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">50K+</div>
                            <div className="stat-label">Tickets Sold</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">15+</div>
                            <div className="stat-label">Cities Covered</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Carousel Indicators */}
            <div className="carousel-indicators">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator d-none d-lg-flex">
                <span>Scroll Down</span>
                <i className="bi bi-chevron-double-down"></i>
            </div>
        </section>
    );
}

export default HeroSection;
