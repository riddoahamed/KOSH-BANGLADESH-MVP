import React, { createContext, useContext, useState, useEffect } from 'react';
import colors from './colors';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('kosh-theme');
    return saved ? JSON.parse(saved) : true; // Default to dark theme
  });

  useEffect(() => {
    localStorage.setItem('kosh-theme', JSON.stringify(isDark));
    document.body.className = isDark ? 'dark-theme' : 'light-theme';
  }, [isDark]);

  const theme = isDark ? colors.dark : colors.light;

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;