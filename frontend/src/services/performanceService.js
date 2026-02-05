import { onCLS, onINP, onLCP, onTTFB } from 'web-vitals';
import analytics from './analyticsService';

const reportHandler = (metric) => {
    // Log to console in development
    if (process.env.NODE_ENV !== 'production') {
        console.log(metric);
    }

    // Send to analytics
    analytics.trackEvent('Performance', metric.name, metric.id, metric.value);
};

const reportWebVitals = () => {
    onCLS(reportHandler);
    onINP(reportHandler);
    onLCP(reportHandler);
    onTTFB(reportHandler);
};

export default reportWebVitals;
