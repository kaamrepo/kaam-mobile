import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import tw from 'twrnc';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const initialScale = 0.5;
const lastScale = 0.8;
const duration = 400;

const Roles = {
  EMPLOYEE: 'EMPLOYEE',
  EMPLOYER: 'EMPLOYER',
};

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const ChooseProfession = () => {
  const navigation = useNavigation();

  const employeeScale = useSharedValue(initialScale);
  const employerScale = useSharedValue(initialScale);

  const [selectedProfession, setSelectedProfession] = useState(null);

  const handleProfessionSelection = profession => {
    setSelectedProfession(profession);
    if (profession === Roles.EMPLOYEE) {
      employeeScale.value = withTiming(lastScale, {
        duration,
      });
      employerScale.value = withTiming(initialScale, {
        duration,
      });
    } else if (profession === Roles.EMPLOYER) {
      employerScale.value = withTiming(lastScale, {
        duration,
      });
      employeeScale.value = withTiming(initialScale, {
        duration,
      });
    }
  };

  const animatedEmployeeStyles = useAnimatedStyle(() => ({
    transform: [{scaleX: employeeScale.value}, {scaleY: employeeScale.value}],
  }));
  const animatedEmployerStyles = useAnimatedStyle(() => ({
    transform: [{scaleX: employerScale.value}, {scaleY: employerScale.value}],
  }));

  return (
    <SafeAreaView style={tw`w-full h-full px-5 dark:bg-gray-900`}>
      <View style={[tw`mt-8 mb-5`]}>
        <Text
          style={[
            tw`text-3xl text-black dark:text-white`,
            {fontFamily: 'Poppins-Bold'},
          ]}>
          Choose your Profession
        </Text>
        <Text
          style={[
            tw`text-sm text-gray-600 dark:text-gray-300`,
            {fontFamily: 'Poppins-SemiBold'},
          ]}>
          you can always switch from settings.
        </Text>
      </View>

      <View
        style={[tw`w-full flex-1 items-center justify-center flex flex-row`]}>
        <AnimatedTouchableOpacity
          onPress={() => handleProfessionSelection(Roles.EMPLOYEE)}
          style={[
            tw`w-[200px] h-[200px] rounded-full items-center justify-center border border-[3] ${
              selectedProfession === Roles.EMPLOYEE
                ? 'border-green-600'
                : 'border-gray-300'
            }`,
            animatedEmployeeStyles,
          ]}>
          <Text
            style={[
              tw`text-2xl text-gray-600 dark:text-gray-300`,
              {fontFamily: 'Poppins-SemiBold'},
            ]}>
            Employee
          </Text>
        </AnimatedTouchableOpacity>
        <AnimatedTouchableOpacity
          onPress={() => handleProfessionSelection(Roles.EMPLOYER)}
          style={[
            tw`w-[200px] h-[200px] rounded-full items-center justify-center border border-[3] ${
              selectedProfession === Roles.EMPLOYER
                ? 'border-green-600'
                : 'border-gray-300'
            }`,
            animatedEmployerStyles,
          ]}>
          <Text
            style={[
              tw`text-2xl text-gray-600 dark:text-gray-300`,
              {fontFamily: 'Poppins-SemiBold'},
            ]}>
            Employer
          </Text>
        </AnimatedTouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChooseProfession;
