import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

export const requestLocationPermission = async () => {
  try {
    // Determine the appropriate location permission based on the platform
    const locationPermission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    // Check the current status of the location permission
    let permissionStatus = await check(locationPermission);

    // If the permission is already granted, log a message and return true
    if (permissionStatus === RESULTS.GRANTED) {
      console.log('geo location permission already granted');
      return true;
    }

    // If the permission is not granted, request the permission
    const requestResult = await request(locationPermission, {
      title: 'Geolocation Permission',
      message: 'Can we access your location to suggest nearest job/staff',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    });

    // Check the result of the permission request
    if (requestResult === RESULTS.GRANTED) {
      console.log('Permission granted');
      return true;
    } else {
      console.log('Permission denied');

      // Check the permission status again to reevaluate
      permissionStatus = await check(locationPermission);

      return false;
    }
  } catch (err) {
    // Handle errors, log an error message, and return false
    console.error('Error checking/requesting location permission:', err);
    return false;
  }
};

export const getCoordinates = async () => {
  try {
    const permissionGranted = await requestLocationPermission();

    if (permissionGranted) {
      const position = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
        });
      });

      return position;
    } else {
      console.log('Permission denied');
      return null;
    }
  } catch (error) {
    console.error('Error getting coordinates:', error);
    return null;
  }
};
