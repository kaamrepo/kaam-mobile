// import {PermissionsAndroid} from 'react-native';

// export const requestLocationPermission = async () => {
//   console.log('asking permission');
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: 'Geolocation Permission',
//         message: 'Can we access your location?',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       },
//     );
//     if (granted === 'granted') {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (err) {
//     return false;
//   }
// };

import { Platform } from 'react-native';
// import { check, request, PERMISSIONS, RESULTS } from '@react-native-community/permissions';
import {check,request,PERMISSIONS, RESULTS} from 'react-native-permissions';


export const requestLocationPermission = async () => {
  console.log('asking permission');

  try {
    // Determine the appropriate location permission based on the platform
    const locationPermission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    // Check the current status of the location permission
    const permissionStatus = await check(locationPermission);

    // If the permission is already granted, log a message and return true
    if (permissionStatus === RESULTS.GRANTED) {
      console.log('Permission already granted');
      return true;
    }

    // If the permission is not granted, request the permission
    const requestResult = await request(locationPermission);

    // Check the result of the permission request
    if (requestResult === RESULTS.GRANTED) {
      console.log('Permission granted');
      return true;
    } else {
      console.log('Permission denied');
      return false;
    }
  } catch (err) {
    // Handle errors, log an error message, and return false
    console.error('Error checking/requesting location permission:', err);
    return false;
  }
};
