import React, { createContext, useContext, useState, useEffect } from 'react';
import { users } from '../data/mockData';

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
    const storedUser = localStorage.getItem('drc_careers_user');
    const storedFavorites = localStorage.getItem('drc_careers_favorites');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password, userType = 'student') => {
    try {
      // Mock authentication
      let mockUser = null;
      
      if (userType === 'student') {
        mockUser = users.students.find(u => u.email === email);
        if (!mockUser) {
          // Create new student user for demo
          mockUser = {
            id: `student_${Date.now()}`,
            name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
            email,
            university: 'University of Kinshasa',
            year: 'Third Year',
            field: 'General Studies',
            favoriteJobs: [],
            progress: {
              profileComplete: 30,
              jobsExplored: 0,
              trainingsStarted: 0,
              skillsAssessed: 0
            },
            role: 'student'
          };
        } else {
          mockUser.role = 'student';
        }
      } else if (userType === 'manager') {
        if (email === 'admin@careerplatform.cd' && password === 'admin123') {
          mockUser = {
            ...users.managers[0],
            role: 'site_manager'
          };
        }
      }

      if (mockUser) {
        setUser(mockUser);
        localStorage.setItem('drc_careers_user', JSON.stringify(mockUser));
        
        // Load user's favorites
        if (mockUser.favoriteJobs) {
          setFavorites(mockUser.favoriteJobs);
          localStorage.setItem('drc_careers_favorites', JSON.stringify(mockUser.favoriteJobs));
        }
        
        return { success: true, user: mockUser };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      // Mock registration
      const newUser = {
        id: `student_${Date.now()}`,
        name: userData.name,
        email: userData.email,
        university: userData.university || 'University of Kinshasa',
        year: userData.year || 'First Year',
        field: userData.field || 'General Studies',
        favoriteJobs: [],
        progress: {
          profileComplete: 50,
          jobsExplored: 0,
          trainingsStarted: 0,
          skillsAssessed: 0
        },
        role: 'student'
      };

      setUser(newUser);
      localStorage.setItem('drc_careers_user', JSON.stringify(newUser));
      
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    localStorage.removeItem('drc_careers_user');
    localStorage.removeItem('drc_careers_favorites');
  };

  const toggleFavorite = (jobId) => {
    let newFavorites;
    if (favorites.includes(jobId)) {
      newFavorites = favorites.filter(id => id !== jobId);
    } else {
      newFavorites = [...favorites, jobId];
    }
    
    setFavorites(newFavorites);
    localStorage.setItem('drc_careers_favorites', JSON.stringify(newFavorites));
    
    // Update user data
    if (user) {
      const updatedUser = { ...user, favoriteJobs: newFavorites };
      setUser(updatedUser);
      localStorage.setItem('drc_careers_user', JSON.stringify(updatedUser));
    }
  };

  const isFavorite = (jobId) => {
    return favorites.includes(jobId);
  };

  const updateProgress = (progressUpdate) => {
    if (user) {
      const updatedUser = {
        ...user,
        progress: { ...user.progress, ...progressUpdate }
      };
      setUser(updatedUser);
      localStorage.setItem('drc_careers_user', JSON.stringify(updatedUser));
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
    updateProgress
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};