import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  Keyboard,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';

import useLoginStore from '../../store/authentication/login.store';
import useRegistrationStore from '../../store/authentication/registration.store';
import useUsersStore from '../../store/authentication/user.store';
import { requestUserPermissionAndFcmToken } from '../../helper/notification-helper';
import EncryptedStorage from 'react-native-encrypted-storage';
import { getCoordinates } from '../../helper/utils/getGeoLocation';

const VerifyCode = () => {
  const codeInputs = useRef([]);
  const [code, setCode] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const {login,storeUserCoordinate} = useLoginStore();
  const {loginDetails} = useRegistrationStore();
  const {updateFcmDeviceToken} = useUsersStore();

  const handleCodeInput = (index, text) => {
    const newCode = code.substr(0, index) + text + code.substr(index + 1);
    setCode(newCode);
    if (text.length === 1 && index < codeInputs.current.length - 1) {
      codeInputs.current[index + 1].focus();
    } else if (text.length === 0 && index > 0) {
      codeInputs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const success = await login(code);
    if (success) {
      const fcmToken = await EncryptedStorage.getItem('fcmToken');
      // Store coordinates Here
      const position = await getCoordinates();
      console.log("poisition to get after verify",position);
      if (position?.length !== 0) {
        storeUserCoordinate(position)
      }
      if (fcmToken) {
        updateFcmDeviceToken({
          firebasetokens: [fcmToken],
        });
      }
    }
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    (async () => {
      await requestUserPermissionAndFcmToken();
    })();
  }, []);

  return (
    <ScrollView
      style={tw`bg-white`}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      <SafeAreaView style={tw`flex-1 bg-white py-0`}>
        <View style={tw`flex-1 py-2 justify-start items-center`}>
          <View style={tw`flex`}>
            <Image
              source={require('../../assets/images/kaam-logo-verify-code.png')}
              style={[tw`w-14 h-14`, {height: 100, width: 100}]}
              resizeMode="contain"
            />
          </View>
          <Text style={tw`mt-10 font-bold text-black text-4xl`}>
            Verify Code
          </Text>
          <Text style={tw`py-5 text-sm leading-relaxed text-gray-600`}>
            Enter verification code received on your phone
          </Text>
          <Text style={tw`py-2 text-sm leading-relaxed text-gray-600`}>
            {loginDetails?.dialcode} {loginDetails?.phone}
          </Text>
          <View style={tw`flex-1 mt-15`}>
            <View style={tw`flex flex-row justify-center items-center`}>
              {[0, 1, 2, 3].map(index => (
                <TextInput
                  key={index}
                  ref={ref => (codeInputs.current[index] = ref)}
                  style={[
                    {fontFamily: 'Poppins-SemiBold'},
                    tw`border border-gray-300 text-black rounded-md border-emerald-400 w-12 h-12 mx-2 text-center`,
                  ]}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={text => {
                    handleCodeInput(index, text);
                    setIsKeyboardOpen(true);
                  }}
                />
              ))}
            </View>
            <Pressable
              onPress={handleVerify}
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#418c4d' : '#4A9D58',
                },
                tw`px-8 py-2 ${
                  isKeyboardOpen ? 'mt-10' : 'mt-15'
                } flex justify-center items-center rounded-xl`,
              ]}>
              {({pressed}) => (
                <Text style={tw`text-white text-[24px] py-2 font-medium`}>
                  Verify
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
export default VerifyCode;
