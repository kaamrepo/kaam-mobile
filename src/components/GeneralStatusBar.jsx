import {StatusBar} from 'react-native';
import React from 'react';

const GeneralStatusBar = ({backgroundColor, ...props}) => {
  return (
    <StatusBar
      translucent
      backgroundColor={backgroundColor ?? 'black'}
      {...props}
    />
  );
};

export default GeneralStatusBar;
