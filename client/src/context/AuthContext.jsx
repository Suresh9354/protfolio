import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // Sync with localStorage on mount and when token changes
    const storedToken = localStorage.getItem('token');
    if (storedToken !== token) {
      setToken(storedToken);
    }
    
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ token });
    } else {
      setUser(null);
      delete api.defaults.headers.common['Authorization'];
    }
    setLoading(false);
  }, [token]);

  // Listen for storage changes (e.g., when token is cleared by interceptor)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken !== token) {
        setToken(storedToken);
        if (!storedToken) {
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!token,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

