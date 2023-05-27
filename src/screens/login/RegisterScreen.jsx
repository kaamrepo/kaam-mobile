import React from 'react';
import { Text, StyleSheet, View, SafeAreaView,  TextInput,Image,Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import tw from 'twrnc';
import Languages from '../../components/Languages.json';
const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  mobileNumber: yup
    .string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Invalid mobile number'),
});

const RegisterScreen = ({navigation}) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onChange'
    });
  const onSubmit = (data) => {
    console.log("Form Data ",data);
    navigation.navigate('VerifyCode');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.topPanel}>
          <Text style={[tw`text-black text-3xl font-bold text-start`, styles.appTitle]}>
            {Languages.appTitle}
          </Text>
          <View style={tw`border-black border-[3px] w-[10%] bg-black ml-[2%]`} />
        </View>
        <View style={styles.midPanel}>
          <Text style={tw`text-black text-2xl font-semibold`}>Registration👍</Text>
          <Text style={tw`text-black text-sm font-normal text-gray-400 ml-[2px] mb-6`}>Let’s Register. Apply to jobs!</Text>
          <View style={tw`mb-2`}>
            <View style={tw`border border-slate-500 rounded-xl flex flex-row w-[95%]`}>
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
                        style={tw` w-[80%] text-sm font-medium text-black`}
                        placeholder='Full Name'
                        placeholderTextColor={"gray"}
                />
                    )
                    }
                />
            </View>
             {errors?.name && <Text style={tw`text-red-500 mb-1`}>{errors?.name?.message}</Text>}
          </View>
         <View style={tw`mb-2`}>
          <View style={tw`border border-slate-500 rounded-xl flex flex-row w-[95%]`}>
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
                      style={tw` w-[80%] text-sm  font-medium text-black`}
                      placeholder='E-mail'
                      placeholderTextColor={"gray"}
              />)}
              />
          </View>
          {errors?.email && <Text style={tw`text-red-500`}>{errors?.email?.message}</Text>}
          </View>
          <View style={tw`mb-4`}>
            <View style={tw`border border-slate-500 rounded-xl flex flex-row w-[95%]`}>
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
                        style={tw` w-[80%] text-sm font-medium text-black`}
                        placeholder='Phone Number'
                        placeholderTextColor={"gray"}
                />
                    )
                    }
                />
            </View>
           {errors?.mobileNumber && <Text style={tw`text-red-500`}>{errors?.mobileNumber?.message}</Text>}
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
              <Text style={{color:"white"}}>GET OTP</Text>
          </Pressable>
        </View>
        <View style={styles.bottomPanel}>
          <Text style={tw`text-gray-500`}>Have an account ?</Text> 
          <Pressable onPress={() =>
                {
                  navigation.navigate('Login');
                }}><Text style={tw`text-green-500`}>Log in</Text></Pressable>
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
    flex: 2,
    backgroundColor: 'white',
    marginLeft: '8%',
    justifyContent: 'center', // Center vertically
  },
  appTitle: {
    textAlignVertical: 'center', // Center text vertically
  },
  midPanel: {
    flex: 5.5,
    marginLeft: '8%',
    // alignItems: 'center',
    flexDirection: 'column',
    // justifyContent: 'center',
    backgroundColor: 'white',
  },
  bottomPanel: {
    flex: 2.5,
    flexDirection: 'row',
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: 'white',
    gap:2,
  },
});

export default RegisterScreen;
