import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SystemUI from 'expo-system-ui';
import { MyLightTheme, MyDarkTheme } from '../constants/Colors';

type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  currentTheme: typeof MyLightTheme | typeof MyDarkTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemTheme = useColorScheme();
  const [theme, setThemeState] = useState<ThemeType>('system');

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
          setThemeState(savedTheme);
        } else {
          setThemeState('system');
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
        setThemeState('system');
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    const updateSystemUI = async () => {
      const activeTheme = theme === 'system' ? systemTheme : theme;
      const backgroundColor =
        activeTheme === 'dark'
          ? MyDarkTheme.colors.background
          : MyLightTheme.colors.background;

      try {
        await SystemUI.setBackgroundColorAsync(backgroundColor);
      } catch (err) {
        console.warn('Failed to set system UI background color:', err);
      }
    };

    updateSystemUI();
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
