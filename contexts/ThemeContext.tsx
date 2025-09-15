import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useColorScheme } from 'react-native';

interface ThemeColors {
  background: string;
  card: string;
  text: string;
  secondaryText: string;
  border: string;
  primary: string;
  primaryTransparent: string;
  input: string;
  error: string;
  success: string;
  warning: string;
  white: string;
  black: string;
  lightGray: string;
  progressBackground: string;
}

interface ThemeContextType {
  colors: ThemeColors;
  isDark: boolean;
  toggleTheme: () => void;
}

const darkColors: ThemeColors = {
  background: '#121212',
  card: '#1E1E1E',
  text: '#FFFFFF',
  secondaryText: '#B3B3B3',
  border: '#2A2A2A',
  primary: '#1DB954',
  primaryTransparent: 'rgba(29, 185, 84, 0.2)',
  input: '#2A2A2A',
  error: '#E74C3C',
  success: '#2ECC71',
  warning: '#F39C12',
  white: '#FFFFFF',
  black: '#000000',
  lightGray: '#B3B3B3',
  progressBackground: 'rgba(255, 255, 255, 0.2)',
};

const lightColors: ThemeColors = {
  background: '#F8F8F8',
  card: '#FFFFFF',
  text: '#191414',
  secondaryText: '#737373',
  border: '#E0E0E0',
  primary: '#1DB954',
  primaryTransparent: 'rgba(29, 185, 84, 0.1)',
  input: '#F0F0F0',
  error: '#E74C3C',
  success: '#2ECC71',
  warning: '#F39C12',
  white: '#FFFFFF',
  black: '#000000',
  lightGray: '#B3B3B3',
  progressBackground: 'rgba(0, 0, 0, 0.1)',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState<boolean>(systemColorScheme === 'dark');
  
  useEffect(() => {
    setIsDark(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ colors, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};