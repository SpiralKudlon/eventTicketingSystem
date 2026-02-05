import React, { createContext, useContext, useEffect } from 'react';
import useAuthStore from '../stores/authStore';

/**
 * Authentication Context - Enhanced to use Zustand auth store
 * Maintains backward compatibility while using centralized state
 * Assignment 14: JWT-based authentication with token management
 */
const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    // Get all auth state and actions from the store
    const {
        user,
        token,
        loading,
        error,
        isAuthenticated,
        login,
        register,
        logout,
        checkAuth,
        clearError,
    } = useAuthStore();

    // Check auth on mount and periodically
    useEffect(() => {
        checkAuth();

        // Check auth every 5 minutes
        const interval = setInterval(() => {
            checkAuth();
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, [checkAuth]);

    // Provide the same API as before for backward compatibility
    const value = {
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: () => isAuthenticated,
        clearError,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

