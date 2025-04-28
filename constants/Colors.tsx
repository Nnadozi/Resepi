import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#669cf2',
  },
};

export const customLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#669cf2', 
  },
};