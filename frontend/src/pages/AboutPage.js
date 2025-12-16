import React from 'react';
import AboutSection from './AboutSection';
import Testimonials from './Testimonials';
import Newsletter from './Newsletter';

/**
 * AboutPage Component - Dedicated about page
 */
function AboutPage() {
    const teamMembers = [
        {
            name: 'Kuldon Kiariga',
            role: 'CEO & Founder',
            icon: 'bi-person-circle',
            color: '#6366f1',
            bio: 'Passionate about connecting Kenyans with unforgettable experiences.'
        },
        {
            name: 'Robinson Crusoe',
            role: 'CTO',
            icon: 'bi-person-badge',
            color: '#8b5cf6',
            bio: 'Building the technology that powers Kenya\'s event ecosystem.'
        },
        {
            name: 'Joseph Chacha',
            role: 'Head of Operations',
            icon: 'bi-person-gear',
            color: '#06b6d4',
            bio: 'Ensuring every event runs smoothly from booking to entry.'
        },
        {
            name: 'Levi Njoroge',
            role: 'Lead Developer',
            icon: 'bi-code-slash',
            color: '#10b981',
            bio: 'Crafting seamless digital experiences for event lovers.'
        },
        {
            name: 'Gaudencia Omondi',
            role: 'Marketing Director',
            icon: 'bi-megaphone',
            color: '#f59e0b',
            bio: 'Spreading the word about amazing events across Kenya.'
        },
    ];

    const stats = [
        { number: '80+', label: 'Events Listed' },
        { number: '50K+', label: 'Tickets Sold' },
        { number: '15+', label: 'Cities' },
        { number: '99%', label: 'Happy Customers' },
    ];

    return (
        <div className="about-page">
            {/* Hero Banner */}
            <section className="about-hero" style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #6366f1 50%, #a855f7 100%)',
                padding: '180px 0 100px',
                color: 'white',
                textAlign: 'center'
            }}>
                <div className="container">
                    <span className="section-badge" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>
                        <i className="bi bi-info-circle me-2"></i>
                        About EventKE
                    </span>
                    <h1 style={{ 
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                        fontWeight: 800,
                        marginTop: '20px',
                        marginBottom: '20px'
                    }}>
                        Connecting Kenya Through Events
                    </h1>
                    <p style={{ 
                        fontSize: '1.2rem', 
                        opacity: 0.9, 
                        maxWidth: '600px', 
                        margin: '0 auto',
                        lineHeight: 1.8
                    }}>
                        We're on a mission to make event discovery and ticket booking 
                        seamless for every Kenyan, from Nairobi to Mombasa and beyond.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section style={{ 
                background: 'white', 
                padding: '60px 0',
                marginTop: '-50px',
                borderRadius: '24px 24px 0 0',
                position: 'relative',
                zIndex: 10
            }}>
                <div className="container">
                    <div className="row g-4">
                        {stats.map((stat, index) => (
                            <div key={index} className="col-6 col-md-3 text-center">
                                <h2 style={{ 
                                    fontSize: '3rem', 
                                    fontWeight: 800,
                                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>
                                    {stat.number}
                                </h2>
                                <p style={{ color: '#64748b', fontWeight: 500 }}>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Content */}
            <AboutSection />

            {/* Our Story */}
            <section className="section" style={{ background: '#f8fafc' }}>
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6 order-lg-2">
                            <img 
                                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800"
                                alt="Our Story"
                                style={{ 
                                    width: '100%', 
                                    borderRadius: '24px',
                                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)'
                                }}
                            />
                        </div>
                        <div className="col-lg-6 order-lg-1">
                            <span className="section-badge">
                                <i className="bi bi-book me-2"></i>
                                Our Story
                            </span>
                            <h2 className="section-title text-start">
                                Born From a Passion for Events
                            </h2>
                            <p style={{ color: '#475569', lineHeight: 1.8, marginBottom: '20px' }}>
                                EventKE was born in 2020 when a group of event enthusiasts realized 
                                that Kenya needed a better way to discover and book event tickets. 
                                We saw friends missing concerts, professionals unable to find tech 
                                meetups, and families unaware of cultural festivals happening in 
                                their own cities.
                            </p>
                            <p style={{ color: '#475569', lineHeight: 1.8, marginBottom: '20px' }}>
                                Today, we're proud to be Kenya's leading event ticketing platform, 
                                serving thousands of customers across 15+ cities. From the vibrant 
                                streets of Nairobi to the coastal beaches of Mombasa, we're 
                                connecting Kenyans to experiences that matter.
                            </p>
                            <p style={{ color: '#475569', lineHeight: 1.8 }}>
                                Our platform features cutting-edge technology including instant 
                                QR code tickets, real-time availability tracking, and secure 
                                payment processing—all designed with the Kenyan user in mind.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="section" style={{ background: 'white' }}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">
                            <i className="bi bi-people me-2"></i>
                            Our Team
                        </span>
                        <h2 className="section-title">Meet the People Behind EventKE</h2>
                        <p className="section-description">
                            A passionate team dedicated to revolutionizing Kenya's event industry
                        </p>
                    </div>

                    <div className="row g-4 justify-content-center">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="col-md-6 col-lg-4">
                                <div style={{
                                    background: 'white',
                                    borderRadius: '24px',
                                    padding: '40px 30px',
                                    textAlign: 'center',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <div style={{
                                        width: '120px',
                                        height: '120px',
                                        borderRadius: '50%',
                                        background: `linear-gradient(135deg, ${member.color}20 0%, ${member.color}40 100%)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 20px',
                                        border: `4px solid ${member.color}`
                                    }}>
                                        <i className={`bi ${member.icon}`} style={{
                                            fontSize: '3rem',
                                            color: member.color
                                        }}></i>
                                    </div>
                                    <h4 style={{ marginBottom: '8px' }}>{member.name}</h4>
                                    <p style={{ 
                                        color: member.color, 
                                        fontWeight: 600,
                                        marginBottom: '16px'
                                    }}>
                                        {member.role}
                                    </p>
                                    <p style={{ color: '#64748b', lineHeight: 1.7 }}>
                                        {member.bio}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="section" style={{ 
                background: 'linear-gradient(135deg, #0f172a, #1e293b)',
                color: 'white'
            }}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge" style={{ background: 'rgba(255,255,255,0.1)', color: '#f97316' }}>
                            <i className="bi bi-heart me-2"></i>
                            Our Values
                        </span>
                        <h2 className="section-title" style={{ color: 'white' }}>
                            What Drives Us Every Day
                        </h2>
                    </div>

                    <div className="row g-4">
                        {[
                            { icon: 'bi-lightning-charge', title: 'Innovation', desc: 'Constantly improving our platform with cutting-edge technology' },
                            { icon: 'bi-shield-check', title: 'Trust', desc: 'Building secure and reliable ticketing experiences' },
                            { icon: 'bi-people', title: 'Community', desc: 'Connecting Kenyans through shared experiences' },
                            { icon: 'bi-star', title: 'Excellence', desc: 'Delivering the best service in everything we do' },
                        ].map((value, index) => (
                            <div key={index} className="col-md-6 col-lg-3">
                                <div style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '16px',
                                    padding: '30px',
                                    height: '100%',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}>
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '20px'
                                    }}>
                                        <i className={`bi ${value.icon}`} style={{ fontSize: '1.5rem' }}></i>
                                    </div>
                                    <h4 style={{ marginBottom: '12px' }}>{value.title}</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 0 }}>{value.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Testimonials />
            <Newsletter />
        </div>
    );
}

export default AboutPage;
