import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ModernNavbar Component - Sleek navigation with scroll effects and auth state
 * Assignment 14: Shows login/register or user info based on authentication
 */
function ModernNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: '/', label: 'Home', icon: 'bi-house' },
        { path: '/events', label: 'Events', icon: 'bi-calendar-event' },
        { path: '/calendar', label: 'Calendar', icon: 'bi-calendar3' },
        { path: '/about', label: 'About', icon: 'bi-info-circle' },
        { path: '/contact', label: 'Contact', icon: 'bi-envelope' },
    ];

    return (
        <nav className={`modern-navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <Link to="/" className="navbar-brand">
                        <div className="brand-icon">
                            <i className="bi bi-ticket-perforated-fill"></i>
                        </div>
                        <span>EventKE</span>
                    </Link>

                    <ul className="nav-links d-none d-lg-flex">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                        {isAuthenticated() ? (
                            <>
                                <span className="text-white d-none d-md-inline">
                                    <i className="bi bi-person-circle me-2"></i>
                                    {user?.name}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="btn-nav d-none d-md-inline-flex"
                                >
                                    <i className="bi bi-box-arrow-right me-2"></i>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn-nav-outline d-none d-md-inline-flex">
                                    <i className="bi bi-box-arrow-in-right me-2"></i>
                                    Login
                                </Link>
                                <Link to="/register" className="btn-nav d-none d-md-inline-flex">
                                    <i className="bi bi-person-plus me-2"></i>
                                    Register
                                </Link>
                            </>
                        )}

                        <div
                            className="menu-toggle d-lg-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="mobile-menu d-lg-none">
                    <div className="container py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <i className={`bi ${link.icon} me-2`}></i>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default ModernNavbar;
