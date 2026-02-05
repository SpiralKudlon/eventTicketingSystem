/**
 * Event Store Tests
 * Comprehensive unit tests for eventStore.js
 */

import useEventStore from '../eventStore';
import axiosInstance from '../../api/axiosConfig';
import {
    resetAllStores,
    createMockResponse,
    createMockError,
    expireCache,
    setFreshCache,
} from '../../test-utils/testHelpers';
import {
    mockEvents,
    mockCategories,
    mockLocations,
    createMockEvent,
} from '../../test-utils/mockData';

// Mock axios
jest.mock('../../api/axiosConfig');

describe('eventStore', () => {
    beforeEach(() => {
        resetAllStores();
        jest.clearAllMocks();
    });

    describe('Initial State', () => {
        it('should have empty events array', () => {
            const { events } = useEventStore.getState();
            expect(events).toEqual([]);
        });

        it('should have loading false', () => {
            const { loading } = useEventStore.getState();
            expect(loading).toBe(false);
        });

        it('should have null error', () => {
            const { error } = useEventStore.getState();
            expect(error).toBeNull();
        });

        it('should have null lastFetched', () => {
            const { lastFetched } = useEventStore.getState();
            expect(lastFetched).toBeNull();
        });

        it('should have empty search query', () => {
            const { searchQuery } = useEventStore.getState();
            expect(searchQuery).toBe('');
        });

        it('should have default category filter', () => {
            const { selectedCategory } = useEventStore.getState();
            expect(selectedCategory).toBe('All');
        });

        it('should have default location filter', () => {
            const { selectedLocation } = useEventStore.getState();
            expect(selectedLocation).toBe('All');
        });

        it('should have default sort', () => {
            const { sortBy } = useEventStore.getState();
            expect(sortBy).toBe('date-asc');
        });
    });

    describe('fetchEvents', () => {
        it('should fetch events from API successfully', async () => {
            axiosInstance.get.mockResolvedValueOnce(createMockResponse({ data: mockEvents }));
            axiosInstance.get.mockResolvedValueOnce(createMockResponse({ data: mockCategories }));
            axiosInstance.get.mockResolvedValueOnce(createMockResponse({ data: mockLocations }));

            const { fetchEvents } = useEventStore.getState();
            await fetchEvents();

            const state = useEventStore.getState();
            expect(state.events).toEqual(mockEvents);
            expect(state.loading).toBe(false);
            expect(state.error).toBeNull();
        });

        it('should set loading to true while fetching', async () => {
            axiosInstance.get.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

            const { fetchEvents } = useEventStore.getState();
            const promise = fetchEvents();

            // Check loading is true immediately
            expect(useEventStore.getState().loading).toBe(true);

            await promise;
        });

        it('should set loading to false after fetch completes', async () => {
            axiosInstance.get.mockResolvedValue(createMockResponse({ data: [] }));

            const { fetchEvents } = useEventStore.getState();
            await fetchEvents();

            expect(useEventStore.getState().loading).toBe(false);
        });

        it('should handle API errors', async () => {
            const errorMessage = 'Failed to fetch events';
            axiosInstance.get.mockRejectedValueOnce(createMockError(errorMessage));

            const { fetchEvents } = useEventStore.getState();
            await fetchEvents();

            const state = useEventStore.getState();
            expect(state.error).toBe(errorMessage);
            expect(state.loading).toBe(false);
        });

        it('should update lastFetched timestamp', async () => {
            axiosInstance.get.mockResolvedValue(createMockResponse({ data: [] }));

            const beforeTime = Date.now();
            const { fetchEvents } = useEventStore.getState();
            await fetchEvents();
            const afterTime = Date.now();

            const { lastFetched } = useEventStore.getState();
            expect(lastFetched).toBeGreaterThanOrEqual(beforeTime);
            expect(lastFetched).toBeLessThanOrEqual(afterTime);
        });

        it('should use cache if not expired', async () => {
            setFreshCache(mockEvents);

            const { fetchEvents } = useEventStore.getState();
            await fetchEvents();

            // Should not call API
            expect(axiosInstance.get).not.toHaveBeenCalled();
            expect(useEventStore.getState().events).toEqual(mockEvents);
        });

        it('should fetch from API if cache expired', async () => {
            expireCache();
            useEventStore.setState({ events: mockEvents });

            axiosInstance.get.mockResolvedValue(createMockResponse({ data: [] }));

            const { fetchEvents } = useEventStore.getState();
            await fetchEvents();

            // Should call API
            expect(axiosInstance.get).toHaveBeenCalled();
        });

        it('should force refresh when force=true', async () => {
            setFreshCache(mockEvents);

            axiosInstance.get.mockResolvedValue(createMockResponse({ data: [] }));

            const { fetchEvents } = useEventStore.getState();
            await fetchEvents(true); // force = true

            // Should call API even with fresh cache
            expect(axiosInstance.get).toHaveBeenCalled();
        });

        it('should fetch categories and locations', async () => {
            axiosInstance.get
                .mockResolvedValueOnce(createMockResponse({ data: mockEvents }))
                .mockResolvedValueOnce(createMockResponse({ data: mockCategories }))
                .mockResolvedValueOnce(createMockResponse({ data: mockLocations }));

            const { fetchEvents } = useEventStore.getState();
            await fetchEvents();

            const state = useEventStore.getState();
            expect(state.categories).toEqual(mockCategories);
            expect(state.locations).toEqual(mockLocations);
        });
    });

    describe('getFilteredEvents', () => {
        beforeEach(() => {
            useEventStore.setState({ events: mockEvents });
        });

        it('should return all events with no filters', () => {
            const { getFilteredEvents } = useEventStore.getState();
            const filtered = getFilteredEvents();
            expect(filtered).toHaveLength(mockEvents.length);
        });

        it('should filter by search query (name)', () => {
            useEventStore.setState({ searchQuery: 'jazz' });
            const { getFilteredEvents } = useEventStore.getState();
            const filtered = getFilteredEvents();

            expect(filtered).toHaveLength(1);
            expect(filtered[0].name).toContain('Jazz');
        });

        it('should filter by search query (location)', () => {
            useEventStore.setState({ searchQuery: 'mombasa' });
            const { getFilteredEvents } = useEventStore.getState();
            const filtered = getFilteredEvents();

            expect(filtered.every(e => e.location.toLowerCase().includes('mombasa'))).toBe(true);
        });

        it('should filter by category', () => {
            useEventStore.setState({ selectedCategory: 'Music' });
            const { getFilteredEvents } = useEventStore.getState();
            const filtered = getFilteredEvents();

            expect(filtered.every(e => e.category === 'Music')).toBe(true);
        });

        it('should filter by location', () => {
            useEventStore.setState({ selectedLocation: 'Nairobi' });
            const { getFilteredEvents } = useEventStore.getState();
            const filtered = getFilteredEvents();

            expect(filtered.every(e => e.location.includes('Nairobi'))).toBe(true);
        });

        it('should combine multiple filters', () => {
            useEventStore.setState({
                searchQuery: 'festival',
                selectedCategory: 'Music',
                selectedLocation: 'Nairobi'
            });
            const { getFilteredEvents } = useEventStore.getState();
            const filtered = getFilteredEvents();

            expect(filtered.every(e =>
                e.name.toLowerCase().includes('festival') &&
                e.category === 'Music' &&
                e.location.includes('Nairobi')
            )).toBe(true);
        });

        it('should sort by date ascending', () => {
            useEventStore.setState({ sortBy: 'date-asc' });
            const { getFilteredEvents } = useEventStore.getState();
            const filtered = getFilteredEvents();

            for (let i = 1; i < filtered.length; i++) {
                const prevDate = new Date(filtered[i - 1].eventDate);
                const currDate = new Date(filtered[i].eventDate);
                expect(prevDate.getTime()).toBeLessThanOrEqual(currDate.getTime());
            }
        });

        it('should sort by date descending', () => {
            useEventStore.setState({ sortBy: 'date-desc' });
            const { getFilteredEvents } = useEventStore.getState();
            const filtered = getFilteredEvents();

            for (let i = 1; i < filtered.length; i++) {
                const prevDate = new Date(filtered[i - 1].eventDate);
                const currDate = new Date(filtered[i].eventDate);
                expect(prevDate.getTime()).toBeGreaterThanOrEqual(currDate.getTime());
            }
        });

        it('should sort by price ascending', () => {
            useEventStore.setState({ sortBy: 'price-asc' });
            const { getFilteredEvents } = useEventStore.getState();
            const filtered = getFilteredEvents();

            for (let i = 1; i < filtered.length; i++) {
                expect(filtered[i - 1].priceKES).toBeLessThanOrEqual(filtered[i].priceKES);
            }
        });

        it('should sort by price descending', () => {
            useEventStore.setState({ sortBy: 'price-desc' });
            const { getFilteredEvents } = useEventStore.getState();
            const filtered = getFilteredEvents();

            for (let i = 1; i < filtered.length; i++) {
                expect(filtered[i - 1].priceKES).toBeGreaterThanOrEqual(filtered[i].priceKES);
            }
        });

        it('should sort by availability', () => {
            useEventStore.setState({ sortBy: 'availability' });
            const { getFilteredEvents } = useEventStore.getState();
            const filtered = getFilteredEvents();

            for (let i = 1; i < filtered.length; i++) {
                expect(filtered[i - 1].availableTickets).toBeGreaterThanOrEqual(filtered[i].availableTickets);
            }
        });
    });

    describe('Filter Setters', () => {
        it('should update search query', () => {
            const { setSearchQuery } = useEventStore.getState();
            setSearchQuery('test');
            expect(useEventStore.getState().searchQuery).toBe('test');
        });

        it('should update selected category', () => {
            const { setSelectedCategory } = useEventStore.getState();
            setSelectedCategory('Music');
            expect(useEventStore.getState().selectedCategory).toBe('Music');
        });

        it('should update selected location', () => {
            const { setSelectedLocation } = useEventStore.getState();
            setSelectedLocation('Nairobi');
            expect(useEventStore.getState().selectedLocation).toBe('Nairobi');
        });

        it('should update sort by', () => {
            const { setSortBy } = useEventStore.getState();
            setSortBy('price-asc');
            expect(useEventStore.getState().sortBy).toBe('price-asc');
        });

        it('should clear all filters', () => {
            useEventStore.setState({
                searchQuery: 'test',
                selectedCategory: 'Music',
                selectedLocation: 'Nairobi',
                sortBy: 'price-desc'
            });

            const { clearFilters } = useEventStore.getState();
            clearFilters();

            const state = useEventStore.getState();
            expect(state.searchQuery).toBe('');
            expect(state.selectedCategory).toBe('All');
            expect(state.selectedLocation).toBe('All');
            expect(state.sortBy).toBe('date-asc');
        });
    });

    describe('getEventById', () => {
        beforeEach(() => {
            useEventStore.setState({ events: mockEvents });
        });

        it('should return event by ID', () => {
            const { getEventById } = useEventStore.getState();
            const event = getEventById(1);
            expect(event).toEqual(mockEvents[0]);
        });

        it('should return undefined for non-existent ID', () => {
            const { getEventById } = useEventStore.getState();
            const event = getEventById(999);
            expect(event).toBeUndefined();
        });
    });

    describe('fetchEventById', () => {
        it('should fetch single event from API', async () => {
            const mockEvent = mockEvents[0];
            axiosInstance.get.mockResolvedValueOnce(createMockResponse({ data: mockEvent }));

            const { fetchEventById } = useEventStore.getState();
            const event = await fetchEventById(1);

            expect(event).toEqual(mockEvent);
            expect(axiosInstance.get).toHaveBeenCalledWith('/events/1');
        });

        it('should handle fetch error', async () => {
            axiosInstance.get.mockRejectedValueOnce(createMockError('Event not found', 404));

            const { fetchEventById } = useEventStore.getState();
            const event = await fetchEventById(999);

            expect(event).toBeNull();
        });
    });

    describe('clearError', () => {
        it('should clear error state', () => {
            useEventStore.setState({ error: 'Test error' });

            const { clearError } = useEventStore.getState();
            clearError();

            expect(useEventStore.getState().error).toBeNull();
        });
    });

    describe('Persistence', () => {
        it('should persist events to localStorage', async () => {
            axiosInstance.get.mockResolvedValue(createMockResponse({ data: mockEvents }));

            const { fetchEvents } = useEventStore.getState();
            await fetchEvents();

            const stored = localStorage.getItem('event-storage');
            expect(stored).toBeTruthy();

            const parsed = JSON.parse(stored);
            expect(parsed.state.events).toEqual(mockEvents);
        });

        it('should restore events from localStorage', () => {
            const storedState = {
                state: {
                    events: mockEvents,
                    lastFetched: Date.now()
                },
                version: 0
            };
            localStorage.setItem('event-storage', JSON.stringify(storedState));

            // Re-initialize store (in real app, this happens on page load)
            const { events } = useEventStore.getState();
            expect(events).toEqual(mockEvents);
        });
    });
});
