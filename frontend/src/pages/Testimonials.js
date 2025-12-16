import React, { useState, useEffect } from 'react';

/**
 * Testimonials Component - Customer reviews section
 */
function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    
    const testimonials = [
        {
            name: 'Gaudencia Omondi',
            role: 'Music Enthusiast',
            icon: 'bi-person-circle',
            color: '#f59e0b',
            rating: 5,
            text: 'EventKE made buying tickets for Sauti Sol so easy! The QR code entry was seamless and I didn\'t have to wait in any lines. Best ticketing experience ever!',
            event: 'Sauti Sol Concert'
        },
        {
            name: 'Robinson Crusoe',
            role: 'Tech Professional',
            icon: 'bi-person-badge',
            color: '#8b5cf6',
            rating: 5,
            text: 'I\'ve used EventKE for multiple tech conferences. The platform is reliable, secure, and the customer support is exceptional. Highly recommended!',
            event: 'Nairobi Tech Summit'
        },
        {
            name: 'Levi Njoroge',
            role: 'Festival Goer',
            icon: 'bi-person-gear',
            color: '#10b981',
            rating: 5,
            text: 'The Mombasa Beach Festival was amazing and getting tickets through EventKE was a breeze. Love the email confirmations and digital tickets!',
            event: 'Mombasa Beach Festival'
        },
        {
            name: 'Kuldon Kiariga',
            role: 'Sports Fan',
            icon: 'bi-person-check',
            color: '#6366f1',
            rating: 5,
            text: 'From marathons to football matches, EventKE has all the sports events covered. The real-time availability feature is a game changer!',
            event: 'Nairobi Marathon'
        },
        {
            name: 'Joseph Chacha',
            role: 'Event Organizer',
            icon: 'bi-person-video3',
            color: '#06b6d4',
            rating: 5,
            text: 'As an event organizer, EventKE has transformed how I manage ticket sales. The dashboard is intuitive and the analytics are invaluable!',
            event: 'Kisumu Jazz Festival'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <section className="testimonials-section" style={{
            padding: '100px 0',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background decoration */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
                borderRadius: '50%'
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '-30%',
                left: '-10%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
                borderRadius: '50%'
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Section Header */}
                <div className="text-center mb-5">
                    <span className="section-badge" style={{
                        background: 'rgba(99, 102, 241, 0.2)',
                        color: '#a5b4fc',
                        padding: '8px 16px',
                        borderRadius: '50px',
                        fontSize: '14px',
                        fontWeight: '600',
                        display: 'inline-block',
                        marginBottom: '20px'
                    }}>
                        <i className="bi bi-chat-quote me-2"></i>
                        Testimonials
                    </span>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        color: 'white',
                        marginBottom: '20px'
                    }}>
                        What Our{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            Customers Say
                        </span>
                    </h2>
                    <p style={{
                        fontSize: '1.1rem',
                        color: 'rgba(255,255,255,0.6)',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Join thousands of happy customers who trust EventKE for their event ticketing needs
                    </p>
                </div>

                {/* Testimonials Carousel */}
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '24px',
                            padding: '40px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            textAlign: 'center'
                        }}>
                            {/* Quote Icon */}
                            <div style={{
                                width: '60px',
                                height: '60px',
                                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 24px'
                            }}>
                                <i className="bi bi-quote" style={{ fontSize: '1.5rem', color: 'white' }}></i>
                            </div>

                            {/* Testimonial Text */}
                            <p style={{
                                fontSize: '1.25rem',
                                color: 'rgba(255,255,255,0.9)',
                                lineHeight: '1.8',
                                marginBottom: '30px',
                                fontStyle: 'italic'
                            }}>
                                "{testimonials[activeIndex].text}"
                            </p>

                            {/* Rating Stars */}
                            <div style={{ marginBottom: '20px' }}>
                                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                                    <i key={i} className="bi bi-star-fill" style={{
                                        color: '#fbbf24',
                                        fontSize: '1.25rem',
                                        marginRight: '4px'
                                    }}></i>
                                ))}
                            </div>

                            {/* Author Info */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '16px'
                            }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    background: `linear-gradient(135deg, ${testimonials[activeIndex].color}30 0%, ${testimonials[activeIndex].color}50 100%)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: `3px solid ${testimonials[activeIndex].color}`
                                }}>
                                    <i className={`bi ${testimonials[activeIndex].icon}`} style={{
                                        fontSize: '1.5rem',
                                        color: testimonials[activeIndex].color
                                    }}></i>
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <h5 style={{
                                        color: 'white',
                                        fontWeight: '700',
                                        margin: '0 0 4px 0'
                                    }}>{testimonials[activeIndex].name}</h5>
                                    <p style={{
                                        color: 'rgba(255,255,255,0.6)',
                                        fontSize: '0.9rem',
                                        margin: '0 0 4px 0'
                                    }}>{testimonials[activeIndex].role}</p>
                                    <span style={{
                                        background: 'rgba(99, 102, 241, 0.3)',
                                        color: '#a5b4fc',
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        fontSize: '0.75rem'
                                    }}>
                                        <i className="bi bi-ticket me-1"></i>
                                        {testimonials[activeIndex].event}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Dots Navigation */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '10px',
                            marginTop: '30px'
                        }}>
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    style={{
                                        width: index === activeIndex ? '30px' : '10px',
                                        height: '10px',
                                        borderRadius: '5px',
                                        border: 'none',
                                        background: index === activeIndex 
                                            ? 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)'
                                            : 'rgba(255,255,255,0.3)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
