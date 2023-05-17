import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/login/Login';
import HomeScreen from './src/screens/home/Home';

import SplashScreen from 'react-native-splash-screen'


const Stack = createNativeStackNavigator();

const App = () =>
{
  useEffect(() =>
  {
    setTimeout(() =>
    {
      SplashScreen.hide()
    }, 1000);
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen}
          options={{
            title: 'Kaam',
            headerShown: false,
          }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
