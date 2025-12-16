import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BSNavbar, Container, Nav } from 'react-bootstrap';

/**
 * Navbar Component - Navigation bar for the application
 * Demonstrates React functional component with Bootstrap styling
 */
function Navbar() {
    return (
        <BSNavbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <BSNavbar.Brand as={Link} to="/">
                    <i className="bi bi-ticket-perforated me-2"></i>
                    Event Ticketing Kenya
                </BSNavbar.Brand>
                <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BSNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">
                            <i className="bi bi-calendar-event me-1"></i>
                            Events
                        </Nav.Link>
                        <Nav.Link as={Link} to="/about">
                            <i className="bi bi-info-circle me-1"></i>
                            About
                        </Nav.Link>
                    </Nav>
                </BSNavbar.Collapse>
            </Container>
        </BSNavbar>
    );
}

export default Navbar;
