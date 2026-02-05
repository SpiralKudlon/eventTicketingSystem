import analytics from '../services/analyticsService';
import errorService from '../services/errorService';

// Mock console
const originalConsoleLog = console.log;
const originalConsoleGroup = console.groupCollapsed;
const originalConsoleGroupEnd = console.groupEnd;

describe('Monitoring Services', () => {
    beforeEach(() => {
        console.log = jest.fn();
        console.groupCollapsed = jest.fn();
        console.groupEnd = jest.fn();
        analytics.initialized = false;
        analytics.eventsQueue = [];
    });

    afterEach(() => {
        console.log = originalConsoleLog;
        console.groupCollapsed = originalConsoleGroup;
        console.groupEnd = originalConsoleGroupEnd;
    });

    test('AnalyticsService tracks events', () => {
        analytics.init();
        analytics.trackEvent('Test', 'Action', 'Label', 1);

        expect(console.groupCollapsed).toHaveBeenCalledWith(
            expect.stringContaining('Test: Action'),
            expect.any(String)
        );
        expect(console.log).toHaveBeenCalledWith('Label:', 'Label');
        expect(console.log).toHaveBeenCalledWith('Value:', 1);
    });

    test('AnalyticsService queues events before init', () => {
        analytics.trackEvent('Queue', 'Action');
        expect(console.groupCollapsed).not.toHaveBeenCalled();

        analytics.init();
        expect(console.groupCollapsed).toHaveBeenCalledWith(
            expect.stringContaining('Queue: Action'),
            expect.any(String)
        );
    });

    test('ErrorService logs errors', () => {
        console.error = jest.fn();
        console.group = jest.fn();

        const error = new Error('Test Error');
        errorService.logError(error, { context: 'test' });

        expect(console.error).toHaveBeenCalledWith('Test Error');
    });
});
