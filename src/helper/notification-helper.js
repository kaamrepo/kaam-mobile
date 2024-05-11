// import messaging from '@react-native-firebase/messaging';
// import {PermissionsAndroid} from 'react-native';

// async function requestUserPermission() {
//   PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//   }
// }
// export default requestUserPermission;

import {Platform, PermissionsAndroid} from 'react-native';

import messaging from '@react-native-firebase/messaging';
import EncryptedStorage from 'react-native-encrypted-storage';

const Platforms = {
  ANDROID: 'android',
  iOS: 'ios',
  WINDOWS: 'windows',
  MACOS: 'macos',
  WEB: 'web',
};

export async function requestUserPermissionAndFcmToken() {
  switch (Platform.OS) {
    case Platforms.iOS:
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
      return await getFCMToken();

    case Platforms.ANDROID:
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      return await getFCMToken();

    default:
      return false;
  }
}

export async function getFCMToken() {
  let fcmToken = await EncryptedStorage.getItem('fcmToken');

  if (!fcmToken) {
    try {
      const newFcmToken = await messaging().getToken();
      if (newFcmToken) {
        await EncryptedStorage.setItem('fcmToken', newFcmToken);
        return {fcmToken: newFcmToken, new: true};
      }
    } catch (error) {
      console.log(
        'error in storing fcm token in async storage',
        JSON.stringify(error),
      );

      return {fcmToken: '', new: false};
    }
  } else {
    console.log('FCM TOKEN', fcmToken);
    return {fcmToken, new: false};
  }
}
