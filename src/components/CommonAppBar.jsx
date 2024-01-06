// CommonAppBar.js
import React from 'react';
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import tw from 'twrnc';
import Icon, {Icons} from './Icons';
const CommonAppBar = ({title, onBackPress, backgroundColor, textColor}) => {
  const shadowStyle =
    Platform.OS === 'android'
      ? {elevation: 5}
      : {
          shadowColor: 'black',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          shadowRadius: 2,
        };
  return (
    <View
      style={[
        tw` flex items-start justify-start p-6 `,
        backgroundColor && {backgroundColor},
        shadowStyle,
      ]}>
      <View style={[tw` flex flex-row items-start`]}>
        <Pressable
          style={({pressed}) =>
            tw`${
              pressed ? 'bg-gray-200' : ''
            } my-2 rounded-full overflow-hidden`
          }
          onPress={() => {
            // navigation.goBack();
          }}>
          <Icon
            type={Icons.Ionicons}
            name={'chevron-back'}
            size={28}
            color={'black'}
          />
        </Pressable>
        <Text
          style={[
            tw`my-2 text-black  text-[24px]`,
            {fontFamily: 'Poppins-Bold'},
          ]}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default CommonAppBar;
