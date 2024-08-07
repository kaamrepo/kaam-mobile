import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  useColorScheme,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useForm, Controller} from 'react-hook-form';
import {SafeAreaView} from 'react-native-safe-area-context';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import tw from 'twrnc';
import GeneralStatusBar from '../../components/GeneralStatusBar';
import {CountryPicker} from 'react-native-country-codes-picker';
import {RegistrationTranslation} from './loginTranslation';
import useRegistrationStore from '../../store/authentication/registration.store';
import useLoginStore from '../../store/authentication/login.store';
import {useNavigation} from '@react-navigation/native';

const validationSchema = yup.object().shape({
  firstname: yup.string().required('First Name is required').trim(),
  lastname: yup.string().required('Last Name is required').trim(),
  email: yup.string().email('Invalid email format').trim(),
  phone: yup
    .string()
    .min(10, 'Phone number must be of 10 characters.')
    .max(10, 'Phone number must be of 10 characters.')
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Invalid mobile number')
    .trim(),
  isTermsAndConditionsChecked: yup
    .boolean()
    .oneOf([true], 'Please accept the terms and conditions.'),
  termsAndConditionsId: yup
    .string()
    .required('Please accept the terms and conditions.'),
});
const RegisterScreen = () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });
  const {language} = useLoginStore();
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState({dialcode: '+91', flag: '🇮🇳'});
  const {registerUser, getTermsAndConditions, termAndConditions} =
    useRegistrationStore();
  const [isFormButtonDisabled, setFormButtonDisabled] = useState(false);

  const onSubmit = async data => {
    data.role = 'KAAM_EMPLOYEE';
    console.log('data', data);
    setFormButtonDisabled(true);
    const success = await registerUser({
      ...data,
      dialcode: countryCode.dialcode,
    });
    if (success) {
      navigation.navigate('VerifyCode', {
        fromScreen: 'register',
      });
    } else {
      setFormButtonDisabled(false);
    }
  };
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Confirm Exit',
        'Are you sure you want to exit?',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'Exit',
            onPress: () => {
              BackHandler.exitApp(); // Exit the application
            },
          },
        ],
        {cancelable: false},
      );
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    getTermsAndConditions();
  }, []);

  const isTermsAndConditionsChecked = watch('isTermsAndConditionsChecked');

  const handleTermsAndConditionNavigation = () => {
    navigation.navigate('TermsAndConditions');
  };

  return (
    <SafeAreaView style={tw`flex-1 px-5 bg-white dark:bg-gray-950`}>
      <GeneralStatusBar />
      <View style={[tw`h-full`]}>
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
        <ScrollView
          contentContainerStyle={[tw`my-5`]}
          keyboardShouldPersistTaps="handled">
          <View style={[tw``]}>
            <View style={[tw`my-5`]}>
              <Text
                style={[
                  {fontFamily: 'Poppins-SemiBold'},
                  tw`text-black dark:text-white text-[26px]`,
                ]}>
                {RegistrationTranslation[language]['Registration']}
              </Text>
              <Text
                style={[
                  tw`text-sm text-slate-500 dark:text-slate-300`,
                  {fontFamily: 'Poppins-SemiBold'},
                ]}>
                {
                  RegistrationTranslation[language][
                    "Let's Register. Apply to jobs!"
                  ]
                }
              </Text>
            </View>

            <View style={[tw`mt-5`]}>
              <View style={tw`flex-row justify-between`}>
                <View style={tw`mb-2 w-[49%]`}>
                  <View
                    style={tw`${
                      errors && errors.firstname
                        ? 'border border-red-500'
                        : 'border border-slate-500'
                    } rounded-xl flex w-[100%]`}>
                    <Controller
                      control={control}
                      name="firstname"
                      render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                          autoComplete="off"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          keyboardType="ascii-capable"
                          style={[
                            {fontFamily: 'Poppins-Regular'},
                            tw`w-full text-sm font-medium text-black dark:text-white px-4 overflow-hidden`,
                          ]}
                          placeholder={`${RegistrationTranslation[language]['First Name']}`}
                          placeholderTextColor="gray"
                        />
                      )}
                    />
                  </View>
                  {errors?.firstname && (
                    <Text
                      style={[
                        tw`text-[10px] text-red-500 text-right mr-2`,
                        {fontFamily: 'Poppins-Regular'},
                      ]}>
                      {errors?.firstname?.message}.
                    </Text>
                  )}
                </View>
                <View style={tw`mb-2 w-[49%]`}>
                  <View
                    style={tw`${
                      errors && errors.lastname
                        ? 'border border-red-500'
                        : 'border border-slate-500'
                    } rounded-xl flex w-[100%]`}>
                    <Controller
                      control={control}
                      name="lastname"
                      render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          keyboardType="ascii-capable"
                          style={[
                            {fontFamily: 'Poppins-Regular'},
                            tw`w-full text-sm font-medium text-black dark:text-white px-4`,
                          ]}
                          placeholder={`${RegistrationTranslation[language]['Last Name']}`}
                          placeholderTextColor="gray"
                        />
                      )}
                    />
                  </View>
                  {errors?.lastname && (
                    <Text
                      style={[
                        tw`text-[10px] text-red-500 text-right mr-2`,
                        {fontFamily: 'Poppins-Regular'},
                      ]}>
                      {errors?.lastname?.message}.
                    </Text>
                  )}
                </View>
              </View>

              <View style={tw`mb-2`}>
                <View
                  style={tw`${
                    errors && errors.email
                      ? 'border border-red-500'
                      : 'border border-slate-500'
                  } rounded-xl flex flex-row w-[100%]`}>
                  <View style={tw`w-[15%] justify-center items-center`}>
                    <Image
                      source={require('../../assets/images/mailIcon.png')}
                      style={tw`w-6 h-6`}
                    />
                  </View>
                  <Controller
                    control={control}
                    name="email"
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        keyboardType="email-address"
                        style={[
                          {fontFamily: 'Poppins-Regular'},
                          tw`w-[80%] text-sm font-medium text-black dark:text-white`,
                        ]}
                        placeholder={`${RegistrationTranslation[language]['Email']}`}
                        placeholderTextColor="gray"
                      />
                    )}
                  />
                </View>
                {errors?.email && (
                  <Text
                    style={[
                      tw`text-[10px] text-red-500 text-right mr-5`,
                      {fontFamily: 'Poppins-Regular'},
                    ]}>
                    {errors?.email?.message}.
                  </Text>
                )}
              </View>

              <View style={tw`mb-4`}>
                <View style={tw`flex-row items-center justify-between`}>
                  <View
                    style={tw`w-[23%] h-12 border border-slate-500 rounded-xl items-center justify-center`}>
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
                        countryMessageContainer: [
                          tw`bg-white dark:bg-gray-900`,
                        ],
                        modal: {
                          height: '70%',
                          backgroundColor:
                            colorScheme === 'dark' ? '#2d3649' : 'white',
                        },
                      }}
                      // when picker button press you will get the country object with dial code
                      pickerButtonOnPress={item => {
                        setCountryCode({
                          flag: item.flag,
                          dialcode: item.dial_code,
                        });
                        setShow(false);
                      }}
                    />
                  </View>

                  <View
                    style={tw`${
                      errors && errors.phone
                        ? 'border border-red-500'
                        : 'border border-slate-500'
                    } rounded-xl flex flex-row w-[75%]`}>
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
                            tw`w-[80%] text-sm font-medium text-black dark:text-white`,
                          ]}
                          placeholder={`${RegistrationTranslation[language]['Phone Number']}`}
                          placeholderTextColor="gray"
                        />
                      )}
                    />
                  </View>
                </View>
                {errors?.phone && (
                  <Text
                    style={[
                      tw`text-[10px] text-red-500 text-right mr-5`,
                      {fontFamily: 'Poppins-Regular'},
                    ]}>
                    {errors?.phone?.message}.
                  </Text>
                )}
              </View>
            </View>

            <View style={tw`mb-5`}>
              <View style={tw`flex-row items-center`}>
                <Controller
                  control={control}
                  name="isTermsAndConditionsChecked"
                  defaultValue={false}
                  render={({field: {value, onChange}}) => (
                    <CheckBox
                      disabled={false}
                      value={value}
                      onValueChange={val => {
                        onChange(val);
                        setValue(
                          'termsAndConditionsId',
                          termAndConditions?._id,
                        );
                      }}
                      tintColor="#10b982"
                    />
                  )}
                />

                <Text
                  onPress={() => {
                    setValue(
                      'isTermsAndConditionsChecked',
                      !isTermsAndConditionsChecked,
                    );
                    setValue('termsAndConditionsId', termAndConditions?._id);
                  }}
                  style={[
                    tw`text-sm font-medium text-black dark:text-white`,
                    {fontFamily: 'Poppins-Regular'},
                  ]}>
                  I accept the{' '}
                  <Text
                    onPress={handleTermsAndConditionNavigation}
                    style={[
                      tw`text-sm font-medium text-emerald-500 dark:text-white`,
                      {fontFamily: 'Poppins-Regular'},
                    ]}>
                    terms and conditions
                  </Text>
                </Text>
              </View>
              {(errors?.isTermsAndConditionsChecked ||
                errors?.termsAndConditionsId) && (
                <Text
                  style={[
                    tw`text-[10px] text-red-500 text-left mr-2 ml-[8%]`,
                    {fontFamily: 'Poppins-Regular'},
                  ]}>
                  {errors?.isTermsAndConditionsChecked?.message ||
                    errors?.termsAndConditionsId?.message}
                </Text>
              )}
            </View>

            <Pressable
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              style={({pressed}) => [
                tw`w-full h-13 items-center justify-center rounded-xl ${
                  pressed ? 'bg-emerald-600' : 'bg-emerald-500'
                } `,
              ]}>
              <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
                {`${RegistrationTranslation[language]['GET OTP']}`}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
        <View style={[tw`mt-5 mb-20 flex-row justify-center gap-2`]}>
          <Text
            style={[
              tw`text-gray-500 dark:text-gray-300`,
              {fontFamily: 'Poppins-Regular'},
            ]}>{`${RegistrationTranslation[language]['Have an account?']}`}</Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text
              style={[
                tw`text-emerald-500`,
                {fontFamily: 'Poppins-Regular'},
              ]}>{`${RegistrationTranslation[language]['Log in']}`}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topPanel: {
    flex: 3,
    height: 100,
    backgroundColor: 'white',
    marginHorizontal: '8%',
    justifyContent: 'center',
  },
  contentContainer: {
    flexGrow: 1,
    marginHorizontal: '8%',
  },
  formContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  bottomPanel: {
    flex: 2.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    gap: 2,
  },
});

export default RegisterScreen;
