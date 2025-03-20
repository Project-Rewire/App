import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import tokenService from "../services/token-service";
import { authService } from "../services/api-service";

export function useLogin() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    // Check for existing token on startup
    useEffect(() => {
        const checkToken = async () => {
            try {
                // Check if we have a valid token
                const accessToken = await tokenService.getAccessToken();
                const isExpired = await tokenService.isTokenExpired();
                
                if (accessToken && !isExpired) {
                    // We have a valid token, try to get user data from storage
                    try {
                        const userData = await AsyncStorage.getItem('user');
                        setUser(userData ? JSON.parse(userData) : null);
                        setLoggedIn(true);
                    } catch (storageError) {
                        console.error('Error reading user data:', storageError);
                    }
                } else {
                    // refresh the token
                    const refreshToken = await tokenService.getRefreshToken();
                    if (refreshToken) {
                        try {
                            const response = await axios.post('http://10.0.2.2:8000/api/token/refresh/', {
                                refresh: refreshToken
                            });
                            
                            await tokenService.saveTokens(response.data.access, null);
                            
                            try {
                                const userData = await AsyncStorage.getItem('user');
                                setUser(userData ? JSON.parse(userData) : null);
                                setLoggedIn(true);
                            } catch (storageError) {
                                console.error('Error reading user data after refresh:', storageError);
                            }
                        } catch (refreshError) {
                            // If refresh fails, clear tokens and stay logged out
                            await tokenService.clearTokens();
                        }
                    }
                }
            } catch (error) {
                console.error('Token verification failed:', error);
            } finally {
                setLoading(false);
            }
        };

        checkToken();
    }, []);

    // Login function
    const login = async (email, password) => {
        setError(null);
        try {
            const response = await authService.login({ email, password });
            
            if (response.message === 'Login successful') {
                try {
                    await AsyncStorage.setItem('user', JSON.stringify({ email }));
                    // Tokens are already saved by the authService
                    setUser({ email });
                    setLoggedIn(true);
                    return true;
                } catch (storageError) {
                    console.error('Error saving user data:', storageError);
                    setError('Failed to save user session');
                    throw new Error('Failed to save user session');
                }
            }
        } catch (error) {
            const errorMsg = error?.message || 'Login failed';
            console.error('Login error:', errorMsg);
            setError(errorMsg);
            throw error;
        }
    };

    // Logout function
    const logout = async () => {
        try {
            // Clear stored tokens using the token service
            await tokenService.clearTokens();
            try {
                await AsyncStorage.removeItem('user');
            } catch (storageError) {
                console.error('Error removing user data:', storageError);
            }
            setUser(null);
            setLoggedIn(false);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return { 
        loggedIn, 
        loading, 
        user, 
        error, 
        login, 
        logout, 
        setLoggedIn 
    };
}