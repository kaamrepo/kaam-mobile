import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import tw from 'twrnc';

const KToggle = ({isEnabled, setIsEnabled, onPress}) => {
  const translateX = useSharedValue(isEnabled ? 30 : 0);
  console.log('are yaar');
  const toggleSwitch = () => {
    setIsEnabled(previousState => {
      const value = !previousState;
      translateX.value = value ? withTiming(30) : withTiming(0); // Adjust the value based on the width of the switch
      return value;
    });
    if (onPress) onPress();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  return (
    <View>
      <TouchableOpacity
        onPress={toggleSwitch}
        style={[
          tw`w-[60px] h-[30px] p-1 justify-center rounded-full ${
            isEnabled
              ? 'bg-emerald-500 dark:bg-emerald-600'
              : 'bg-gray-400/70 dark:bg-gray-700'
          }`,
        ]}>
        <Animated.View
          style={[
            tw`w-[20px] h-[20px] rounded-full shadow-md bg-white`,
            animatedStyle,
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default KToggle;
