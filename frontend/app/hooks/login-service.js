import { useState, useEffect, createContext, useContext } from "react";
import { authService, storeToken, getToken, removeToken } from "../services/auth-service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in on app start
    const checkLoginStatus = async () => {
      const token = await getToken();
      if (token) {
        setLoggedIn(true);
        // You could fetch user profile here if needed
      }
      setLoading(false);
    };
    
    checkLoginStatus();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      
      if (response.message === 'Login successful') {
        // For JWT, the token would typically be in the response
        if (response.token) {
          await storeToken(response.token);
        }
        setLoggedIn(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = async () => {
    await removeToken();
    setLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      loggedIn, 
      loading, 
      user, 
      login, 
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useLogin = () => useContext(AuthContext);