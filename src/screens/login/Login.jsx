import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Image,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GeneralStatusBar from '../../components/GeneralStatusBar';
import {CountryPicker} from 'react-native-country-codes-picker';
import tw from 'twrnc';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useLoginStore from '../../store/authentication/login.store';
import {RegistrationTranslation} from './loginTranslation';

const schema = yup
  .object({
    phone: yup
      .string()
      .required('Phone Number is required!')
      .min(10, 'Phone number must be of 10 characters.')
      .max(10, 'Phone number must be of 10 characters.'),
  })
  .required();

const Login = ({navigation}) => {
  const colorScheme = useColorScheme();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const [countryCode, setCountryCode] = useState({dialcode: '+91', flag: '🇮🇳'});
  const {getOTP, language} = useLoginStore();
  const [isFormButtonDisabled, setFormButtonDisabled] = useState(false);
  const [show, setShow] = useState(false);

  const onSubmit = async data => {
    setFormButtonDisabled(true);
    const success = await getOTP({...data, dialcode: countryCode.dialcode});
    if (success) {
      navigation.navigate('VerifyCode', {
        fromScreen: 'login',
      });
    } else {
      setFormButtonDisabled(false);
    }
  };

  return (
    <SafeAreaView style={[tw`flex-1 px-5 bg-white dark:bg-gray-950`]}>
      <GeneralStatusBar />
      <View style={[tw`h-full justify-around`]}>
        <View style={[tw` my-5`]}>
          <View style={[tw`my-5`]}>
            <Text
              style={[
                tw`text-black dark:text-white text-3xl`,
                {
                  fontFamily: 'Poppins-Bold',
                },
              ]}>
              {RegistrationTranslation[language]['Kaam']}
            </Text>
            <View style={tw`w-[12%] bg-black dark:bg-white h-[5px] rounded`} />
          </View>

          <View style={tw`w-full`}>
            <Text
              style={[
                {fontFamily: 'Poppins-SemiBold'},
                tw`text-black dark:text-white text-[26px]`,
              ]}>
              {RegistrationTranslation[language]['Welcome Back']} 👋
            </Text>
            <Text
              style={[
                {fontFamily: 'Poppins-SemiBold'},
                tw`text-sm text-slate-500 dark:text-slate-300`,
              ]}>
              {
                RegistrationTranslation[language][
                  "Let's log in. Apply to jobs!"
                ]
              }
            </Text>
          </View>

          <View style={tw`w-full my-10`}>
            <View style={[tw`w-full justify-between flex-row items-center`]}>
              <View
                style={tw`w-[24%] h-13 border border-slate-500 rounded-xl items-center justify-center`}>
                <TouchableOpacity
                  onPress={() => setShow(true)}
                  disabled={isFormButtonDisabled}>
                  <Text
                    style={[
                      tw`text-black dark:text-white`,
                      {fontFamily: 'Poppins-Regular'},
                    ]}>
                    {`${countryCode.flag} ${countryCode.dialcode}`}
                  </Text>
                </TouchableOpacity>
                <CountryPicker
                  show={show}
                  initialState={'+91'}
                  inputPlaceholder="Select your country"
                  onBackdropPress={() => setShow(false)}
                  style={{
                    textInput: [
                      tw`text-black dark:text-white bg-white dark:bg-gray-900 px-3`,
                    ],
                    countryName: [tw`text-black dark:text-white`],
                    searchMessageText: [tw`text-black dark:text-white`],
                    countryButtonStyles: [tw`bg-white dark:bg-gray-900`],
                    countryMessageContainer: [tw`bg-white dark:bg-gray-900`],
                    modal: {
                      height: '70%',
                      backgroundColor:
                        colorScheme === 'dark' ? '#2d3649' : 'white',
                    },
                  }}
                  pickerButtonOnPress={item => {
                    setCountryCode({flag: item.flag, dialcode: item.dial_code});
                    setShow(false);
                  }}
                />
              </View>
              <View style={tw`my-1 w-[74%] `}>
                <View
                  style={tw`${
                    errors?.phone
                      ? 'border border-red-500'
                      : 'border border-slate-500'
                  } rounded-xl flex flex-row w-full `}>
                  <View style={tw`w-[15%] justify-center items-center`}>
                    <Image
                      source={require('../../assets/images/phoneIcon.png')}
                      style={tw`w-6 h-6`}
                    />
                  </View>
                  <Controller
                    control={control}
                    name="phone"
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        keyboardType="phone-pad"
                        style={[
                          {fontFamily: 'Poppins-Regular'},
                          tw` w-[80%] text-sm font-medium text-black dark:text-white`,
                        ]}
                        placeholder={
                          RegistrationTranslation[language]['Phone Number']
                        }
                        placeholderTextColor={'gray'}
                      />
                    )}
                  />
                </View>
              </View>
            </View>
            <Text
              style={[
                tw`text-xs text-red-500 text-right`,
                {fontFamily: 'Poppins-Regular'},
              ]}>
              {errors?.phone?.message}
            </Text>
          </View>

          <Pressable
            onPress={handleSubmit(onSubmit)}
            disabled={isFormButtonDisabled}
            style={({pressed}) => [
              tw`w-full h-13 items-center justify-center rounded-xl ${
                pressed ? 'bg-emerald-600' : 'bg-emerald-500'
              }`,
            ]}>
            <Text
              style={[
                {fontFamily: 'Poppins-SemiBold'},
                tw`uppercase text-white`,
              ]}>
              {RegistrationTranslation[language]['GET OTP']}
            </Text>
          </Pressable>
        </View>
        <View style={tw`flex flex-row justify-center gap-2`}>
          <Text
            style={[
              tw`text-gray-500 dark:text-gray-300`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            {RegistrationTranslation[language]["Don't have an Account?"]}
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate('registerScreen');
            }}>
            <Text
              style={[tw`text-emerald-500`, {fontFamily: 'Poppins-Regular'}]}>
              {RegistrationTranslation[language]['Register']}.
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
