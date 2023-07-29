
import { PermissionsAndroid } from 'react-native';

export const requestLocationPermission = async () =>
{
    try
    {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Geolocation Permission',
                message: 'Can we access your location?',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === 'granted')
        {
            return true;
        } else
        {
            return false;
        }
    } catch (err)
    {
        return false;
    }
};