import { settings } from '../app.settings';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = settings.apiBaseUrl.value;
const AUTH_ENDPOINTS = settings.authEndpoints.value;

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('auth_token', token);
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('auth_token');
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('auth_token');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

export const authService = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}${AUTH_ENDPOINTS.login}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  signupStepOne: async (firstName, lastName, userName) => {
    try {
      const response = await fetch(`${API_URL}${AUTH_ENDPOINTS.signupStepOne}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          first_name: firstName, 
          last_name: lastName, 
          user_name: userName 
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Signup step one failed');
      }
      
      return data;
    } catch (error) {
      console.error('Signup step one error:', error);
      throw error;
    }
  },
  
  signupStepTwo: async (firstName, lastName, userName, email, password, confirmPassword) => {
    try {
      const response = await fetch(`${API_URL}${AUTH_ENDPOINTS.signupStepTwo}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            first_name : firstName,
            last_name : lastName,
            user_name : userName,
            email, 
            password, 
            confirm_password: confirmPassword 
        }),
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Signup step two failed');
      }
      
      return data;
    } catch (error) {
      console.error('Signup step two error:', error);
      throw error;
    }
  },
  
  forgotPassword: async (email) => {
    try {
      const response = await fetch(`${API_URL}${AUTH_ENDPOINTS.forgotPassword}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Password reset request failed');
      }
      
      return data;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  },

  resetPassword: async (uidb64, token, newPassword) => {
    try {
      const response = await fetch(`${API_URL}${AUTH_ENDPOINTS.resetPassword}/${uidb64}/${token}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ new_password: newPassword })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Password reset failed');
      }
      return data;
      
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }
};