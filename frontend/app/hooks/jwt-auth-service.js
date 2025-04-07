import { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { settings } from '../app.settings';
// Remove jwt-decode dependency for now

// Create auth context
const AuthContext = createContext(null);

// Storage keys
const AUTH_TOKEN_KEY = 'authToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_DATA_KEY = 'userData';

// Provider component
export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    isLoading: true,
    isLoggedIn: false,
    user: null,
    tokens: {
      accessToken: null,
      refreshToken: null
    }
  });

  // Check authentication status on mount
  useEffect(() => {
    const loadAuthState = async () => {
      try {
        // Load tokens and user data
        const [accessToken, refreshToken, userDataJson] = await Promise.all([
          AsyncStorage.getItem(AUTH_TOKEN_KEY),
          AsyncStorage.getItem(REFRESH_TOKEN_KEY),
          AsyncStorage.getItem(USER_DATA_KEY)
        ]);

        if (accessToken && refreshToken) {
          // Parse user data
          const userData = userDataJson ? JSON.parse(userDataJson) : null;
          
          // Set logged in state
          setAuthState({
            isLoading: false,
            isLoggedIn: true,
            user: userData,
            tokens: {
              accessToken,
              refreshToken
            }
          });
        } else {
          // Default to logged out state
          setAuthState({
            isLoading: false,
            isLoggedIn: false,
            user: null,
            tokens: {
              accessToken: null,
              refreshToken: null
            }
          });
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
        setAuthState({
          isLoading: false,
          isLoggedIn: false,
          user: null,
          tokens: {
            accessToken: null,
            refreshToken: null
          }
        });
      }
    };

    loadAuthState();
  }, []);

  // Refresh the auth token
  const refreshAuthToken = async (refreshToken) => {
    try {
      const refreshUrl = settings.authEndpoints.value.tokenRefresh || 'http://10.0.2.2:8000/api/token/refresh/';
      
      const response = await fetch(refreshUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // Save the new tokens
        if (data.access) {
          await AsyncStorage.setItem(AUTH_TOKEN_KEY, data.access);
        }
        
        if (data.refresh) {
          await AsyncStorage.setItem(REFRESH_TOKEN_KEY, data.refresh);
        }
        
        return data;
      }
      
      return null;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const tokenUrl = settings.authEndpoints.value.token || 'http://10.0.2.2:8000/api/token/';
      
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Store the tokens
        if (data.access) {
          await AsyncStorage.setItem(AUTH_TOKEN_KEY, data.access);
        }
        
        if (data.refresh) {
          await AsyncStorage.setItem(REFRESH_TOKEN_KEY, data.refresh);
        }
        
        // Store basic user data
        const userData = { email };
        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
        
        // Update state
        setAuthState({
          isLoading: false,
          isLoggedIn: true,
          user: userData,
          tokens: {
            accessToken: data.access,
            refreshToken: data.refresh
          }
        });
        
        return true;
      } else {
        throw new Error(data.detail || 'Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Clear tokens and user data from storage
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
      await AsyncStorage.removeItem(USER_DATA_KEY);
      
      // Update state
      setAuthState({
        isLoading: false,
        isLoggedIn: false,
        user: null,
        tokens: {
          accessToken: null,
          refreshToken: null
        }
      });
      
      return true;
    } catch (error) {
      console.error('Logout failed:', error);
      return false;
    }
  };

  // Function to get auth header for API requests
  const getAuthHeader = () => {
    const { accessToken } = authState.tokens;
    return accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {};
  };

  // Function to make authenticated API requests
  const authFetch = async (url, options = {}) => {
    try {
      // Add auth header to request
      const headers = {
        ...options.headers,
        ...getAuthHeader()
      };
      
      // Make the request
      const response = await fetch(url, {
        ...options,
        headers
      });
      
      // Handle unauthorized response (token might be invalid)
      if (response.status === 401) {
        // Try to refresh token
        if (authState.tokens.refreshToken) {
          const newTokens = await refreshAuthToken(authState.tokens.refreshToken);
          if (newTokens) {
            // Update state with new tokens
            setAuthState(prev => ({
              ...prev,
              tokens: {
                accessToken: newTokens.access,
                refreshToken: newTokens.refresh || prev.tokens.refreshToken
              }
            }));
            
            // Retry the request with new token
            const retryResponse = await fetch(url, {
              ...options,
              headers: {
                ...options.headers,
                'Authorization': `Bearer ${newTokens.access}`
              }
            });
            
            return retryResponse;
          }
        }
        
        // If refresh fails or no refresh token, log out
        await loagout();
        throw new Error('Session expired. Please log in again.');
      }
      
      return response;
    } catch (error) {
      console.error('Auth fetch error:', error);
      throw error;
    }
  };

  // Value to be provided to context consumers
  const authContextValue = {
    ...authState,
    login,
    logout,
    getAuthHeader,
    authFetch
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}