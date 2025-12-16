import React from 'react';

/**
 * AboutSection Component - Reusable about section for homepage
 */
function AboutSection() {
    const features = [
        {
            icon: 'bi-ticket-perforated',
            title: 'Easy Booking',
            description: 'Book tickets in just a few clicks with our streamlined checkout process.',
            color: '#6366f1'
        },
        {
            icon: 'bi-shield-check',
            title: 'Secure Payments',
            description: 'Your transactions are protected with bank-level security encryption.',
            color: '#10b981'
        },
        {
            icon: 'bi-qr-code',
            title: 'QR Code Tickets',
            description: 'Get instant digital tickets with unique QR codes for easy entry.',
            color: '#f59e0b'
        },
        {
            icon: 'bi-geo-alt',
            title: 'Local Events',
            description: 'Discover amazing events happening across all major Kenyan cities.',
            color: '#ef4444'
        }
    ];

    return (
        <section className="about-section" style={{
            padding: '100px 0',
            background: '#f8fafc'
        }}>
            <div className="container">
                <div className="row align-items-center">
                    {/* Left Content */}
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <span className="section-badge" style={{
                            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
                            color: '#6366f1',
                            padding: '8px 16px',
                            borderRadius: '50px',
                            fontSize: '14px',
                            fontWeight: '600',
                            display: 'inline-block',
                            marginBottom: '20px'
                        }}>
                            <i className="bi bi-info-circle me-2"></i>
                            About EventKE
                        </span>
                        <h2 style={{
                            fontSize: '2.5rem',
                            fontWeight: '800',
                            color: '#0f172a',
                            marginBottom: '20px',
                            lineHeight: '1.2'
                        }}>
                            Kenya's Premier{' '}
                            <span style={{
                                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Event Platform
                            </span>
                        </h2>
                        <p style={{
                            fontSize: '1.1rem',
                            color: '#64748b',
                            lineHeight: '1.8',
                            marginBottom: '30px'
                        }}>
                            We're on a mission to connect Kenyans with unforgettable experiences. 
                            From concerts in Nairobi to festivals at the coast, we make discovering 
                            and booking events seamless and enjoyable.
                        </p>
                        
                        {/* Stats */}
                        <div className="row g-4">
                            <div className="col-6">
                                <div style={{
                                    padding: '20px',
                                    background: 'white',
                                    borderRadius: '16px',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                                }}>
                                    <h3 style={{
                                        fontSize: '2rem',
                                        fontWeight: '800',
                                        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        marginBottom: '5px'
                                    }}>50K+</h3>
                                    <p style={{ color: '#64748b', margin: 0 }}>Tickets Sold</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div style={{
                                    padding: '20px',
                                    background: 'white',
                                    borderRadius: '16px',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                                }}>
                                    <h3 style={{
                                        fontSize: '2rem',
                                        fontWeight: '800',
                                        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        marginBottom: '5px'
                                    }}>80+</h3>
                                    <p style={{ color: '#64748b', margin: 0 }}>Events Listed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Features Grid */}
                    <div className="col-lg-6">
                        <div className="row g-4">
                            {features.map((feature, index) => (
                                <div className="col-6" key={index}>
                                    <div style={{
                                        padding: '30px 24px',
                                        background: 'white',
                                        borderRadius: '20px',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer',
                                        height: '100%'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.12)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
                                    }}>
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            background: `${feature.color}15`,
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '16px'
                                        }}>
                                            <i className={`bi ${feature.icon}`} style={{
                                                fontSize: '1.5rem',
                                                color: feature.color
                                            }}></i>
                                        </div>
                                        <h4 style={{
                                            fontSize: '1.1rem',
                                            fontWeight: '700',
                                            color: '#0f172a',
                                            marginBottom: '10px'
                                        }}>{feature.title}</h4>
                                        <p style={{
                                            fontSize: '0.9rem',
                                            color: '#64748b',
                                            margin: 0,
                                            lineHeight: '1.6'
                                        }}>{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
