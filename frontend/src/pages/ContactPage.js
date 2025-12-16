import React, { useState } from 'react';
import Newsletter from '../components/Newsletter';

/**
 * ContactPage Component - Contact form and information
 */
function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
    };

    const contactInfo = [
        {
            icon: 'bi-geo-alt-fill',
            title: 'Our Location',
            lines: ['Westlands Business Centre', 'Waiyaki Way, Nairobi', 'Kenya']
        },
        {
            icon: 'bi-telephone-fill',
            title: 'Phone Number',
            lines: ['+254 700 123 456', '+254 733 987 654']
        },
        {
            icon: 'bi-envelope-fill',
            title: 'Email Address',
            lines: ['hello@eventke.co.ke', 'support@eventke.co.ke']
        },
        {
            icon: 'bi-clock-fill',
            title: 'Working Hours',
            lines: ['Monday - Friday: 9AM - 6PM', 'Saturday: 10AM - 4PM', 'Sunday: Closed']
        }
    ];

    return (
        <div className="contact-page">
            {/* Hero Banner */}
            <section style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #6366f1 50%, #a855f7 100%)',
                padding: '180px 0 100px',
                color: 'white',
                textAlign: 'center'
            }}>
                <div className="container">
                    <span className="section-badge" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>
                        <i className="bi bi-envelope me-2"></i>
                        Contact Us
                    </span>
                    <h1 style={{ 
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                        fontWeight: 800,
                        marginTop: '20px',
                        marginBottom: '20px'
                    }}>
                        Get In Touch With Us
                    </h1>
                    <p style={{ 
                        fontSize: '1.2rem', 
                        opacity: 0.9, 
                        maxWidth: '600px', 
                        margin: '0 auto',
                        lineHeight: 1.8
                    }}>
                        Have questions about events or need help with your tickets? 
                        We're here to help you every step of the way.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section" style={{ background: '#f8fafc' }}>
                <div className="container">
                    <div className="row g-5">
                        {/* Contact Form */}
                        <div className="col-lg-7">
                            <div style={{
                                background: 'white',
                                borderRadius: '24px',
                                padding: '40px',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
                            }}>
                                <h2 style={{ marginBottom: '8px' }}>Send Us a Message</h2>
                                <p style={{ color: '#64748b', marginBottom: '30px' }}>
                                    Fill out the form below and we'll get back to you as soon as possible.
                                </p>

                                {submitted && (
                                    <div style={{
                                        background: 'linear-gradient(135deg, #10b981, #059669)',
                                        color: 'white',
                                        padding: '16px 24px',
                                        borderRadius: '12px',
                                        marginBottom: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px'
                                    }}>
                                        <i className="bi bi-check-circle-fill" style={{ fontSize: '1.3rem' }}></i>
                                        <span>Thank you! Your message has been sent successfully.</span>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                                                Your Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="John Doe"
                                                style={{
                                                    width: '100%',
                                                    padding: '14px 20px',
                                                    border: '2px solid #e2e8f0',
                                                    borderRadius: '12px',
                                                    fontSize: '1rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="john@example.com"
                                                style={{
                                                    width: '100%',
                                                    padding: '14px 20px',
                                                    border: '2px solid #e2e8f0',
                                                    borderRadius: '12px',
                                                    fontSize: '1rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                                                Subject *
                                            </label>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                placeholder="How can we help you?"
                                                style={{
                                                    width: '100%',
                                                    padding: '14px 20px',
                                                    border: '2px solid #e2e8f0',
                                                    borderRadius: '12px',
                                                    fontSize: '1rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                                                Message *
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows="5"
                                                placeholder="Write your message here..."
                                                style={{
                                                    width: '100%',
                                                    padding: '14px 20px',
                                                    border: '2px solid #e2e8f0',
                                                    borderRadius: '12px',
                                                    fontSize: '1rem',
                                                    resize: 'vertical',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <button type="submit" className="btn-gradient" style={{ width: '100%', padding: '16px' }}>
                                                <i className="bi bi-send me-2"></i>
                                                Send Message
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="col-lg-5">
                            <div className="row g-4">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="col-12">
                                        <div style={{
                                            background: 'white',
                                            borderRadius: '16px',
                                            padding: '24px',
                                            display: 'flex',
                                            gap: '20px',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                                        }}>
                                            <div style={{
                                                width: '60px',
                                                height: '60px',
                                                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0
                                            }}>
                                                <i className={`bi ${info.icon}`} style={{ fontSize: '1.5rem', color: 'white' }}></i>
                                            </div>
                                            <div>
                                                <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{info.title}</h4>
                                                {info.lines.map((line, i) => (
                                                    <p key={i} style={{ color: '#64748b', margin: '0 0 4px 0' }}>{line}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Social Links */}
                            <div style={{
                                background: 'linear-gradient(135deg, #0f172a, #1e293b)',
                                borderRadius: '16px',
                                padding: '30px',
                                marginTop: '24px',
                                color: 'white'
                            }}>
                                <h4 style={{ marginBottom: '16px' }}>Follow Us</h4>
                                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }}>
                                    Stay connected for the latest events and updates
                                </p>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    {['facebook', 'twitter-x', 'instagram', 'linkedin'].map((social, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            aria-label={`Follow us on ${social}`}
                                            style={{
                                                width: '45px',
                                                height: '45px',
                                                background: 'rgba(255,255,255,0.1)',
                                                borderRadius: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                border: 'none',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <i className={`bi bi-${social}`}></i>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section style={{ padding: '0' }}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819838408866!2d36.80247031475395!3d-1.2692294990615772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f17024d3c0c0d%3A0x85f5f3e8f8b10c0a!2sWestlands%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="EventKE Location"
                ></iframe>
            </section>

            <Newsletter />
        </div>
    );
}

export default ContactPage;
