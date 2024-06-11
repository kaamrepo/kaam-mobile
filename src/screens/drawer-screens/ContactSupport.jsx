import React, {useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  Linking,
  Platform,
  View,
  useColorScheme,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import useLoginStore from '../../store/authentication/login.store';
import GeneralStatusBar from '../../components/GeneralStatusBar';
import Icon, {Icons} from '../../components/Icons';

export const ContactSupport = ({navigation}) => {
  const colorScheme = useColorScheme();
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
    const phoneNumber = phone; // Replace with your phone number
    const url =
      Platform.OS === 'android'
        ? `tel:${phoneNumber}`
        : `telprompt:${phoneNumber}`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={tw`flex-1 py-10 px-5 dark:bg-gray-900`}>
      <GeneralStatusBar
        backgroundColor={colorScheme === 'dark' ? '#000' : '#1F1F1F'}
      />

      <View style={tw`flex-row items-center justify-between`}>
        <Pressable
          style={({pressed}) =>
            tw`h-10 w-10 items-center justify-center rounded-full ${
              pressed ? 'bg-gray-200' : ''
            } `
          }
          onPress={() => {
            navigation.goBack();
            navigation.openDrawer();
          }}>
          <Icon
            type={Icons.Ionicons}
            name={'chevron-back'}
            size={25}
            color={'black'}
          />
        </Pressable>
        <View style={tw`flex-row justify-center`}>
          <Text
            style={[
              tw`text-center text-xl text-black dark:text-white border-b-4 rounded-md dark:border-white`,
              {fontFamily: 'Poppins-Bold'},
            ]}>
            Contact & Support
          </Text>
        </View>
        <View style={tw`h-10 w-10`}></View>
      </View>

      {/* Office Hours */}
      <View
        style={tw`my-5 gap-5 p-4 bg-white dark:bg-slate-800 rounded-lg shadow shadow-slate-400`}>
        <View style={tw`flex-row items-center`}>
          <Text
            style={[
              tw`text-black dark:text-white flex flex-row`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            Office Hours: Monday to Saturday |{' '}
          </Text>
          <Text style={tw`text-white px-2 py-0.5 rounded-full bg-emerald-500`}>
            9 AM - 6 PM
          </Text>
        </View>
        <Text
          style={[
            tw`text-black dark:text-white`,
            {fontFamily: 'Poppins-Regular'},
          ]}>
          Address - Tales on wood office & manufacturing unit, Xrbia road nerhe,
          dattawadi, Hinjewadi, Pune, Maharashtra 411033
        </Text>
      </View>

      {/* Email Button */}
      <TouchableOpacity
        style={tw`w-full h-12 mb-4 items-center justify-center rounded-lg bg-emerald-500 shadow-md shadow-slate-500`}
        onPress={sendEmail}>
        <Text style={[tw`text-white text-lg`, {fontFamily: 'Poppins-Bold'}]}>
          Send Email
        </Text>
      </TouchableOpacity>

      {/* Phone Number Button */}

      {appconfig.supportphone?.map((phoneNumber, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={tw`my-2 w-3/6 mx-auto py-2 px-5 flex flex-row items-center justify-between rounded-full bg-emerald-600 `}
            onPress={() => callPhoneNumber(phoneNumber)}>
            <Icon
              type={Icons.MaterialIcons}
              name={'phone'}
              size={25}
              style={[tw`text-white`]}
            />
            <Text
              style={[
                tw`w-2/3 text-lg text-white`,
                {fontFamily: 'Poppins-Regular'},
              ]}>
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
