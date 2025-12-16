import React from 'react';

/**
 * AboutSection Component - Modern about section with features
 */
function AboutSection() {
    const features = [
        {
            icon: 'bi-shield-check',
            title: 'Secure Payments',
            description: 'Your transactions are protected with bank-level security'
        },
        {
            icon: 'bi-qr-code',
            title: 'Instant QR Tickets',
            description: 'Get your digital tickets with QR codes instantly'
        },
        {
            icon: 'bi-phone',
            title: 'Mobile Friendly',
            description: 'Book tickets on any device, anywhere, anytime'
        },
        {
            icon: 'bi-headset',
            title: '24/7 Support',
            description: 'Our support team is always ready to help you'
        },
    ];

    return (
        <section className="section about-section">
            <div className="container">
                <div className="row align-items-center g-5">
                    <div className="col-lg-6">
                        <div className="about-image-container">
                            <div className="about-image">
                                <img 
                                    src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800" 
                                    alt="Events in Kenya"
                                />
                            </div>
                            <div className="about-experience-badge">
                                <span className="number">5+</span>
                                <span className="text">Years Experience</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="about-content">
                            <span className="section-badge">
                                <i className="bi bi-info-circle"></i>
                                About Us
                            </span>
                            <h2 className="section-title text-start">
                                Kenya's Premier Event Ticketing Platform
                            </h2>
                            <p className="section-description text-start">
                                EventKE is your gateway to the most exciting events happening 
                                across Kenya. From pulsating concerts in Nairobi to beach 
                                festivals in Mombasa, tech summits in Kisumu, and cultural 
                                celebrations nationwide – we connect you to experiences that 
                                create lasting memories.
                            </p>
                            <p className="section-description text-start">
                                Our mission is to make event discovery and ticket booking 
                                seamless, secure, and enjoyable for every Kenyan. With our 
                                cutting-edge platform, you can browse, book, and receive your 
                                digital tickets in minutes.
                            </p>

                            <div className="about-features">
                                {features.map((feature, index) => (
                                    <div key={index} className="about-feature">
                                        <div className="about-feature-icon">
                                            <i className={`bi ${feature.icon}`}></i>
                                        </div>
                                        <div>
                                            <h4>{feature.title}</h4>
                                            <p>{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
