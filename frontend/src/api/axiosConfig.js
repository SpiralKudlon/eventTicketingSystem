import axios from 'axios';

/**
 * Axios Configuration for API calls
 * Base URL points to Spring Boot backend
 */
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds
});

// Request interceptor - Add JWT token and logging
axiosInstance.interceptors.request.use(
    (config) => {
        // Add JWT token to Authorization header if available
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        console.log('API Request:', config.method.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
    (response) => {
        console.log('API Response:', response.status, response.config.url);
        return response;
    },
    (error) => {
        if (error.response) {
            console.error('API Error:', error.response.status, error.response.data);

            // Handle 401 Unauthorized - redirect to login
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                // Only redirect if not already on login/register page
                if (!window.location.pathname.includes('/login') &&
                    !window.location.pathname.includes('/register')) {
                    window.location.href = '/login';
                }
            }
        } else if (error.request) {
            console.error('Network Error:', error.message);
        } else {
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
