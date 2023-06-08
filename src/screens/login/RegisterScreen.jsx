import React, { useEffect } from 'react';
import { BackHandler, Alert, Text, StyleSheet, View, TextInput, Image, Pressable, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import {SafeAreaView} from 'react-native-safe-area-context';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import tw from 'twrnc';
import Languages from '../../components/Languages.json';
import GeneralStatusBar from '../../components/GeneralStatusBar';
const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  mobileNumber: yup
    .string()
    .min(10, 'Phone number must be of 10 characters.')
    .max(10, 'Phone number must be of 10 characters.')
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Invalid mobile number'),
});
const RegisterScreen = ({ navigation }) =>
{
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange'
  });
  const onSubmit = (data) =>
  {
    console.log("Form Data ", data);
    navigation.navigate('VerifyCode');
  };
  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert(
  //       'Confirm Exit',
  //       'Are you sure you want to exit?',
  //       [
  //         {
  //           text: 'Cancel',
  //           onPress: () => null,
  //           style: 'cancel'
  //         },
  //         {
  //           text: 'Exit',
  //           onPress: () => {
  //             BackHandler.exitApp(); // Exit the application
  //           }
  //         }
  //       ],
  //       { cancelable: false }
  //     );
  //     return true;
  //   };
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction
  //   );
  //   return () => backHandler.remove();
  // }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GeneralStatusBar backgroundColor={"#FFFFFF"} />
      <View style={styles.container}>
        <View style={styles.topPanel}>
          <Text style={[{ fontFamily: "Poppins-Bold", textAlignVertical: 'center' }, tw`text-black text-3xl`]}>
            {Languages.appTitle}
          </Text>
          <View style={tw`border-black border-[3px] w-[10%] bg-black ml-[2%]`} />
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.formContainer}>
            <Text style={[{ fontFamily: "Poppins-SemiBold" }, tw`text-black text-2xl mb-2`]}>Registration 👍</Text>
            <Text style={[{ fontFamily: "Poppins-Regular" }, tw`text-black text-sm font-normal text-gray-400 ml-[2px] mb-6`]}>Let’s Register. Apply to jobs!</Text>

            <View style={tw`mb-2`}>
              <View style={tw`${ errors && errors.name ? "border border-red-500" : "border border-slate-500" } rounded-xl flex flex-row w-[95%]`}>
                <View style={tw`w-[15%] justify-center items-center`}>
                  <Image source={require('../../assets/images/profileIcon.png')} style={tw`w-6 h-6`} />
                </View>
                <Controller
                  control={control}
                  name='name'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType='ascii-capable'
                      style={[{ fontFamily: "Poppins-Regular" }, tw`w-[80%] text-sm font-medium text-black`]}
                      placeholder='Full Name'
                      placeholderTextColor='gray'
                    />
                  )}
                />
              </View>
              {errors?.name && <Text style={[tw`text-xs text-red-500 text-right mr-5`, { fontFamily: "Poppins-Regular" }]}>
                {errors?.name?.message}.
              </Text>}
            </View>

            <View style={tw`mb-2`}>
              <View style={tw`${ errors && errors.email ? "border border-red-500" : "border border-slate-500" } rounded-xl flex flex-row w-[95%]`}>
                <View style={tw`w-[15%] justify-center items-center`}>
                  <Image source={require('../../assets/images/mailIcon.png')} style={tw`w-6 h-6`} />
                </View>
                <Controller
                  control={control}
                  name='email'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType='email-address'
                      style={[{ fontFamily: "Poppins-Regular" }, tw`w-[80%] text-sm font-medium text-black`]}
                      placeholder='E-mail'
                      placeholderTextColor='gray'
                    />
                  )}
                />
              </View>
              {errors?.email && <Text style={[tw`text-xs text-red-500 text-right mr-5`, { fontFamily: "Poppins-Regular" }]}>
                {errors?.email?.message}.
              </Text>}
            </View>

            <View style={tw`mb-4`}>
              <View style={tw`${ errors && errors.mobileNumber ? "border border-red-500" : "border border-slate-500" } rounded-xl flex flex-row w-[95%]`}>
                <View style={tw`w-[15%] justify-center items-center`}>
                  <Image source={require('../../assets/images/phoneIcon.png')} style={tw`w-6 h-6`} />
                </View>
                <Controller
                  control={control}
                  name='mobileNumber'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType='phone-pad'
                      style={[{ fontFamily: "Poppins-Regular" }, tw`w-[80%] text-sm font-medium text-black`]}
                      placeholder='Phone Number'
                      placeholderTextColor='gray'
                    />
                  )}
                />
              </View>
              {errors?.mobileNumber && <Text style={[tw`text-xs text-red-500 text-right mr-5`, { fontFamily: "Poppins-Regular" }]}>
                {errors?.mobileNumber?.message}.
              </Text>}
            </View>
            <Pressable
              onPress={handleSubmit(onSubmit)}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#418c4d' : '#4A9D58',
                },
                tw`w-[95%] h-14 items-center justify-center rounded-xl`
              ]}
            >
              <Text style={{ color: "white", fontFamily: "Poppins-Regular" }}>GET OTP</Text>
            </Pressable>
          </View>
        </ScrollView>
        <View style={styles.bottomPanel}>
          <Text style={tw`text-gray-500`}>Have an account?</Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={tw`text-[#4A9D58] font-medium`}>Log in.</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topPanel: {
    flex: 3,
    height: 100,
    backgroundColor: 'white',
    marginLeft: '8%',
    justifyContent: 'center',
  },
  contentContainer: {
    flexGrow: 1,
    marginLeft: '8%',
  },
  formContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  bottomPanel: {
    flex: 2.5,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white',
    gap: 2,
  },
});

export default RegisterScreen;
