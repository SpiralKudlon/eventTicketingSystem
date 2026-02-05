/**
 * Auth Store Tests
 * Comprehensive unit tests for authStore.js
 */

import useAuthStore from '../authStore';
import axiosInstance from '../../api/axiosConfig';
import {
    resetAllStores,
    createMockResponse,
    createMockError,
    setupAuthenticatedUser,
} from '../../test-utils/testHelpers';
import {
    mockUser,
    mockToken,
    mockLoginResponse,
    mockRegisterResponse,
} from '../../test-utils/mockData';

// Mock axios
jest.mock('../../api/axiosConfig');

describe('authStore', () => {
    beforeEach(() => {
        resetAllStores();
        jest.clearAllMocks();
    });

    describe('Initial State', () => {
        it('should have null user', () => {
            const { user } = useAuthStore.getState();
            expect(user).toBeNull();
        });

        it('should have null token', () => {
            const { token } = useAuthStore.getState();
            expect(token).toBeNull();
        });

        it('should have isAuthenticated false', () => {
            const { isAuthenticated } = useAuthStore.getState();
            expect(isAuthenticated).toBe(false);
        });

        it('should have loading false', () => {
            const { loading } = useAuthStore.getState();
            expect(loading).toBe(false);
        });

        it('should have null error', () => {
            const { error } = useAuthStore.getState();
            expect(error).toBeNull();
        });

        it('should have null tokenExpiration', () => {
            const { tokenExpiration } = useAuthStore.getState();
            expect(tokenExpiration).toBeNull();
        });
    });

    describe('login', () => {
        it('should login successfully', async () => {
            axiosInstance.post.mockResolvedValueOnce(createMockResponse(mockLoginResponse));

            const { login } = useAuthStore.getState();
            const result = await login('test@tiketi.co.ke', 'password123');

            expect(result.success).toBe(true);
            const state = useAuthStore.getState();
            expect(state.user).toEqual(mockUser);
            expect(state.token).toBe(mockToken);
            expect(state.isAuthenticated).toBe(true);
            expect(state.loading).toBe(false);
        });

        it('should set loading to true while logging in', async () => {
            axiosInstance.post.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

            const { login } = useAuthStore.getState();
            const promise = login('test@tiketi.co.ke', 'password123');

            expect(useAuthStore.getState().loading).toBe(true);
            await promise;
        });

        it('should set loading to false after login completes', async () => {
            axiosInstance.post.mockResolvedValueOnce(createMockResponse(mockLoginResponse));

            const { login } = useAuthStore.getState();
            await login('test@tiketi.co.ke', 'password123');

            expect(useAuthStore.getState().loading).toBe(false);
        });

        it('should handle login errors', async () => {
            const errorMessage = 'Invalid credentials';
            axiosInstance.post.mockRejectedValueOnce(createMockError(errorMessage, 401));

            const { login } = useAuthStore.getState();
            const result = await login('test@tiketi.co.ke', 'wrongpassword');

            expect(result.success).toBe(false);
            expect(result.error).toBe(errorMessage);
            const state = useAuthStore.getState();
            expect(state.error).toBe(errorMessage);
            expect(state.isAuthenticated).toBe(false);
        });

        it('should set token expiration', async () => {
            axiosInstance.post.mockResolvedValueOnce(createMockResponse(mockLoginResponse));

            const { login } = useAuthStore.getState();
            await login('test@tiketi.co.ke', 'password123');

            const { tokenExpiration } = useAuthStore.getState();
            expect(tokenExpiration).toBeTruthy();
            expect(tokenExpiration).toBeGreaterThan(Date.now());
        });

        it('should call API with correct credentials', async () => {
            axiosInstance.post.mockResolvedValueOnce(createMockResponse(mockLoginResponse));

            const { login } = useAuthStore.getState();
            await login('test@tiketi.co.ke', 'password123');

            expect(axiosInstance.post).toHaveBeenCalledWith('/auth/login', {
                email: 'test@tiketi.co.ke',
                password: 'password123'
            });
        });
    });

    describe('register', () => {
        it('should register successfully', async () => {
            axiosInstance.post.mockResolvedValueOnce(createMockResponse(mockRegisterResponse));

            const { register } = useAuthStore.getState();
            const result = await register(
                'John Doe',
                'john@tiketi.co.ke',
                'password123',
                '+254712345678',
                'Nairobi'
            );

            expect(result.success).toBe(true);
            expect(result.data).toEqual(mockRegisterResponse);
        });

        it('should handle registration errors', async () => {
            const errorMessage = 'Email already exists';
            axiosInstance.post.mockRejectedValueOnce(createMockError(errorMessage, 400));

            const { register } = useAuthStore.getState();
            const result = await register(
                'John Doe',
                'existing@tiketi.co.ke',
                'password123',
                '+254712345678',
                'Nairobi'
            );

            expect(result.success).toBe(false);
            expect(result.error).toBe(errorMessage);
        });

        it('should call API with correct data', async () => {
            axiosInstance.post.mockResolvedValueOnce(createMockResponse(mockRegisterResponse));

            const { register } = useAuthStore.getState();
            await register(
                'John Doe',
                'john@tiketi.co.ke',
                'password123',
                '+254712345678',
                'Nairobi'
            );

            expect(axiosInstance.post).toHaveBeenCalledWith('/auth/register', {
                name: 'John Doe',
                email: 'john@tiketi.co.ke',
                password: 'password123',
                phoneNumber: '+254712345678',
                county: 'Nairobi'
            });
        });
    });

    describe('logout', () => {
        beforeEach(() => {
            setupAuthenticatedUser(mockUser, mockToken);
        });

        it('should clear user state', () => {
            const { logout } = useAuthStore.getState();
            logout();

            const state = useAuthStore.getState();
            expect(state.user).toBeNull();
            expect(state.token).toBeNull();
            expect(state.isAuthenticated).toBe(false);
            expect(state.tokenExpiration).toBeNull();
        });

        it('should clear localStorage', () => {
            localStorage.setItem('auth-storage', JSON.stringify({ user: mockUser }));

            const { logout } = useAuthStore.getState();
            logout();

            expect(localStorage.getItem('auth-storage')).toBeNull();
        });

        it('should clear error state', () => {
            useAuthStore.setState({ error: 'Some error' });

            const { logout } = useAuthStore.getState();
            logout();

            expect(useAuthStore.getState().error).toBeNull();
        });
    });

    describe('Token Management', () => {
        describe('isTokenExpired', () => {
            it('should return false for valid token', () => {
                const futureExpiration = Date.now() + 60 * 60 * 1000; // 1 hour from now
                useAuthStore.setState({ tokenExpiration: futureExpiration });

                const { isTokenExpired } = useAuthStore.getState();
                expect(isTokenExpired()).toBe(false);
            });

            it('should return true for expired token', () => {
                const pastExpiration = Date.now() - 60 * 60 * 1000; // 1 hour ago
                useAuthStore.setState({ tokenExpiration: pastExpiration });

                const { isTokenExpired } = useAuthStore.getState();
                expect(isTokenExpired()).toBe(true);
            });

            it('should return true if no token expiration', () => {
                useAuthStore.setState({ tokenExpiration: null });

                const { isTokenExpired } = useAuthStore.getState();
                expect(isTokenExpired()).toBe(true);
            });
        });

        describe('checkAuth', () => {
            it('should return true for valid authenticated state', async () => {
                setupAuthenticatedUser(mockUser, mockToken);

                const { checkAuth } = useAuthStore.getState();
                const result = await checkAuth();

                expect(result).toBe(true);
                expect(useAuthStore.getState().isAuthenticated).toBe(true);
            });

            it('should logout if no token', async () => {
                useAuthStore.setState({ token: null });

                const { checkAuth } = useAuthStore.getState();
                const result = await checkAuth();

                expect(result).toBe(false);
                expect(useAuthStore.getState().isAuthenticated).toBe(false);
            });

            it('should logout if token expired', async () => {
                const pastExpiration = Date.now() - 60 * 60 * 1000;
                useAuthStore.setState({
                    token: mockToken,
                    tokenExpiration: pastExpiration
                });

                const { checkAuth } = useAuthStore.getState();
                const result = await checkAuth();

                expect(result).toBe(false);
                expect(useAuthStore.getState().isAuthenticated).toBe(false);
            });
        });
    });

    describe('getCurrentUser', () => {
        it('should return current user', () => {
            setupAuthenticatedUser(mockUser, mockToken);

            const { getCurrentUser } = useAuthStore.getState();
            const user = getCurrentUser();

            expect(user).toEqual(mockUser);
        });

        it('should return null if not authenticated', () => {
            const { getCurrentUser } = useAuthStore.getState();
            const user = getCurrentUser();

            expect(user).toBeNull();
        });
    });

    describe('hasRole', () => {
        it('should return true if user has role', () => {
            setupAuthenticatedUser({ ...mockUser, role: 'ADMIN' }, mockToken);

            const { hasRole } = useAuthStore.getState();
            expect(hasRole('ADMIN')).toBe(true);
        });

        it('should return false if user does not have role', () => {
            setupAuthenticatedUser({ ...mockUser, role: 'USER' }, mockToken);

            const { hasRole } = useAuthStore.getState();
            expect(hasRole('ADMIN')).toBe(false);
        });

        it('should return false if not authenticated', () => {
            const { hasRole } = useAuthStore.getState();
            expect(hasRole('USER')).toBe(false);
        });
    });

    describe('clearError', () => {
        it('should clear error state', () => {
            useAuthStore.setState({ error: 'Test error' });

            const { clearError } = useAuthStore.getState();
            clearError();

            expect(useAuthStore.getState().error).toBeNull();
        });
    });

    describe('Persistence', () => {
        it('should persist auth state to localStorage', async () => {
            axiosInstance.post.mockResolvedValueOnce(createMockResponse(mockLoginResponse));

            const { login } = useAuthStore.getState();
            await login('test@tiketi.co.ke', 'password123');

            const stored = localStorage.getItem('auth-storage');
            expect(stored).toBeTruthy();

            const parsed = JSON.parse(stored);
            expect(parsed.state.user).toEqual(mockUser);
            expect(parsed.state.token).toBe(mockToken);
        });

        it('should restore auth state from localStorage', () => {
            const storedState = {
                state: {
                    user: mockUser,
                    token: mockToken,
                    isAuthenticated: true,
                    tokenExpiration: Date.now() + 60 * 60 * 1000
                },
                version: 0
            };
            localStorage.setItem('auth-storage', JSON.stringify(storedState));

            // Re-initialize store
            const { user, token, isAuthenticated } = useAuthStore.getState();
            expect(user).toEqual(mockUser);
            expect(token).toBe(mockToken);
            expect(isAuthenticated).toBe(true);
        });
    });

    describe('Error Handling', () => {
        it('should handle network errors', async () => {
            axiosInstance.post.mockRejectedValueOnce(new Error('Network error'));

            const { login } = useAuthStore.getState();
            const result = await login('test@tiketi.co.ke', 'password123');

            expect(result.success).toBe(false);
            expect(useAuthStore.getState().error).toBeTruthy();
        });

        it('should handle 401 errors', async () => {
            axiosInstance.post.mockRejectedValueOnce(createMockError('Unauthorized', 401));

            const { login } = useAuthStore.getState();
            const result = await login('test@tiketi.co.ke', 'wrongpassword');

            expect(result.success).toBe(false);
            expect(result.error).toBe('Unauthorized');
        });

        it('should handle 500 errors', async () => {
            axiosInstance.post.mockRejectedValueOnce(createMockError('Server error', 500));

            const { login } = useAuthStore.getState();
            const result = await login('test@tiketi.co.ke', 'password123');

            expect(result.success).toBe(false);
            expect(result.error).toBe('Server error');
        });
    });
});
