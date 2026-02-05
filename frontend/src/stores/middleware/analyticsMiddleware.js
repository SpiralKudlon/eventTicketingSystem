import analytics from '../../services/analyticsService';

/**
 * Analytics Middleware for Zustand
 * Automatically tracks specific store actions
 * 
 * @param {Function} config - The state creator
 * @param {string} storeName - Name of the store for categorization
 */
const analyticsMiddleware = (config, storeName) => (set, get, api) => {
    return config(
        (args) => {
            // Apply state update
            set(args);

            // Logic to intercept meaningful state changes could go here
            // But since Zustand setters are generic, we mostly rely on
            // wrapping specific actions or tracking resulting state changes.
        },
        get,
        api
    );
};

// Simple Action Tracker Helper
// Wraps an async action to track create/success/fail
export const trackAction = (storeName, actionName, fn) => async (...args) => {
    analytics.trackEvent(storeName, `${actionName}_START`);
    try {
        const result = await fn(...args);
        analytics.trackEvent(storeName, `${actionName}_SUCCESS`);
        return result;
    } catch (error) {
        analytics.trackEvent(storeName, `${actionName}_ERROR`, error.message);
        throw error;
    }
};

export default analyticsMiddleware;
