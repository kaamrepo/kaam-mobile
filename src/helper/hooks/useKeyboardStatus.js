import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

const useKeyboardStatus = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const keyboardDidShow = () => {
    setIsKeyboardVisible(true);
  };

  const keyboardDidHide = () => {
    setIsKeyboardVisible(false);
  };

  return isKeyboardVisible;
};

export default useKeyboardStatus;
