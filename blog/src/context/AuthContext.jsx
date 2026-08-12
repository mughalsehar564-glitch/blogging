import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = 'http://localhost:5000/api/auth';

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('is_admin') === 'true';
  });
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token');
  });

  const login = (password) => {
    if (password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('is_admin', 'true');
      return true;
    }
    return false;
  };

  const userLogin = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const { token, user: userData } = response.data;
      
      setUser(userData);
      setToken(token);
      setIsAdmin(userData.isAdmin);
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      localStorage.setItem('is_admin', userData.isAdmin.toString());
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const userSignup = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, { name, email, password });
      const { token, user: userData } = response.data;
      
      setUser(userData);
      setToken(token);
      setIsAdmin(userData.isAdmin);
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      localStorage.setItem('is_admin', userData.isAdmin.toString());
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Signup failed' 
      };
    }
  };

  const logout = () => {
    setIsAdmin(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem('is_admin');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAdmin, user, token, login, userLogin, userSignup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
