import axios from 'axios';
import tokenService from './token-service';

// Base URL for your Django backend
const API_URL = 'http://localhost:8000/'; 
// Use 'http://10.0.2.2:8000' For Android emulator

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to handle token refreshing and authentication
api.interceptors.request.use(
  async (config) => {
    // If the request doesn't need authentication, return the config
    if (config.url === '/api/token/' || config.url === '/api/token/refresh/') {
      return config;
    }

    // Check if token is expired
    const isExpired = await tokenService.isTokenExpired();
    if (isExpired) {
      // Try to refresh the token
      const refreshToken = await tokenService.getRefreshToken();
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_URL}/api/token/refresh/`, {
            refresh: refreshToken
          });
          
          const { access } = response.data;
          await tokenService.saveTokens(access, null); // Only update access token
        } catch (error) {
          // If refresh fails, clear tokens
          await tokenService.clearTokens();
          // Redirect to login
          // navigationRef.navigate('Login');
          return config;
        }
      }
    }

    // Add access token to the request if available
    const accessToken = await tokenService.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// Authentication API functions
export const authService = {
  // Signup Step One
  signupStepOne: async (userData) => {
    try {
      const response = await api.post('/signup/step-one', userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Signup Step Two
  signupStepTwo: async (userData) => {
    try {
      const response = await api.post('/signup/step-two', userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Login with JWT
  login: async (credentials) => {
    try {
      // First authenticate with your custom login endpoint if needed
      const loginResponse = await api.post('/login', credentials);
      
      // Then get JWT tokens
      const tokenResponse = await api.post('/api/token/', {
        email: credentials.email,
        password: credentials.password
      });
      
      // Extract tokens
      const { access, refresh } = tokenResponse.data;
      
      // Save tokens
      await tokenService.saveTokens(access, refresh);
      
      return {
        ...loginResponse.data,
        tokens: { access, refresh }
      };
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/forget-password', { email });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Reset Password
  resetPassword: async (uidb64, token, newPassword) => {
    try {
      const response = await api.post(`/reset-password/${uidb64}/${token}`, {
        new_password: newPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
};

// Setup authentication token for future requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;