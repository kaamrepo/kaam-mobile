import React, {useEffect} from 'react';
import {Text, TouchableOpacity, Linking, Platform, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import Svg, {Path} from 'react-native-svg';
import useLoginStore from '../../store/authentication/login.store';
import BottomTabNavigation from '../BottomTabNavigation';
export const ContactSupport = () => {
  const {getAppConfig, appconfig, loggedInUser} = useLoginStore();
  useEffect(() => {
    getAppConfig();
  }, []);
  const sendEmail = async () => {
    let email = appconfig.supportemail[0]; // Replace with your email address
    let subject = `Contact Support - ${loggedInUser?.firstname} ${loggedInUser?.lastname} - ${loggedInUser?.phone}`;
    let body = 'Hello, I need assistance with my account.';
    const url = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    await Linking.openURL(url);
  };

  // Function to call a phone number
  const callPhoneNumber = phone => {
    let phoneNumber = phone; // Replace with your phone number
    const url =
      Platform.OS === 'android'
        ? `tel:${phoneNumber}`
        : `telprompt:${phoneNumber}`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={tw`flex-1 p-4 px-5 bg-[#FAFAFD]`}>
      <Text style={tw`text-center text-xl font-bold mb-4`}>
        Contact & Support
      </Text>

      {/* Office Hours */}
      <Text style={[tw`mb-4`, {fontFamily: 'Poppins-Regular'}]}>
        Office Hours: Monday to Saturday | 9 AM - 6 PM
      </Text>
      <Text style={[tw`mb-4`, {fontFamily: 'Poppins-Regular'}]}>
        Address - Tales on wood office & manufacturing unit, Xrbia road nerhe,
        dattawadi, Hinjewadi, Pune, Maharashtra 411033
      </Text>

      {/* Email Button */}
      <TouchableOpacity
        style={tw`w-full h-12 mb-4 items-center justify-center rounded-lg bg-emerald-500`}
        onPress={sendEmail}>
        <Text style={[tw`text-white text-lg`, {fontFamily: 'Poppins-Regular'}]}>
          Send Email
        </Text>
      </TouchableOpacity>

      {/* Phone Number Button */}

      {appconfig.supportphone?.map((phoneNumber, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={tw`h-12 flex flex-row items-center justify-center`}
            onPress={() => callPhoneNumber(phoneNumber)}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 24 24">
              <Path d="M15.2 22.001c-.249 0-.501-.016-.753-.048-2.697-.341-5.284-1.733-7.69-4.14-2.406-2.405-3.798-4.992-4.14-7.69-.284-2.247.724-4.434 2.633-5.706l3.049-2.032 4.822 4.822-3.154 3.154c.134.411.55 1.312 1.74 2.503 1.19 1.19 2.091 1.605 2.522 1.747l3.135-3.161 4.822 4.822-2.033 3.049c-1.129 1.695-2.979 2.68-4.953 2.68zM8.044 4.959 6.359 6.081c-1.253.836-1.943 2.324-1.757 3.791.284 2.247 1.485 4.443 3.569 6.527 2.085 2.085 4.281 3.286 6.527 3.569 1.473.188 2.956-.503 3.791-1.757l1.123-1.686-2.248-2.248-1.74 1.739a1.979 1.979 0 0 1-2.02.494c-.732-.241-1.902-.824-3.312-2.233-1.408-1.407-1.991-2.577-2.232-3.31a1.977 1.977 0 0 1 .494-2.02l1.74-1.74-2.25-2.248z" />
            </Svg>
            <Text style={[tw`ml-2`, {fontFamily: 'Poppins-Regular'}]}>
              {phoneNumber}
            </Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity onPress={callPhoneNumber}>
        <Text style={tw`text-white text-lg`}>Call Us</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
