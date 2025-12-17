import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/modern-theme.css';
import './styles/additional-styles.css';

// Context
import { AuthProvider } from './context/AuthContext';

// Components
import SkipLink from './components/SkipLink';
import ModernNavbar from './components/ModernNavbar';
import ModernFooter from './components/ModernFooter';
import HomePage from './components/HomePage';
import TicketCheckout from './components/TicketCheckout';
import TicketConfirmation from './components/TicketConfirmation';

// Pages
import EventsPage from './pages/EventsPage';
import AboutPage from './pages/AboutPage';
import CalendarPage from './pages/CalendarPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
    return (
        <AuthProvider>
            <Router>
                <SkipLink />
                <div className="App">
                    <ModernNavbar />
                    <main id="main-content">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/events" element={<EventsPage />} />
                            <Route path="/checkout/:eventId" element={<TicketCheckout />} />
                            <Route path="/confirmation" element={<TicketConfirmation />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/calendar" element={<CalendarPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                        </Routes>
                    </main>
                    <ModernFooter />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
