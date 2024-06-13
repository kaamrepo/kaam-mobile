import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  useColorScheme,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import tw from 'twrnc';
import Icon, {Icons} from '../components/Icons';
import Toast from 'react-native-toast-message';
import {Switch} from 'react-native-switch';
import PersonalInformationSVG from '../assets/svgs/Personal Information.svg';
import SettingsSVG from '../assets/svgs/Settings.svg';
import LogoutSVG from '../assets/svgs/Logout.svg';
import useLoginStore from '../store/authentication/login.store';
import capitalizeFirstLetter from '../helper/utils/capitalizeFirstLetter';
import useUsersStore from '../store/authentication/user.store';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useSharedValue, withTiming} from 'react-native-reanimated';

const CustomSidebarMenu = props => {
  useColorScheme();
  const {logout, loggedInUser} = useLoginStore();
  const {updateFcmDeviceToken, updateActiveForJobsStatus} = useUsersStore();

  const translateX = useSharedValue(0);

  useEffect(() => {
    const initialStatus = loggedInUser?.activeforjobs || false;
    translateX.value = withTiming(initialStatus ? 20 : 0);
  }, [loggedInUser?.activeforjobs]);
  const toggleSwitch = async value => {
    translateX.value = withTiming(value ? 20 : 0);

    try {
      const update = await updateActiveForJobsStatus(loggedInUser?._id, value);
      if (update) {
        Toast.show({
          type: 'success',
          text1: 'Status updated',
          position: 'top',
        });
      } else {
        Toast.show({
          type: 'tomatoToast',
          text1: 'Unable to update status',
          position: 'top',
          visibilityTime: 2000,
        });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      Toast.show({
        type: 'error',
        text1: 'An error occurred',
        position: 'top',
        visibilityTime: 2000,
      });
    }
  };

  return (
    <SafeAreaView style={[tw`flex-1 dark:bg-gray-900`]}>
      <View style={[tw`p-3 mt-4 h-[35%] items-center justify-center relative`]}>
        <Pressable
          style={({pressed}) =>
            tw`absolute rounded-full p-1 top-5 right-5 ${
              pressed ? 'bg-slate-200 dark:bg-slate-800' : ''
            }`
          }
          onPress={() => {
            props.navigation.closeDrawer();
          }}>
          <Icon
            type={Icons.MaterialCommunityIcons}
            name={'close'}
            size={30}
            style={tw`text-black dark:text-white`}
          />
        </Pressable>
        {loggedInUser?.profilepic ? (
          <Image source={{uri: loggedInUser.profilepic}} style={[tw``]} />
        ) : (
          <Image
            source={require('../assets/images/default-profile.jpg')}
            style={[tw`h-20 w-20`]}
          />
        )}
        <Text
          style={[
            tw`text-black dark:text-white text-[24px] mt-3`,
            {fontFamily: 'Poppins-SemiBold'},
          ]}>
          {`${capitalizeFirstLetter(
            loggedInUser?.firstname,
          )} ${capitalizeFirstLetter(loggedInUser?.lastname)}`}
        </Text>
      </View>
      <View style={[tw`flex flex-row py-2  justify-center items-center gap-2`]}>
        <Text
          style={[
            tw`text-slate-600 dark:text-slate-300 text-[14px] mx-2`,
            {fontFamily: 'Poppins-Light'},
          ]}>
          Active for jobs
        </Text>
        <Switch
          value={loggedInUser?.activeforjobs}
          onValueChange={toggleSwitch}
          circleSize={30}
          barHeight={20}
          circleBorderWidth={0}
          backgroundActive={'#86d3ff'}
          backgroundInactive={'#d3d3d3'}
          circleActiveColor={'#009688'}
          circleInActiveColor={'#ffffff'}
        />
      </View>
      <DrawerContentScrollView {...props}>
        <View style={tw`px-4`}>
          <CustomDrawerItem
            title="Profile"
            id={1}
            index={props?.state?.index}
            icon={<PersonalInformationSVG />}
            onPress={() => props.navigation.navigate('View Profile')}
          />
          <CustomDrawerItem
            title="Contact & Support"
            id={2}
            index={props?.state?.index}
            icon={<SettingsSVG />}
            onPress={() => props.navigation.navigate('ContactSupport')}
          />
          <CustomDrawerItem
            title="Settings"
            id={3}
            index={props?.state?.index}
            icon={<SettingsSVG />}
            onPress={() => props.navigation.navigate('Settings')}
          />
          <CustomDrawerItem
            title="Terms and conditions"
            id={3}
            index={props?.state?.index}
            icon={<SettingsSVG />}
            onPress={() => props.navigation.navigate('TermsAndConditions')}
          />
          <CustomDrawerItem
            title="About Us"
            id={3}
            index={props?.state?.index}
            icon={<SettingsSVG />}
            onPress={() => props.navigation.navigate('AboutUs')}
          />
          <CustomDrawerItem
            title="Logout"
            id={4}
            titleStyle={tw`text-red-600`}
            index={props?.state?.index}
            icon={<LogoutSVG />}
            onPress={async () => {
              const fcmToken = await EncryptedStorage.getItem('fcmToken');
              if (fcmToken) {
                updateFcmDeviceToken({
                  firebasetokens: [fcmToken],
                  isLogout: true,
                });
              }
              logout();
            }}
          />
        </View>
      </DrawerContentScrollView>

      <View style={tw``}>
        <Text
          style={[
            tw`text-center text-black dark:text-white mb-10`,
            {fontFamily: 'Poppins-SemiBold'},
          ]}>
          kaam app LLC
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default CustomSidebarMenu;

const CustomDrawerItem = props => {
  return (
    <Pressable
      onPress={props.onPress}
      style={({pressed}) =>
        tw`flex-row px-2 my-[3px] items-center justify-between rounded-md ${
          pressed
            ? 'bg-green-500/30 dark:bg-gray-700'
            : props.id === props.index
            ? 'bg-green-200/30 dark:bg-gray-700'
            : 'bg-white dark:bg-gray-800'
        }`
      }>
      <View style={tw`flex-row items-center gap-3 py-[10px] px-1`}>
        <View style={tw`px-1`}>{props.icon}</View>
        <Text
          style={[
            props.titleStyle ? props.titleStyle : tw`text-black dark:text-white`,
            {fontFamily: 'Poppins-Regular'},
          ]}>
          {props.title}
        </Text>
      </View>
      <Text style={[props.subtitleStyle, {fontFamily: 'Poppins-Regular'}]}>
        {props.subtitle}
      </Text>
    </Pressable>
  );
};
