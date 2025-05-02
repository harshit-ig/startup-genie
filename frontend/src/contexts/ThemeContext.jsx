import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const ThemeContext = createContext(null);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  // Check for saved theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newThemeValue = !isDark;
    setIsDark(newThemeValue);
    localStorage.setItem('theme', newThemeValue ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ 
      isDark, 
      toggleTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 