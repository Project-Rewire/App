import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode'; 

// Token storage keys
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

/**
 * Service to handle JWT token operations
 */
const tokenService = {
  /**
   * Save tokens to AsyncStorage
   * @param {string} accessToken JWT access token
   * @param {string} refreshToken JWT refresh token
   */
  saveTokens: async (accessToken, refreshToken) => {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      if (refreshToken) {
        await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      }
    } catch (error) {
      console.error('Error saving tokens:', error);
      throw error;
    }
  },

  /**
   * Get access token from storage
   * @returns {Promise<string|null>} Stored access token or null
   */
  getAccessToken: async () => {
    try {
      return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  },

  /**
   * Get refresh token from storage
   * @returns {Promise<string|null>} Stored refresh token or null
   */
  getRefreshToken: async () => {
    try {
      return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  },

  /**
   * Clear all stored tokens
   */
  clearTokens: async () => {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
      await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error clearing tokens:', error);
    }
  },

  /**
   * Check if access token is expired
   * @returns {Promise<boolean>} True if token is expired
   */
  isTokenExpired: async () => {
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
      if (!token) return true;

      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  },
};

export default tokenService;