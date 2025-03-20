import { useState, useEffect } from "react";
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
                    const userData = await AsyncStorage.getItem('user');
                    setUser(userData ? JSON.parse(userData) : null);
                    setLoggedIn(true);
                } else {
                    // refresh the token
                    const refreshToken = await tokenService.getRefreshToken();
                    if (refreshToken) {
                        try {
                            const response = await axios.post('http://10.0.2.2:8000/api/token/refresh/', {
                                refresh: refreshToken
                            });
                            
                            await tokenService.saveTokens(response.data.access, null);
                            
                            const userData = await AsyncStorage.getItem('user');
                            setUser(userData ? JSON.parse(userData) : null);
                            setLoggedIn(true);
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
                await AsyncStorage.setItem('user', JSON.stringify({ email }));
                // Tokens are already saved by the authService
                setUser({ email });
                setLoggedIn(true);
                return true;
            }
        } catch (error) {
            setError(error.message || 'Login failed');
            throw error;
        }
    };

    // Logout function
    const logout = async () => {
        try {
            // Clear stored tokens using the token service
            await tokenService.clearTokens();
            await AsyncStorage.removeItem('user');
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