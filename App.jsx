import 'react-native-gesture-handler';
import {
  StyleSheet,
  Pressable,
  ActivityIndicator,
  View,
  useColorScheme,
} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useLoginStore, {
  retrieveLoggedInState,
  retrieveUserSession,
} from './src/store/authentication/login.store';
// Screens

import RegisterScreen from './src/screens/login/RegisterScreen';
import IntroSelectLanguage from './src/screens/intro/IntroSelectLanguage';
import {SeeAllStaffs} from './src/screens/dashboard/components/staff/SeeAllStaffs';
import VerifyCode from './src/screens/login/VerifyCode';
import ChooseProfession from './src/screens/login/ChooseProfession';
import SplashScreen from 'react-native-splash-screen';
import LoginScreen from './src/screens/login/Login';
import JobPreference from './src/screens/login/JobPreference';
import Icon, {Icons} from './src/components/Icons';
import tw from 'twrnc';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import JobSelection from './src/screens/login/JobSelection';
import ApplyNow from './src/screens/job-application/ApplyNow';
import Chat from './src/screens/chats/Chat';
import TrackApplication from './src/screens/chats/TrackApplication';
import DrawerNavigation from './src/screens/DrawerNavigation';
import { SeeAllJobs } from './src/screens/dashboard/components/jobs/SeeAllJobs';
import {EngagmentInitiation} from './src/screens/job-application/EngagmentInitiation';
import EmployeeDetails from './src/screens/job-application/EmployeeDetails';
import JobPostingForm from './src/screens/bottom-bar/JobPostingForm';
import {ApplicantListScreen} from './src/screens/job-application/Applicants';
import { ContactSupport } from './src/screens/drawer-screens/ContactSupport';
import { TermsAndConditions } from './src/screens/drawer-screens/settings/TermsAndConditions';
import { AboutUs } from './src/screens/drawer-screens/AboutUs';
import client from './client';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {HeaderBanner} from './src/components/HeaderBanner';
import {useDeviceContext, useAppColorScheme} from 'twrnc';

const Stack = createNativeStackNavigator();
const App = () => {
  useDeviceContext(tw, {
    observeDeviceColorSchemeChanges: true,
    initialColorScheme: 'light', // 'light' | 'dark' | 'device'
  });

  const colorScheme = useColorScheme();
  const [twColorScheme, toggleColorScheme, setColorScheme] =
    useAppColorScheme(tw);

  useEffect(() => {
    setColorScheme(colorScheme);
  }, [colorScheme]);

  const {isLoggedIn, loggedInUser, setLoggedInUserDetails, getLanguage} =
    useLoginStore();

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);

    const getData = async () => {
      const isLoggedInState = await retrieveLoggedInState();
      const userSession = await retrieveUserSession();

      if (isLoggedInState && isLoggedInState.isLoggedIn) {
        const userData = JSON.parse(userSession);
        setLoggedInUserDetails(userData.user, isLoggedInState.isLoggedIn);
        try {
          await client.reAuthenticate();
        } catch (error) {
          console.log('client error', error);
        }
      }
    };
    getData();

    getLanguage();
  }, [isLoggedIn]);

  async function onMessageReceived(message) {
    await notifee.requestPermission();
    try {
      const notifyObj = JSON.parse(message.data.notifee);
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Important Notifications',
        importance: AndroidImportance.HIGH,
      });

      notifyObj.android.channelId = channelId;

      await notifee.displayNotification(notifyObj);
    } catch (error) {
      console.log('notifee.displayNotification', error);
    }
  }

  useEffect(() => {
    const message1 = messaging().onMessage(onMessageReceived);

    return message1;
  }, []);
  useEffect(() => {
    const message2 = messaging().setBackgroundMessageHandler(onMessageReceived);

    return message2;
  }, []);

  useEffect(() => {
    const backgroundNotifeeUnsubscribe = notifee.onBackgroundEvent(
      async remoteMessage => {
        console.log(
          'HEADLESS BACKGROUND: Notifee ' + JSON.stringify(remoteMessage),
        );
      },
    );
    return backgroundNotifeeUnsubscribe;
  }, []);

  if (!isLoggedIn) {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator
            keyboardHandlingEnabled={true}
            initialRouteName="IntroSelectLanguage">
            <Stack.Screen
              name="IntroSelectLanguage"
              component={IntroSelectLanguage}
              options={{
                title: 'Kaam',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: 'Login',
                headerShown: true,
                headerStyle: [tw`bg-white dark:bg-slate-900`],
                headerTitleStyle: [tw` text-black dark:text-white`],
              }}
            />
            <Stack.Screen
              name="registerScreen"
              component={RegisterScreen}
              options={{
                title: 'Register',
                headerShown: true,
                headerStyle: [tw`bg-white dark:bg-slate-900`],
                headerTitleStyle: [tw` text-black dark:text-white`],
              }}
            />
            <Stack.Screen
              name="VerifyCode"
              component={VerifyCode}
              options={{
                title: 'Verify Code',
                headerShown: true,
                headerStyle: [tw`bg-white dark:bg-slate-900`],
                headerTitleStyle: [tw` text-black dark:text-white`],
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast config={toastConfig} position="bottom" />
      </>
    );
  }
  if (isLoggedIn && !Array.isArray(loggedInUser?.tags)) {
    console.log('inside isLoggedIn && Array.isArray(loggedInUser?.tags)');
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator
            keyboardHandlingEnabled={true}
            initialRouteName="JobPreference">
            <Stack.Screen
              name="JobPreference"
              component={JobPreference}
              options={{title: 'Kaam', headerShown: false}}
            />
            <Stack.Screen
              name="ChooseProfession"
              component={ChooseProfession}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast config={toastConfig} position="bottom" />
      </>
    );
  }
  if (isLoggedIn && Array.isArray(loggedInUser?.tags)) {
    console.log('inside isLoggedIn && Array.isArray(loggedInUser?.tags)');

    return (
      <>
        <NavigationContainer>
          <Stack.Navigator
            keyboardHandlingEnabled={true}
            initialRouteName="DrawerNavigation">
            <Stack.Screen
              name="DrawerNavigation"
              component={DrawerNavigation}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Chat"
              component={Chat}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EngagmentInitiation"
              component={EngagmentInitiation}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EmployeeDetails"
              component={EmployeeDetails}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="HeaderBanner"
              component={HeaderBanner}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="JobPostingForm"
              component={JobPostingForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="TrackApplication"
              component={TrackApplication}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="JobSelection"
              component={JobSelection}
              options={({navigation}) => ({
                headerLeft: () => (
                  <Pressable
                    onPress={() => {
                      navigation.goBack();
                    }}
                    style={({pressed}) => [
                      tw`rounded-full w-8 h-8 flex items-center justify-center ${
                        pressed ? 'bg-gray-500/30' : ''
                      }`,
                    ]}>
                    {({pressed}) => (
                      <Icon
                        type={Icons.Ionicons}
                        name="close"
                        color="#000000"
                        size={30}
                      />
                    )}
                  </Pressable>
                ),
                headerTransparent: true,
                headerShadowVisible: false,
                headerTitle: '', // Remove the title
                headerShown: true,
              })}
            />
            <Stack.Screen
              name="ApplyNow"
              component={ApplyNow}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="SeeAllJobs"
              component={SeeAllJobs}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SeeAllStaffs"
              component={SeeAllStaffs}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ContactSupport"
              component={ContactSupport}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="TermsAndConditions"
              component={TermsAndConditions}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AboutUs"
              component={AboutUs}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ApplicantListScreen"
              component={ApplicantListScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast config={toastConfig} position="bottom" />
      </>
    );
  }
};

export default App;

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'green', backgroundColor: '#22b556'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
        color: 'white',
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: props => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  tomatoToast: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: '#ff0000', backgroundColor: '#ffa3a3'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        color: 'black',
        fontSize: 13,
        fontWeight: '400',
      }}
      text2Style={{
        color: 'black',
        fontSize: 11,
        fontWeight: '400',
      }}
    />
  ),
};
