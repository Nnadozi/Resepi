import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from 'react';
import { useColorScheme, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NavigationBar from 'expo-navigation-bar';
import { MyLightTheme, MyDarkTheme } from '../constants/Colors';

type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  currentTheme: typeof MyLightTheme | typeof MyDarkTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeType>('system');
  const systemTheme = useColorScheme();

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setThemeState(savedTheme as ThemeType);
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    const updateNavigationBar = async () => {
      if (Platform.OS !== 'android') return;

      const activeTheme = theme === 'system' ? systemTheme : theme;
      const isDark = activeTheme === 'dark';

      try {
        await NavigationBar.setBackgroundColorAsync(
          isDark ? MyDarkTheme.colors.background : MyLightTheme.colors.background
        );
        await NavigationBar.setButtonStyleAsync(isDark ? 'light' : 'dark');
      } catch (err) {
        console.warn('Failed to style navigation bar:', err);
      }
    };

    updateNavigationBar();
  }, [theme, systemTheme]);

  const setTheme = async (newTheme: ThemeType) => {
    try {
      await AsyncStorage.setItem('theme', newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  const currentTheme = useMemo(() => {
    const activeTheme = theme === 'system' ? systemTheme : theme;
    return activeTheme === 'dark' ? MyDarkTheme : MyLightTheme;
  }, [theme, systemTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
