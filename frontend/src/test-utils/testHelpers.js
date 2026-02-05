/**
 * Test Utilities and Helpers
 * Provides helper functions for testing Zustand stores and React components
 */

import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useEventStore from '../stores/eventStore';
import useAuthStore from '../stores/authStore';
import useUIStore from '../stores/uiStore';

/**
 * Reset all Zustand stores to their initial state
 * Call this in beforeEach to ensure test isolation
 */
export const resetAllStores = () => {
    // Reset event store
    useEventStore.setState({
        events: [],
        categories: [],
        locations: [],
        loading: false,
        error: null,
        lastFetched: null,
        searchQuery: '',
        selectedCategory: 'All',
        selectedLocation: 'All',
        sortBy: 'date-asc',
    });

    // Reset auth store
    useAuthStore.setState({
        user: null,
        token: null,
        loading: false,
        error: null,
        isAuthenticated: false,
        tokenExpiration: null,
    });

    // Reset UI store
    useUIStore.setState({
        toasts: [],
        modals: {},
        globalLoading: false,
    });

    // Clear localStorage
    localStorage.clear();
};

/**
 * Wait for a store to update based on a condition
 * @param {Function} store - Zustand store hook
 * @param {Function} condition - Function that returns true when condition is met
 * @param {number} timeout - Maximum time to wait in ms
 */
export const waitForStoreUpdate = async (store, condition, timeout = 3000) => {
    const startTime = Date.now();

    return new Promise((resolve, reject) => {
        const checkCondition = () => {
            if (condition(store.getState())) {
                resolve(store.getState());
            } else if (Date.now() - startTime > timeout) {
                reject(new Error('Timeout waiting for store update'));
            } else {
                setTimeout(checkCondition, 50);
            }
        };
        checkCondition();
    });
};

/**
 * Set up event store with mock data
 * @param {Object} overrides - Partial state to override defaults
 */
export const setupEventStore = (overrides = {}) => {
    useEventStore.setState({
        events: [],
        categories: [],
        locations: [],
        loading: false,
        error: null,
        lastFetched: null,
        ...overrides,
    });
};

/**
 * Set up auth store with mock authenticated user
 * @param {Object} user - Mock user object
 * @param {string} token - Mock token
 */
export const setupAuthenticatedUser = (user, token) => {
    useAuthStore.setState({
        user,
        token,
        isAuthenticated: true,
        tokenExpiration: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        loading: false,
        error: null,
    });
};

/**
 * Set up UI store with mock toasts
 * @param {Array} toasts - Array of mock toast objects
 */
export const setupToasts = (toasts = []) => {
    useUIStore.setState({ toasts });
};

/**
 * Mock axios instance for testing
 */
export const createMockAxios = () => {
    return {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
        interceptors: {
            request: { use: jest.fn(), eject: jest.fn() },
            response: { use: jest.fn(), eject: jest.fn() },
        },
    };
};

/**
 * Create a mock API response
 * @param {*} data - Response data
 * @param {number} status - HTTP status code
 */
export const createMockResponse = (data, status = 200) => ({
    data,
    status,
    statusText: 'OK',
    headers: {},
    config: {},
});

/**
 * Create a mock API error
 * @param {string} message - Error message
 * @param {number} status - HTTP status code
 */
export const createMockError = (message, status = 500) => {
    const error = new Error(message);
    error.response = {
        data: { error: message },
        status,
        statusText: 'Error',
    };
    return error;
};

/**
 * Render component with all providers
 * Useful for integration tests
 */
export const renderWithProviders = (ui, options = {}) => {
    return render(ui, { ...options });
};

/**
 * Simulate async action and wait for completion
 * @param {Function} action - Async action to execute
 */
export const executeAsyncAction = async (action) => {
    await act(async () => {
        await action();
    });
};

/**
 * Get current state of all stores
 * Useful for debugging tests
 */
export const getAllStoresState = () => ({
    event: useEventStore.getState(),
    auth: useAuthStore.getState(),
    ui: useUIStore.getState(),
});

/**
 * Wait for loading to complete in a store
 * @param {Function} store - Zustand store hook
 * @param {number} timeout - Maximum time to wait
 */
export const waitForLoadingComplete = async (store, timeout = 3000) => {
    return waitForStoreUpdate(
        store,
        (state) => !state.loading,
        timeout
    );
};

/**
 * Simulate cache expiration
 * Sets lastFetched to a time beyond cache duration
 */
export const expireCache = () => {
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
    useEventStore.setState({
        lastFetched: Date.now() - CACHE_DURATION - 1000, // 1 second past expiration
    });
};

/**
 * Simulate fresh cache
 * Sets lastFetched to current time
 */
export const setFreshCache = (events = []) => {
    useEventStore.setState({
        events,
        lastFetched: Date.now(),
    });
};

/**
 * Mock localStorage for testing
 */
export const mockLocalStorage = () => {
    const store = {};

    return {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => {
            store[key] = value.toString();
        }),
        removeItem: jest.fn((key) => {
            delete store[key];
        }),
        clear: jest.fn(() => {
            Object.keys(store).forEach(key => delete store[key]);
        }),
    };
};

/**
 * Advance timers and flush promises
 * Useful for testing setTimeout/setInterval
 */
export const advanceTimersAndFlush = async (ms) => {
    jest.advanceTimersByTime(ms);
    await new Promise(resolve => setImmediate(resolve));
};

export default {
    resetAllStores,
    waitForStoreUpdate,
    setupEventStore,
    setupAuthenticatedUser,
    setupToasts,
    createMockAxios,
    createMockResponse,
    createMockError,
    renderWithProviders,
    executeAsyncAction,
    getAllStoresState,
    waitForLoadingComplete,
    expireCache,
    setFreshCache,
    mockLocalStorage,
    advanceTimersAndFlush,
};
