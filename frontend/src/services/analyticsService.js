/**
 * Analytics Service
 * Centralized service for tracking user interactions and application events.
 * Designed to be provider-agnostic (can swap console for GA, Mixpanel, etc.)
 */

class AnalyticsService {
    constructor() {
        this.isDev = process.env.NODE_ENV !== 'production';
        this.eventsQueue = [];
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;

        // Simulate remote provider init
        if (this.isDev) {
            console.log('%c[Analytics] Initialized', 'color: #3b82f6; font-weight: bold;');
        }

        this.initialized = true;
        this.flushQueue();
    }

    /**
     * Track a specific event
     * @param {string} category - Event category (e.g., 'Auth', 'Ticket')
     * @param {string} action - Action performed (e.g., 'Login', 'Purchase')
     * @param {string} label - Optional label for detail
     * @param {number} value - Optional metric value
     */
    trackEvent(category, action, label = null, value = null) {
        const eventData = {
            category,
            action,
            label,
            value,
            timestamp: new Date().toISOString()
        };

        if (!this.initialized) {
            this.eventsQueue.push(eventData);
            return;
        }

        this.logEvent(eventData);
    }

    /**
     * Track page navigation
     * @param {string} path - Current path
     */
    trackPageView(path) {
        if (this.isDev) {
            console.log(`%c[Analytics] Page View: ${path}`, 'color: #10b981;');
        }
        // In real app: send to GA
        // window.gtag('config', 'GA_MEASUREMENT_ID', { page_path: path });
    }

    /**
     * Track user identification (Anonymized)
     * @param {string} userId - User ID
     * @param {string} role - User Role
     */
    identifyUser(userId, role) {
        // Hash ID to prevent PII leak in logs (basic simulation)
        const hashedId = btoa(userId).substring(0, 10);

        if (this.isDev) {
            console.log(`%c[Analytics] Identify User: ${hashedId} (${role})`, 'color: #8b5cf6;');
        }
    }

    /**
     * Internal logger / dispatcher
     */
    logEvent(data) {
        if (this.isDev) {
            console.groupCollapsed(`%c[Analytics] ${data.category}: ${data.action}`, 'color: #3b82f6;');
            console.log('Label:', data.label);
            console.log('Value:', data.value);
            console.log('Time:', data.timestamp);
            console.groupEnd();
        }

        // TODO: Send to backend or 3rd party service
    }

    flushQueue() {
        while (this.eventsQueue.length > 0) {
            const event = this.eventsQueue.shift();
            this.logEvent(event);
        }
    }
}

// Singleton instance
const analytics = new AnalyticsService();
export default analytics;
