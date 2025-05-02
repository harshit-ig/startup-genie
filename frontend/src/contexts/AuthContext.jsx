import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const AuthContext = createContext(null);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (email, password, rememberMe) => {
    try {
      // Simulate API call
      // In a real app, this would be an actual API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login for demo purposes
      if (email === 'demo@example.com' && password === 'password123') {
        const userData = {
          id: '1',
          name: 'Demo User',
          email,
          role: 'user'
        };
        
        // Save to localStorage if rememberMe is enabled
        if (rememberMe) {
          localStorage.setItem('token', 'dummy-token-12345');
          localStorage.setItem('user', JSON.stringify(userData));
        }
        
        setUser(userData);
        setIsAuthenticated(true);
        
        return { success: true };
      }
      
      // Mock login failure
      return { 
        success: false, 
        error: 'Invalid email or password. Hint: Use demo@example.com / password123' 
      };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      loading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 