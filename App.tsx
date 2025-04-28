import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MyText from './components/MyText';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNav from './navigation/AuthNav';
import MainNav from './navigation/MainNav';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='MainNav' component={MainNav} />
        <Stack.Screen name='AuthNav' component={AuthNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

