import React from 'react';
import {Text} from 'react-native';
import tw from 'twrnc';
const Header = ({title}) => {
  return (
    <Text
      style={[
        tw`w-auto rounded border-b-4 border-black text-black text-[20px]`,
        {fontFamily: 'Poppins-Bold'},
      ]}>
      {title}
    </Text>
  );
};

export default Header;
