import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#42b9f5', 
  },
};

export const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#42b9f5',
  },
};
