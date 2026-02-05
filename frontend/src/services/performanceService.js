import { onCLS, onFID, onLCP, onTTFB } from 'web-vitals';
import analytics from './analyticsService';

const reportHandler = (metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
        console.log(metric);
    }

    // Send to analytics
    analytics.trackEvent('Performance', metric.name, metric.id, metric.value);
};

const reportWebVitals = () => {
    onCLS(reportHandler);
    onFID(reportHandler);
    onLCP(reportHandler);
    onTTFB(reportHandler);
};

export default reportWebVitals;
