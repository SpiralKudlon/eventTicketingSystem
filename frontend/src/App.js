import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Spinner } from 'react-bootstrap';
import './styles/modern-theme.css';
import './styles/additional-styles.css';

// Monitoring
import errorService from './services/errorService';
import analytics from './services/analyticsService';
import reportWebVitals from './services/performanceService';
import RouteTracker from './components/RouteTracker';

// Context
import { AuthProvider } from './context/AuthContext';

// Components (Common)
import SkipLink from './components/SkipLink';
import ModernNavbar from './components/ModernNavbar';
import ModernFooter from './components/ModernFooter';
import ToastNotification from './components/ToastNotification';

// Initialize Global Error Handlers
errorService.initGlobalHandlers();
reportWebVitals();

// ... (Lazy Loaded Components remain same)
const HomePage = lazy(() => import('./components/HomePage'));
const TicketCheckout = lazy(() => import('./components/TicketCheckout'));
const TicketConfirmation = lazy(() => import('./components/TicketConfirmation'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const CalendarPage = lazy(() => import('./pages/CalendarPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

// Loading Fallback
const PageLoader = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>
);

function App() {
    useEffect(() => {
        analytics.init();
    }, []);

    return (
        <AuthProvider>
            <Router>
                <RouteTracker />
                <SkipLink />
                <ToastNotification />
                <div className="App">
                    <ModernNavbar />
                    <main id="main-content">
                        <Suspense fallback={<PageLoader />}>
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
                                <Route path="/profile" element={<ProfilePage />} />
                            </Routes>
                        </Suspense>
                    </main>
                    <ModernFooter />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;

