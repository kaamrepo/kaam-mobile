import React, {useEffect} from 'react';
import {View, Text, Image, ScrollView, useColorScheme} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import useLoginStore from '../../store/authentication/login.store';
import useRegistrationStore from '../../store/authentication/registration.store';
import useUsersStore from '../../store/authentication/user.store';
import {requestUserPermissionAndFcmToken} from '../../helper/notification-helper';
import EncryptedStorage from 'react-native-encrypted-storage';
import {getCoordinates} from '../../helper/utils/getGeoLocation';
import {OtpInput} from 'react-native-otp-entry';

const VerifyCode = () => {
  const colorScheme = useColorScheme();
  const {login, storeUserCoordinate} = useLoginStore();
  const {loginDetails} = useRegistrationStore();
  const {updateFcmDeviceToken} = useUsersStore();

  const handleVerify = async code => {
    const success = await login(code);
    if (success) {
      const fcmToken = await EncryptedStorage.getItem('fcmToken');
      if (fcmToken) {
        updateFcmDeviceToken({
          firebasetokens: [fcmToken],
        });
      }
      // Store coordinates Here
      try {
        const position = await getCoordinates();
        console.log('poisition to get after verify', position);
        if (position?.length !== 0) {
          storeUserCoordinate(position);
        }
      } catch (error) {
        console.log('VerifyCode:handeVerify:tryCatch:error', error);
      }
    }
  };

  useEffect(() => {
    (async () => {
      await requestUserPermissionAndFcmToken();
    })();
  }, []);

  return (
    <ScrollView
      style={tw`bg-white dark:bg-gray-950`}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      <SafeAreaView style={tw`flex-1 py-0`}>
        <View style={tw`flex-1 py-2 gap-6 justify-start items-center`}>
          <View style={[tw`bg-white p-3 rounded-full`]}>
            <Image
              source={require('../../assets/images/kaam-logo-verify-code.png')}
              style={[tw`w-14 h-14`, {height: 100, width: 100}]}
              resizeMode="contain"
            />
          </View>
          <Text
            style={[
              tw`text-black dark:text-white text-3xl`,
              {fontFamily: 'Poppins-Bold'},
            ]}>
            Verify One-Time-Password
          </Text>
          <Text
            style={[
              tw`text-black dark:text-white text-3xl`,
              {fontFamily: 'Poppins-Bold'},
            ]}>
            (OTP)
          </Text>
          <Text
            style={[
              tw`my-2 text-sm leading-relaxed text-center text-gray-600 dark:text-gray-300`,
              {fontFamily: 'Poppins-SemiBold'},
            ]}>
            Enter verification code received on your phone {'\n\n'}
            {loginDetails?.dialcode} {loginDetails?.phone}
          </Text>
          <View style={tw`w-full flex-row justify-center my-5 py-5`}>
            <OtpInput
              numberOfDigits={4}
              focusColor=" rgb(5, 150, 105)"
              focusStickBlinkingDuration={500}
              onFilled={text => {
                handleVerify(text);
              }}
              textInputProps={{
                accessibilityLabel: 'One-Time Password',
              }}
              secureTextEntry
              theme={{
                containerStyle: [tw`w-2/3`],
                pinCodeContainerStyle: [tw`w-15 h-15`],
                filledPinCodeContainerStyle: {
                  backgroundColor:
                    colorScheme === 'dark' ? '#0f172a' : '#e2e8f0',
                  borderColor: '#6ee7b7',
                },
                pinCodeTextStyle: {
                  color: colorScheme === 'dark' ? '#e2e8f0' : '#0f172a',
                },
                focusStickStyle: [tw`text-emerald-600`],
                focusedPinCodeContainerStyle: [tw`border-emerald-300`],
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
export default VerifyCode;
