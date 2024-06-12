import {Pressable, Text, View, useColorScheme} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw, {useAppColorScheme} from 'twrnc';

// SVG Icons
import LanguageSVG from '../../assets/svgs/Language.svg';
import DeleteAccountSVG from '../../assets/svgs/DeleteAccount.svg';
import TermsAndCondtionsSVG from '../../assets/svgs/TermsAndCondtions.svg';
import AboutSVG from '../../assets/svgs/About.svg';
import LanguageSelection from './settings/LanguageSelection';
import Icon, {Icons} from '../../components/Icons';
import KToggle from '../../components/KToggle';

const Settings = ({navigation}) => {
  useColorScheme();
  const [isEnabled, setIsEnabled] = useState(false);
  const bottomSheetSelectLanguageRef = useRef(null);

  const updateLanguage = async data => {
    // const success = await updateDetailsStore(loggedInUser?._id, data)
    if (success) {
      bottomSheetSelectLanguageRef.current.close();
    }
  };

  const applcationOptions = [
    {
      icon: <LanguageSVG />,
      title: 'Language',
      titleClass: 'text-[#0D0D26]',
      handleNavigation: () => {
        bottomSheetSelectLanguageRef.current.snapToIndex(1);
      },
    },
    {
      icon: <DeleteAccountSVG />,
      title: 'Delete Account',
      titleClass: 'text-[#E30000] ',
      handleNavigation: () => {},
    },
  ];
  const aboutOptions = [
    {
      icon: <TermsAndCondtionsSVG />,
      title: 'Terms and conditions',
      titleClass: 'text-[#0D0D26]',
      handleNavigation: () => {},
    },
    {
      icon: <AboutSVG />,
      title: 'About',
      titleClass: 'text-[#0D0D26]',
      handleNavigation: () => {},
    },
  ];

  const colorScheme = useColorScheme();
  const [twColorScheme, toggleColorScheme, setColorScheme] =
    useAppColorScheme(tw);

  console.log('---------------', {
    isEnabled,
    colorScheme,
    twColorScheme,
  });
  return (
    <SafeAreaView style={tw`flex-1 p-4 px-8 bg-[#FAFAFD] dark:bg-slate-900`}>
      <Text
        style={[
          tw`text-gray-600/60 dark:text-gray-400 text-[14px]`,
          {fontFamily: 'Poppins-SemiBold'},
        ]}>
        Applications
      </Text>
      {applcationOptions.map((option, index) => (
        <ClickableItem
          key={index}
          handleNavigation={option.handleNavigation}
          icon={option.icon}
          title={option.title}
          titleClass={option.titleClass}
        />
      ))}
      <Text
        style={[
          tw`text-gray-600/60 dark:text-gray-400 text-[14px] mt-3`,
          {fontFamily: 'Poppins-SemiBold'},
        ]}>
        About
      </Text>
      {aboutOptions.map((option, index) => (
        <ClickableItem
          key={index}
          handleNavigation={option.handleNavigation}
          icon={option.icon}
          title={option.title}
          titleClass={option.titleClass}
        />
      ))}

      <Text
        style={[
          tw`text-gray-600/60 dark:text-gray-400 text-[14px] mt-3`,
          {fontFamily: 'Poppins-SemiBold'},
        ]}>
        Theme
      </Text>

      <View style={tw`w-full flex-row justify-between items-center`}>
        <View style={tw`py-3 flex-row items-center gap-4`}>
          <Icon
            type={Icons.MaterialIcons}
            name={isEnabled ? 'dark-mode' : 'light-mode'}
            size={25}
            style={tw`${isEnabled ? 'text-blue-800' : 'text-yellow-400'}`}
          />
          <Text
            style={[
              tw`text-black dark:text-white`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            Switch Theme
          </Text>
        </View>
        <KToggle
          isEnabled={isEnabled}
          setIsEnabled={setIsEnabled}
          onPress={() => {
            toggleColorScheme();
          }}
        />
      </View>

      <LanguageSelection
        bottomSheetSelectLanguageRef={bottomSheetSelectLanguageRef}
        updateLanguage={updateLanguage}
      />
    </SafeAreaView>
  );
};

export default Settings;

const ClickableItem = props => {
  return (
    <Pressable
      style={({pressed}) =>
        tw`my-[2px] -ml-2 pl-2 py-3 flex-row items-center gap-4 rounded ${
          pressed ? 'bg-gray-200 dark:bg-slate-800' : ''
        } `
      }
      onPress={props?.handleNavigation}>
      {props?.icon}
      <Text
        style={[
          tw`${props?.titleClass} dark:text-white`,
          {fontFamily: 'Poppins-Regular'},
        ]}>
        {props?.title}
      </Text>
    </Pressable>
  );
};
