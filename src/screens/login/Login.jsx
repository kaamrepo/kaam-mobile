import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Image,
  TouchableOpacity,
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
import { RegistrationTranslation } from './loginTranslation';

const schema = yup.object({
  phone: yup.string().required("Phone Number is required!")
    .min(10, 'Phone number must be of 10 characters.')
    .max(10, 'Phone number must be of 10 characters.'),
}).required();

const Login = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const [countryCode, setCountryCode] = useState({ "dialcode": "+91", "flag": "🇮🇳" });
  const { getOTP, language } = useLoginStore();
  const [isFormButtonDisabled, setFormButtonDisabled] = useState(false)
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
    <SafeAreaView style={[{flex: 1}, tw`px-5 bg-white`]}>
      <GeneralStatusBar backgroundColor={'rgb(226 232 240)'} />
      <View style={styles.container}>
        <View style={styles.logo}>
          <Text style={{
            fontSize: 32,
            color: "black",
            fontFamily: 'Poppins-Bold'
          }}>{RegistrationTranslation[language]["Kaam"]}</Text>
          <View style={tw`w-[12%] bg-black h-[5px] ml-2 -mt-2 rounded-[1px]`}></View>
        </View>
        <View style={[styles.maincontainer, tw`items-center`]}>
          <View style={tw`w-full`}>
            <Text style={[{ fontFamily: "Poppins-SemiBold" }, tw`text-black text-[26px]`]}>
              {RegistrationTranslation[language]["Welcome Back"]} 👋
            </Text>
            <Text style={[{ fontFamily: "Poppins-SemiBold" }, tw`text-sm text-slate-500`]}>
              {RegistrationTranslation[language]["Let's log in. Apply to jobs!"]}
            </Text>
          </View>

          <View style={tw`w-full mt-10`}>
            <View style={[tw`w-full justify-between flex-row items-center`]}>
              <View style={tw`w-[24%] h-12 border border-slate-500 rounded-xl items-center justify-center`}>
                <TouchableOpacity
                  onPress={() => setShow(true)}
                  disabled={isFormButtonDisabled}>
                  <Text style={[tw`text-black`, {fontFamily: 'Poppins-Regular'}]}>
                    {`${countryCode.flag} ${countryCode.dialcode}`}
                  </Text>
                </TouchableOpacity>
                <CountryPicker
                  show={show}
                  initialState={'+91'}
                  inputPlaceholder="Select your country"
                  onBackdropPress={() => setShow(false)}
                  style={{
                    modal: {
                      height: '70%',
                    },
                  }}
                  pickerButtonOnPress={item => {
                    setCountryCode({flag: item.flag, dialcode: item.dial_code});
                    setShow(false);
                  }}
                />
              </View>
              <View style={tw`my-3 w-[74%] `}>
                <View style={tw`${
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
                        keyboardType='phone-pad'
                        style={[{ fontFamily: "Poppins-Regular" }, tw` w-[80%] text-sm font-medium text-black`]}
                        placeholder={RegistrationTranslation[language]["Phone Number"]}
                        placeholderTextColor={"gray"}
                      />
                    )}
                  />
                </View>
                {errors?.phone && (
                  <Text style={[tw`text-xs text-red-500 text-right`, {fontFamily: 'Poppins-Regular'}]}>
                    {errors?.phone?.message}
                  </Text>
                )}
              </View>
            </View>
          </View>

          <View style={[tw`flex flex-col items-center justify-between w-full mb-10`, { flex: 2}]}>
            <Pressable
              onPress={handleSubmit(onSubmit)}
              disabled={isFormButtonDisabled}
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#418c4d' : '#4A9D58',
                  marginBottom: 10
                },
                tw`w-full h-13 items-center justify-center rounded-xl`
              ]}
            >
              <Text style={[{ fontFamily: "Poppins-SemiBold" }, tw`uppercase text-white`]}>
                {RegistrationTranslation[language]["GET OTP"]}
              </Text>
            </Pressable>
            <View style={tw`flex flex-row gap-2`}>
              <Text style={tw`text-slate-600 font-normal`}>
                {RegistrationTranslation[language]["Don't have an Account?"]}
              </Text>
              <Pressable onPress={() => {
                navigation.navigate("registerScreen");
              }}>
                <Text style={tw`text-[#4A9D58] font-medium`}>
                  {RegistrationTranslation[language]["Register"]}.
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    flex: 2,
    justifyContent: 'flex-end',
  },
  maincontainer: {
    flex: 9,
  },
});
