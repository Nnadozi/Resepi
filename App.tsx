import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import AuthNav from './navigation/AuthNav';
import MainNav from './navigation/MainNav';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './localization/il18n';

const AppContent = () => {
  const { currentTheme } = useTheme();
  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer theme={currentTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
          <Stack.Screen name="MainNav" component={MainNav} />
          <Stack.Screen name="AuthNav" component={AuthNav} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}