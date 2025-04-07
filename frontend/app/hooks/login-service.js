import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { settings } from '../app.settings';

export function useLogin() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // Check if user is already logged in on app start
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                const userData = await AsyncStorage.getItem('userData');
                
                if (token && userData) {
                    setUser(JSON.parse(userData));
                    setLoggedIn(true);
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            } finally {
                setLoading(false);
            }
        };
        
        checkLoginStatus();
    }, []);

    const login = async (email, password) => {
        try {
            // For development/testing: If using Django's development server,
            // it's often better to use direct API calls instead of going through the 
            // Django views with CSRF protection
            
            // Option 1: Use your API token endpoint instead of login view
            const tokenUrl = settings.authEndpoints.value.token || 'http://10.0.2.2:8000/api/token/';
            
            const response = await fetch(tokenUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            
            const data = await response.json();
            console.log('Response status:', response.status);
            console.log('Response data:', data);
            
            if (response.ok) {
                // Store the tokens
                if (data.access) {
                    await AsyncStorage.setItem('authToken', data.access);
                    if (data.refresh) {
                        await AsyncStorage.setItem('refreshToken', data.refresh);
                    }
                }
                
                // Store basic user data
                const userData = { email };
                await AsyncStorage.setItem('userData', JSON.stringify(userData));
                
                setUser(userData);
                setLoggedIn(true);
                return true;
            } else {
                throw new Error(data.detail || 'Login failed');
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('authToken');
            await AsyncStorage.removeItem('refreshToken');
            await AsyncStorage.removeItem('userData');
            setUser(null);
            setLoggedIn(false);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return { login, logout, loggedIn, user, loading };
}