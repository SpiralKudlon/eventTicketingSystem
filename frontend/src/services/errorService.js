/**
 * Error Reporting Service
 * Centralized service for capturing and logging exceptions.
 * Simulates a service like Sentry or LogRocket.
 */

class ErrorService {
    constructor() {
        this.isDev = process.env.NODE_ENV !== 'production';
    }

    /**
     * Log an error to the monitoring service
     * @param {Error|string} error - The error object or message
     * @param {Object} context - Additional context (component, user info, state)
     */
    logError(error, context = {}) {
        const timestamp = new Date().toISOString();

        const errorReport = {
            message: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : null,
            context: {
                url: window.location.href,
                userAgent: navigator.userAgent,
                ...context
            },
            timestamp
        };

        if (this.isDev) {
            console.group(`%c[ErrorService] Captured Exception`, 'color: #ef4444; font-weight: bold;');
            console.error(errorReport.message);
            if (errorReport.context) console.table(errorReport.context);
            if (errorReport.stack) console.log(errorReport.stack);
            console.groupEnd();
        } else {
            // Production: Send to remote logging endpoint
            // fetch('/api/logs/error', { method: 'POST', body: JSON.stringify(errorReport) });
        }
    }

    /**
     * Capture a promise rejection
     */
    initGlobalHandlers() {
        window.addEventListener('unhandledrejection', (event) => {
            this.logError(event.reason, { type: 'Unhandled Promise Rejection' });
        });

        window.addEventListener('error', (event) => {
            this.logError(event.error || event.message, { type: 'Global Error' });
        });
    }
}

const errorService = new ErrorService();
export default errorService;
