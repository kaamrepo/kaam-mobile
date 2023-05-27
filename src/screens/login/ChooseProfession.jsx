import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const ChooseProfession = () => {
  const navigation = useNavigation();
  const [selectedProfession, setSelectedProfession] = useState(null);

  const handleProfessionSelection = (profession) => {
    setSelectedProfession(profession);
  };

  const isProfessionSelected = (profession) => {
    return selectedProfession === profession;
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-white`}>
      <View style={tw`flex items-center`}>
        <Image
          source={require('../../assets/images/kaam-logo-verify-code.png')}
          style={[tw`w-14 h-14`, { height: 80, width: 80 }]}
          resizeMode="contain"
        />
      </View>
      <Text style={tw`mt-5 font-bold text-black text-2xl`}>
        Choose Yourself
      </Text>
      <View style={tw`flex flex-row justify-between mt-5`}>
        <TouchableOpacity
          onPress={() => handleProfessionSelection('employee')}
          style={[
            tw`flex flex-col items-center justify-center bg-white rounded-full py-15 px-5 mx-2 border-green-500 border-2`,
            isProfessionSelected('employee') && tw`border-green-500 border-8`,
          ]}
        >
          <Image
            source={require('../../assets/images/profession-employee.png')}
            style={tw`w-30 h-50`}
          />
          <Text style={tw`mt-5 font-bold text-black text-xl`}>Employee</Text>
          <View style={tw`text-sm leading-relaxed text-gray-600`}>
            <Text style={tw`text-center`}>
              <Text>I am searching</Text>
            </Text>
            <Text style={tw`text-center`}>for a job</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleProfessionSelection('employer')}
          style={[
            tw`flex flex-col items-center justify-center bg-white rounded-full py-15 px-5 mx-2 border-green-500 border-2`,
            isProfessionSelected('employer') && tw`border-green-500 border-8`,
          ]}
        >
          <Image
            source={require('../../assets/images/profession-employee.png')}
            style={tw`w-30 h-50`}
          />
          <Text style={tw`mt-5 font-bold text-black text-xl`}>Employer</Text>
          <View style={tw`text-sm leading-relaxed text-gray-600`}>
            <Text style={tw`text-center`}>
              <Text>I am searching</Text>
            </Text>
            <Text style={tw`text-center`}>for a worker</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={tw`my-14`}>
        <Pressable
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#d7dbd8' : 'transparent',
            },
            tw`w-1/2 items-center justify-center rounded-2xl`
          ]}>
          {({ pressed }) => (
            <Image source={require('../../assets/images/gotonextScreen.png')} style={tw`w-12 h-12`} />
          )}
        </Pressable>

      </View>
    </View>
  );
};

export default ChooseProfession;
