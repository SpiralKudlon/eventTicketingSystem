import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ModernFooter Component - Comprehensive footer with links
 */
function ModernFooter() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { label: 'Home', path: '/' },
        { label: 'Events', path: '/events' },
        { label: 'Calendar', path: '/calendar' },
        { label: 'About Us', path: '/about' },
        { label: 'Contact', path: '/contact' },
    ];

    const categories = [
        { label: 'Concerts', path: '/events?category=Concert' },
        { label: 'Technology', path: '/events?category=Technology' },
        { label: 'Festivals', path: '/events?category=Festival' },
        { label: 'Sports', path: '/events?category=Sports' },
        { label: 'Food & Culture', path: '/events?category=Food' },
    ];

    const socialLinks = [
        { icon: 'bi-facebook', url: '#', label: 'Facebook' },
        { icon: 'bi-twitter-x', url: '#', label: 'Twitter' },
        { icon: 'bi-instagram', url: '#', label: 'Instagram' },
        { icon: 'bi-linkedin', url: '#', label: 'LinkedIn' },
    ];

    return (
        <footer className="modern-footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand Column */}
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <div className="logo-icon">
                                <i className="bi bi-ticket-perforated-fill"></i>
                            </div>
                            <span>EventKE</span>
                        </div>
                        <p className="footer-description">
                            Kenya's premier event ticketing platform. Discover, book, and 
                            experience amazing events across Nairobi, Mombasa, Kisumu, and 
                            all major cities in Kenya.
                        </p>
                        <div className="footer-social">
                            {socialLinks.map((social, index) => (
                                <a 
                                    key={index} 
                                    href={social.url} 
                                    className="social-link"
                                    aria-label={social.label}
                                >
                                    <i className={`bi ${social.icon}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-column">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.path}>
                                        <i className="bi bi-chevron-right"></i>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="footer-column">
                        <h4>Categories</h4>
                        <ul className="footer-links">
                            {categories.map((category, index) => (
                                <li key={index}>
                                    <Link to={category.path}>
                                        <i className="bi bi-chevron-right"></i>
                                        {category.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-column">
                        <h4>Contact Us</h4>
                        <div className="footer-contact-item">
                            <i className="bi bi-geo-alt-fill"></i>
                            <span>Westlands, Nairobi<br />Kenya</span>
                        </div>
                        <div className="footer-contact-item">
                            <i className="bi bi-telephone-fill"></i>
                            <span>+254 700 123 456</span>
                        </div>
                        <div className="footer-contact-item">
                            <i className="bi bi-envelope-fill"></i>
                            <span>hello@eventke.co.ke</span>
                        </div>
                        <div className="footer-contact-item">
                            <i className="bi bi-clock-fill"></i>
                            <span>Mon - Fri: 9AM - 6PM</span>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {currentYear} EventKE. All rights reserved. Made with ❤️ in Kenya
                    </p>
                    <div className="footer-legal">
                        <a href="/privacy">Privacy Policy</a>
                        <a href="/terms">Terms of Service</a>
                        <a href="/refunds">Refund Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default ModernFooter;
