import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens

import RegisterScreen from './src/screens/login/RegisterScreen';
import IntroSelectLanguage from './src/screens/intro/IntroSelectLanguage';
import IntroScreenJobsAndInvitations from './src/screens/intro/IntroScreenJobsAndInvitations';
import LastIntroScreen from './src/screens/intro/LastIntroScreen';
import IntroJobSearch from './src/screens/intro/IntroJobSearch';
import VerifyCode from './src/screens/login/VerifyCode';
import ChooseProfession from './src/screens/login/ChooseProfession';
import SplashScreen from 'react-native-splash-screen'
import IntroScreenBrowseJobs from './src/screens/intro/IntroScreenBrowseJobs';
import LoginScreen from "./src/screens/login/Login"
import BottomTabNavigation from './src/screens/BottomTabNavigation';
import ApplyNow from './src/screens/jobs/ApplyNow';
import Dashboard from './src/screens/dashboard/Dashboard';

// Navigators

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
      <Stack.Navigator initialRouteName='VerifyCode'>
        <Stack.Screen name="IntroSelectLanguage" component={IntroSelectLanguage}
          options={{
            title: 'Kaam',
            headerShown: false,
          }}
        />
        <Stack.Screen name="IntroJobSearch" component={IntroJobSearch} options={{
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
        <Stack.Screen name="lastIntroScreen"
          component={LastIntroScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="registerScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="VerifyCode"
          component={VerifyCode}
          options={{
            headerShown: true,

          }}
        />
        <Stack.Screen name="ChooseProfession"
          component={ChooseProfession}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BottomTabNavigation"
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ApplyNow"
          component={ApplyNow}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
