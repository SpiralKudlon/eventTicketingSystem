import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';

/**
 * Authentication Context - Manages user authentication state
 * Assignment 14: Simple JWT-based authentication
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
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load auth state from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    /**
     * Login function
     */
    const login = async (email, password) => {
        try {
            const response = await axiosInstance.post('/auth/login', { email, password });

            if (response.data.success) {
                const { token, user } = response.data;

                // Store in state
                setToken(token);
                setUser(user);

                // Persist in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                return { success: true };
            }

            return { success: false, error: 'Login failed' };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error || 'Login failed. Please try again.'
            };
        }
    };

    /**
     * Register function
     */
    const register = async (name, email, password, phoneNumber, county) => {
        try {
            const response = await axiosInstance.post('/auth/register', {
                name,
                email,
                password,
                phoneNumber,
                county
            });

            if (response.data.success) {
                return { success: true };
            }

            return { success: false, error: 'Registration failed' };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error || 'Registration failed. Please try again.'
            };
        }
    };

    /**
     * Logout function
     */
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    /**
     * Check if user is authenticated
     */
    const isAuthenticated = () => {
        return token !== null && user !== null;
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
