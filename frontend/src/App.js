import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './theme.css';
import './custom.css';

import SkipLink from './components/SkipLink';
import Navbar from './components/Navbar';
import EventList from './components/EventList';
import TicketCheckout from './components/TicketCheckout';
import TicketConfirmation from './components/TicketConfirmation';

function App() {
    return (
        <Router>
            <SkipLink />
            <div className="App">
                <Navbar />
                <main id="main-content">
                    <Routes>
                        <Route path="/" element={<EventList />} />
                        <Route path="/checkout/:eventId" element={<TicketCheckout />} />
                        <Route path="/confirmation" element={<TicketConfirmation />} />
                        <Route path="/about" element={<AboutPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

function AboutPage() {
    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="display-4 mb-4">About Event Ticketing Kenya</h1>
                    <p className="lead">
                        Your premier platform for discovering and booking tickets to amazing events across Kenya.
                    </p>
                    <hr className="my-4" />
                    <h3>Features</h3>
                    <ul>
                        <li>Browse events from all over Kenya</li>
                        <li>Secure online ticket purchasing</li>
                        <li>Instant QR code ticket generation</li>
                        <li>Email confirmation for all bookings</li>
                        <li>Real-time ticket availability</li>
                    </ul>
                    <h3 className="mt-4">Technology Stack</h3>
                    <p><strong>Backend:</strong> Spring Boot 2.7, Java 11, Spring Data JPA, H2 Database</p>
                    <p><strong>Frontend:</strong> React 18, Bootstrap 5, Axios, React Router</p>
                    <h3 className="mt-4">Key Concepts Demonstrated</h3>
                    <ul>
                        <li><strong>Dependency Injection:</strong> Spring Boot's IoC container automatically manages bean lifecycle</li>
                        <li><strong>Virtual DOM:</strong> React efficiently updates only changed components</li>
                        <li><strong>RESTful API:</strong> Clean separation between frontend and backend</li>
                        <li><strong>State Management:</strong> useState and useEffect hooks for data handling</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Footer() {
    return (
        <footer className="bg-dark text-white text-center py-4 mt-5">
            <div className="container">
                <p className="mb-0">
                    2025 Event Ticketing Kenya
                </p>
                <p className="small text-muted mb-0">
                    Built with Spring Boot & React | Kenyan Events Platform
                </p>
            </div>
        </footer>
    );
}

export default App;
