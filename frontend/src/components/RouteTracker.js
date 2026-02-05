import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import analytics from '../services/analyticsService';

/**
 * RouteTracker
 * Listens to route changes and tracks page views.
 */
const RouteTracker = () => {
    const location = useLocation();

    useEffect(() => {
        analytics.trackPageView(location.pathname + location.search);
    }, [location]);

    return null;
};

export default RouteTracker;
