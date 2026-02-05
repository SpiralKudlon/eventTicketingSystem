import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import axiosInstance from '../api/axiosConfig';

/**
 * Event Store - Centralized state management for events
 * Uses Zustand for lightweight, performant state management
 */
const useEventStore = create(
    devtools(
        persist(
            (set, get) => ({
                // State
                events: [],
                categories: [],
                locations: [],
                loading: false,
                error: null,
                lastFetched: null,

                // Search and filter state
                searchQuery: '',
                selectedCategory: 'All',
                selectedLocation: 'All',
                sortBy: 'date-asc',

                // Cache duration (5 minutes)
                CACHE_DURATION: 5 * 60 * 1000,

                // Actions
                fetchEvents: async (force = false) => {
                    const { lastFetched, CACHE_DURATION, events } = get();

                    // Use cache if available and not expired
                    if (!force && lastFetched && events.length > 0) {
                        const cacheAge = Date.now() - lastFetched;
                        if (cacheAge < CACHE_DURATION) {
                            console.log('Using cached events');
                            return;
                        }
                    }

                    set({ loading: true, error: null });
                    try {
                        const response = await axiosInstance.get('/events');
                        set({
                            events: response.data,
                            loading: false,
                            lastFetched: Date.now(),
                        });
                    } catch (error) {
                        set({
                            error: 'Failed to load events. Please try again.',
                            loading: false,
                        });
                        console.error('Error fetching events:', error);
                    }
                },

                fetchCategories: async () => {
                    try {
                        const response = await axiosInstance.get('/events/categories');
                        set({ categories: response.data });
                    } catch (error) {
                        console.error('Error fetching categories:', error);
                    }
                },

                fetchLocations: async () => {
                    try {
                        const response = await axiosInstance.get('/events/locations');
                        set({ locations: response.data });
                    } catch (error) {
                        console.error('Error fetching locations:', error);
                    }
                },

                // Get single event by ID
                getEventById: (id) => {
                    const { events } = get();
                    return events.find(event => event.id === parseInt(id));
                },

                // Fetch single event from API if not in cache
                fetchEventById: async (id) => {
                    const cachedEvent = get().getEventById(id);
                    if (cachedEvent) {
                        return cachedEvent;
                    }

                    try {
                        const response = await axiosInstance.get(`/events/${id}`);
                        return response.data;
                    } catch (error) {
                        console.error('Error fetching event:', error);
                        throw error;
                    }
                },

                // Filter and sort logic
                getFilteredEvents: () => {
                    const { events, searchQuery, selectedCategory, selectedLocation, sortBy } = get();
                    let filtered = [...events];

                    // Search filter
                    if (searchQuery.trim()) {
                        const query = searchQuery.toLowerCase();
                        filtered = filtered.filter(event =>
                            event.name.toLowerCase().includes(query) ||
                            event.location.toLowerCase().includes(query) ||
                            event.description.toLowerCase().includes(query)
                        );
                    }

                    // Category filter
                    if (selectedCategory !== 'All') {
                        filtered = filtered.filter(event => event.category === selectedCategory);
                    }

                    // Location filter
                    if (selectedLocation !== 'All') {
                        filtered = filtered.filter(event => event.location.includes(selectedLocation));
                    }

                    // Sorting
                    filtered.sort((a, b) => {
                        switch (sortBy) {
                            case 'date-asc':
                                return new Date(a.eventDate) - new Date(b.eventDate);
                            case 'date-desc':
                                return new Date(b.eventDate) - new Date(a.eventDate);
                            case 'price-asc':
                                return a.priceKES - b.priceKES;
                            case 'price-desc':
                                return b.priceKES - a.priceKES;
                            case 'availability':
                                return b.availableTickets - a.availableTickets;
                            default:
                                return 0;
                        }
                    });

                    return filtered;
                },

                // Update filters
                setSearchQuery: (query) => set({ searchQuery: query }),
                setSelectedCategory: (category) => set({ selectedCategory: category }),
                setSelectedLocation: (location) => set({ selectedLocation: location }),
                setSortBy: (sortBy) => set({ sortBy }),

                // Clear all filters
                clearFilters: () => set({
                    searchQuery: '',
                    selectedCategory: 'All',
                    selectedLocation: 'All',
                    sortBy: 'date-asc',
                }),

                // Refresh events (force fetch)
                refreshEvents: () => {
                    get().fetchEvents(true);
                },

                // Clear error
                clearError: () => set({ error: null }),
            }),
            {
                name: 'event-storage',
                partialize: (state) => ({
                    events: state.events,
                    categories: state.categories,
                    locations: state.locations,
                    lastFetched: state.lastFetched,
                }),
            }
        ),
        { name: 'EventStore' }
    )
);

export default useEventStore;
