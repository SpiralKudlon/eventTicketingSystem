import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import axiosInstance from '../api/axiosConfig';
import analytics from '../services/analyticsService';

/**
 * Auth Store - Enhanced authentication state management
 * Features: Token refresh, expiration checking, persistent sessions
 */
const useAuthStore = create(
    devtools(
        persist(
            (set, get) => ({
                // State
                user: null,
                token: null,
                loading: false,
                error: null,
                isAuthenticated: false,

                // Token expiration (24 hours default)
                tokenExpiration: null,

                // Actions
                login: async (email, password) => {
                    set({ loading: true, error: null });
                    analytics.trackEvent('Auth', 'Login Attempt', email);
                    try {
                        const response = await axiosInstance.post('/auth/login', {
                            email,
                            password,
                        });

                        if (response.data.success) {
                            const { token, user } = response.data;
                            const expiration = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

                            set({
                                user,
                                token,
                                isAuthenticated: true,
                                tokenExpiration: expiration,
                                loading: false,
                                error: null,
                            });

                            // Set axios default header
                            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                            // Identify user
                            analytics.identifyUser(user.id, user.role);
                            analytics.trackEvent('Auth', 'Login Success');

                            return { success: true };
                        }

                        set({ loading: false, error: 'Login failed' });
                        analytics.trackEvent('Auth', 'Login Failed', 'Invalid credentials');
                        return { success: false, error: 'Login failed' };
                    } catch (error) {
                        const errorMessage = error.response?.data?.error || 'Login failed. Please try again.';
                        set({ loading: false, error: errorMessage });
                        analytics.trackEvent('Auth', 'Login Error', errorMessage);
                        return { success: false, error: errorMessage };
                    }
                },

                register: async (name, email, password, phoneNumber, county) => {
                    set({ loading: true, error: null });
                    analytics.trackEvent('Auth', 'Register Attempt');
                    try {
                        const response = await axiosInstance.post('/auth/register', {
                            name,
                            email,
                            password,
                            phoneNumber,
                            county,
                        });

                        if (response.data.success) {
                            set({ loading: false, error: null });
                            analytics.trackEvent('Auth', 'Register Success');
                            return { success: true };
                        }

                        set({ loading: false, error: 'Registration failed' });
                        analytics.trackEvent('Auth', 'Register Failed');
                        return { success: false, error: 'Registration failed' };
                    } catch (error) {
                        const errorMessage = error.response?.data?.error || 'Registration failed. Please try again.';
                        set({ loading: false, error: errorMessage });
                        analytics.trackEvent('Auth', 'Register Error', errorMessage);
                        return { success: false, error: errorMessage };
                    }
                },

                logout: () => {
                    // Clear axios header
                    delete axiosInstance.defaults.headers.common['Authorization'];
                    analytics.trackEvent('Auth', 'Logout');

                    set({
                        user: null,
                        token: null,
                        isAuthenticated: false,
                        tokenExpiration: null,
                        error: null,
                    });
                },

                // Check if token is expired
                isTokenExpired: () => {
                    const { tokenExpiration } = get();
                    if (!tokenExpiration) return true;
                    return Date.now() > tokenExpiration;
                },

                // Check and refresh token if needed
                checkAuth: () => {
                    const { token, isTokenExpired, logout } = get();

                    if (!token) {
                        return false;
                    }

                    if (isTokenExpired()) {
                        console.log('Token expired, logging out');
                        logout();
                        return false;
                    }

                    // Set axios header if not set
                    if (token && !axiosInstance.defaults.headers.common['Authorization']) {
                        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    }

                    return true;
                },

                // Refresh token (extend expiration)
                refreshToken: () => {
                    const { token } = get();
                    if (token) {
                        const newExpiration = Date.now() + 24 * 60 * 60 * 1000;
                        set({ tokenExpiration: newExpiration });
                    }
                },

                // Get user info
                getCurrentUser: async () => {
                    const { token, checkAuth } = get();

                    if (!checkAuth()) {
                        return null;
                    }

                    try {
                        const response = await axiosInstance.get('/auth/me');
                        if (response.data.success) {
                            set({ user: response.data.user });
                            return response.data.user;
                        }
                    } catch (error) {
                        console.error('Error fetching user:', error);
                        return null;
                    }
                },

                // Check if user has specific role
                hasRole: (role) => {
                    const { user } = get();
                    return user?.role === role;
                },

                // Update user profile with Optimistic Update
                updateProfile: async (userData) => {
                    const { user } = get();
                    const previousUser = user;

                    // 1. Optimistic Update
                    set({
                        user: { ...user, ...userData },
                        loading: true,
                        error: null
                    });

                    try {
                        // 2. Perform API Call
                        const response = await axiosInstance.put('/auth/profile', userData);

                        if (response.data.success) {
                            set({
                                user: response.data.user,
                                loading: false
                            });
                            return { success: true };
                        }
                    } catch (error) {
                        // 3. Rollback on failure
                        set({
                            user: previousUser,
                            loading: false,
                            error: error.response?.data?.error || 'Failed to update profile'
                        });
                        throw error;
                    }
                },

                // Clear error
                clearError: () => set({ error: null }),
            }),
            {
                name: 'auth-storage',
                partialize: (state) => ({
                    user: state.user,
                    token: state.token,
                    isAuthenticated: state.isAuthenticated,
                    tokenExpiration: state.tokenExpiration,
                }),
            }
        ),
        { name: 'AuthStore' }
    )
);

// Initialize axios interceptor for token
const initializeAuthInterceptor = () => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const { token, checkAuth } = useAuthStore.getState();

            // Check auth before each request
            if (token && checkAuth()) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        (error) => Promise.reject(error)
    );

    // Response interceptor for handling 401 errors
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                const { logout } = useAuthStore.getState();
                logout();
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    );
};

// Initialize on import
initializeAuthInterceptor();

export default useAuthStore;
