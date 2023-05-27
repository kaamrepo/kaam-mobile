import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/home/Home';
import IntroSelectLanguage from './src/screens/intro/IntroSelectLanguage';
import IntroScreenJobsAndInvitations from './src/screens/intro/IntroScreenJobsAndInvitations';
import Intro_job_search from './src/screens/intro/Intro_job_search';

import SplashScreen from 'react-native-splash-screen'
import IntroScreenBrowseJobs from './src/screens/intro/IntroScreenBrowseJobs';

import LoginScreen from "./src/screens/login/Login"
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
      <Stack.Navigator initialRouteName='IntroSelectLanguage'>
        <Stack.Screen name="IntroSelectLanguage" component={IntroSelectLanguage}
          options={{
            title: 'Kaam',
            headerShown: false,
          }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Intro_job_search" component={Intro_job_search} options={{
          title: 'search-dream-job',
          headerShown: false,
        }} />
        <Stack.Screen name="IntroScreenBrowseJobs"
          component={IntroScreenBrowseJobs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="IntroScreenJobsAndInvitations"
          component={IntroScreenJobsAndInvitations}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
