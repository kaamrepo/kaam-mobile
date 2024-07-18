import {Text, View} from 'react-native';
import React from 'react';
import tw from 'twrnc';

const Title = ({title}: {title: string}) => {
  return (
    <View style={tw`my-2`}>
      <Text
        style={[
          tw`text-2xl text-black dark:text-white`,
          {fontFamily: 'Poppins-Bold'},
        ]}>
        {title}
      </Text>
    </View>
  );
};

export default Title;
