import React, { useRef, useState, useEffect } from 'react';
import
{
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  Keyboard,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
const VerifyCode = () =>
{
  const navigation = useNavigation();
  const codeInputs = useRef([]);
  const [code, setCode] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  // ...
  const handleCodeInput = (index, text) =>
  {
    const newCode = code.substr(0, index) + text + code.substr(index + 1);
    setCode(newCode);
    if (text.length === 1 && index < codeInputs.current.length - 1)
    {
      codeInputs.current[index + 1].focus();
    } else if (text.length === 0 && index > 0)
    {
      codeInputs.current[index - 1].focus();
    }
  };
  // ...
  const handleVerify = () =>
  {
    console.log('Verification code:', code);
    // Navigate to the next screen or perform the verification logic
    navigation.navigate('ChooseProfession');
  };
  useEffect(() =>
  {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () =>
      {
        setIsKeyboardOpen(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () =>
      {
        setIsKeyboardOpen(false);
      }
    );
    return () =>
    {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView style={tw`flex-1`}>
        <View style={tw`flex-1 justify-center items-center bg-white`}>
          {/* <TouchableOpacity
            style={tw`absolute top-10 left-4`}
            onPress={() =>
            {
              navigation.goBack(); // Navigate back
            }}>
            <Image
              source={require('../../assets/images/left-chevron.png')}
              style={tw`w-5 h-5`}
            />
          </TouchableOpacity> */}
          <View style={tw`flex mt-25`}>
            <Image
              source={require('../../assets/images/kaam-logo-verify-code.png')}
              style={[tw`w-14 h-14`, { height: 100, width: 100 }]}
              resizeMode="contain"
            />
          </View>
          <Text style={tw`mt-10 font-bold text-black text-4xl`}>Verify Code</Text>
          <Text style={tw`py-5 text-sm leading-relaxed text-gray-600`}>
            Enter verification code received on your phone
          </Text>
          <Text style={tw`py-2 text-sm leading-relaxed text-gray-600`}>
            +91 - 8928843887
          </Text>
          <View style={tw`flex-1 mt-15`}>
            <View style={tw`flex flex-row justify-center items-center`}>
              {[0, 1, 2, 3].map((index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (codeInputs.current[index] = ref)}
                  style={[{ fontFamily: "Poppins-SemiBold" }, tw`border border-gray-300 text-black rounded-md border-emerald-400 w-12 h-12 mx-2 text-center`]}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={(text) =>
                  {
                    handleCodeInput(index, text);
                    setIsKeyboardOpen(true);
                  }}
                />
              ))}
            </View>
            <Pressable
              onPress={handleVerify}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#418c4d' : '#4A9D58',
                },
                tw`px-8 py-2 ${ isKeyboardOpen ? 'mt-10' : 'mt-30' } flex justify-center items-center rounded-xl`,
              ]}>
              {({ pressed }) => (
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
