import 'react-native-gesture-handler';
import {StyleSheet, Pressable, ActivityIndicator, View} from 'react-native';
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
import VerifyCode from './src/screens/login/VerifyCode';
import ChooseProfession from './src/screens/login/ChooseProfession';
import SplashScreen from 'react-native-splash-screen';
import LoginScreen from './src/screens/login/Login';
import JobPreference from './src/screens/login/JobPreference';
import Icon, {Icons} from './src/components/Icons';
import tw from 'twrnc';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import JobSelection from './src/screens/login/JobSelection';
import ApplyNow from './src/screens/jobs/ApplyNow';
import Chat from './src/screens/chats/Chat';
import TrackApplication from './src/screens/chats/TrackApplication';
import DrawerNavigation from './src/screens/DrawerNavigation';
import SeeAll from './src/screens/see-all/SeeAll';
import {ApplicantListScreen} from './src/screens/jobs/Applicants';
import client from './client';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

const Stack = createNativeStackNavigator();
const App = () => {
  const {isLoggedIn, setLoggedInUserDetails, getLanguage} = useLoginStore();

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

  useEffect(() => {
    /**
     * handles Foreground state notifications
     */

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
      console.log('ForeGround Notification handler', remoteMessage);

      const {notification, data} = remoteMessage;
      await notifee.displayNotification({
        title: notification.title,
        body: notification.body,
        android: {
          channelId,
          smallIcon:"ic_notification"
        },
      });
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    /**
     * handles Background state notifications
     */
    const unsubscribe = messaging().onNotificationOpenedApp(
      async remoteMessage => {
        console.log('Background Notification handler', remoteMessage);
      },
    );
    return unsubscribe;
    // setBackgroundMessageHandler
  }, []);
  useEffect(() => {
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        console.log('HEADLESS BACKGROUND: ' + JSON.stringify(remoteMessage));
      },
    );
    return unsubscribe;
    // setBackgroundMessageHandler
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'DrawerNavigation'}
          keyboardHandlingEnabled={true}>
          {!isLoggedIn ? (
            <>
              <Stack.Screen
                name="IntroSelectLanguage"
                component={IntroSelectLanguage}
                options={{title: 'Kaam', headerShown: false}}
              />
              <Stack.Screen
                name="registerScreen"
                component={RegisterScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="VerifyCode"
                component={VerifyCode}
                options={{headerShown: true}}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="ChooseProfession"
                component={ChooseProfession}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Chat"
                component={Chat}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="TrackApplication"
                component={TrackApplication}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="JobPreference"
                component={JobPreference}
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
                          name="chevron-back"
                          color="#000000"
                        />
                      )}
                    </Pressable>
                  ),
                  headerTransparent: false,
                  headerTitleAlign: 'center',
                  headerShadowVisible: false,
                  headerTitleStyle: {
                    color: '#202121',
                    fontSize: 18,
                    fontFamily: 'Poppins-SemiBold',
                  },
                  headerTitle: 'Job Preferences', // Remove the title
                  headerShown: true,
                })}
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
                name="DrawerNavigation"
                component={DrawerNavigation}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SeeAll"
                component={SeeAll}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ApplicantListScreen"
                component={ApplicantListScreen}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} position="bottom" />
      {/* <View
        style={[
          tw`z-50 absolute top-0 left-0 right-0 bottom-0 justify-center items-center ${
            isLoading ? 'flex' : 'hidden'
          }`,
        ]}>
        <ActivityIndicator size={60} animating={isLoading} color="#00cc66" />
      </View> */}
    </>
  );
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
