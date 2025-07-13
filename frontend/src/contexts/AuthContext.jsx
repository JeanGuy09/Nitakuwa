import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, usersAPI, handleAPIError } from '../services/api';

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
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Check for stored user session
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('kongenga_token');
        const storedUser = localStorage.getItem('kongenga_user');
        
        if (storedToken && storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          
          // Load user's favorites
          try {
            const favoritesData = await usersAPI.getFavorites();
            setFavorites(favoritesData.favorites.map(job => job.id));
          } catch (error) {
            console.error('Failed to load favorites:', error);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear invalid stored data
        localStorage.removeItem('kongenga_token');
        localStorage.removeItem('kongenga_user');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password, userType = 'student') => {
    try {
      const response = await authAPI.login(email, password, userType);
      
      if (response.access_token) {
        localStorage.setItem('kongenga_token', response.access_token);
        localStorage.setItem('kongenga_user', JSON.stringify(response.user));
        setUser(response.user);
        
        // Load user's favorites
        try {
          const favoritesData = await usersAPI.getFavorites();
          setFavorites(favoritesData.favorites.map(job => job.id));
        } catch (error) {
          console.error('Failed to load favorites:', error);
        }
        
        return { success: true, user: response.user };
      } else {
        return { success: false, error: 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: handleAPIError(error, 'Login failed') };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      
      if (response.access_token) {
        localStorage.setItem('kongenga_token', response.access_token);
        localStorage.setItem('kongenga_user', JSON.stringify(response.user));
        setUser(response.user);
        setFavorites([]);
        
        return { success: true, user: response.user };
      } else {
        return { success: false, error: 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: handleAPIError(error, 'Registration failed') };
    }
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    localStorage.removeItem('kongenga_token');
    localStorage.removeItem('kongenga_user');
  };

  const toggleFavorite = async (jobId) => {
    if (!user) return;

    try {
      const response = await usersAPI.toggleFavorite(jobId);
      
      if (response.status === 'success') {
        if (response.action === 'added') {
          setFavorites(prev => [...prev, jobId]);
        } else {
          setFavorites(prev => prev.filter(id => id !== jobId));
        }
        
        // Update user data
        const updatedUser = { ...user, favoriteJobs: response.action === 'added' 
          ? [...(user.favoriteJobs || []), jobId] 
          : (user.favoriteJobs || []).filter(id => id !== jobId) 
        };
        setUser(updatedUser);
        localStorage.setItem('kongenga_user', JSON.stringify(updatedUser));
        
        return response;
      }
    } catch (error) {
      console.error('Toggle favorite error:', error);
      throw new Error(handleAPIError(error, 'Failed to update favorites'));
    }
  };

  const isFavorite = (jobId) => {
    return favorites.includes(jobId);
  };

  const updateProgress = async (progressUpdate) => {
    if (!user) return;

    try {
      const newProgress = { ...user.progress, ...progressUpdate };
      await usersAPI.updateProgress(newProgress);
      
      const updatedUser = { ...user, progress: newProgress };
      setUser(updatedUser);
      localStorage.setItem('kongenga_user', JSON.stringify(updatedUser));
      
      return newProgress;
    } catch (error) {
      console.error('Update progress error:', error);
      throw new Error(handleAPIError(error, 'Failed to update progress'));
    }
  };

  const updateProfile = async (profileData) => {
    if (!user) return;

    try {
      const updatedUser = await usersAPI.updateProfile(profileData);
      setUser(updatedUser);
      localStorage.setItem('kongenga_user', JSON.stringify(updatedUser));
      
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: handleAPIError(error, 'Failed to update profile') };
    }
  };

  const refreshUserData = async () => {
    if (!user) return;

    try {
      const userData = await usersAPI.getProfile();
      setUser(userData);
      localStorage.setItem('kongenga_user', JSON.stringify(userData));
      
      // Refresh favorites
      const favoritesData = await usersAPI.getFavorites();
      setFavorites(favoritesData.favorites.map(job => job.id));
      
      return userData;
    } catch (error) {
      console.error('Refresh user data error:', error);
      throw new Error(handleAPIError(error, 'Failed to refresh user data'));
    }
  };

  const value = {
    user,
    loading,
    favorites,
    login,
    register,
    logout,
    toggleFavorite,
    isFavorite,
    updateProgress,
    updateProfile,
    refreshUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};