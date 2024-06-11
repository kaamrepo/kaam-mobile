import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  TouchableOpacity,
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
// import TermsAndCondtionsSVG '../../'
import useLoginStore from '../store/authentication/login.store';
import capitalizeFirstLetter from '../helper/utils/capitalizeFirstLetter';
import useUsersStore from '../store/authentication/user.store';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const CustomSidebarMenu = props => {
  const {logout, loggedInUser} = useLoginStore();
  const {updateFcmDeviceToken, updateActiveForJobsStatus} = useUsersStore();

  const [isEnabled, setIsEnabled] = useState(false);
  const translateX = useSharedValue(0);

  useEffect(() => {
    const initialStatus = loggedInUser?.activeforjobs || false;
    setIsEnabled(initialStatus);
    translateX.value = withTiming(initialStatus ? 20 : 0);
  }, [loggedInUser?.activeforjobs]); // Run only when loggedInUser?.activeforjobs changes

  const toggleSwitch = async value => {
    setIsEnabled(value);
    translateX.value = withTiming(value ? 20 : 0);

    try {
      console.log('isEnabled', isEnabled);
      const update = await updateActiveForJobsStatus(
        loggedInUser?._id,
        isEnabled,
      );
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

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={[tw`p-3 mt-4 h-[35%] items-center justify-center relative`]}>
        <Pressable
          style={({pressed}) =>
            tw`absolute rounded-full p-1 top-5 right-5 ${
              pressed ? 'bg-slate-200' : ''
            }`
          }
          onPress={() => {
            props.navigation.closeDrawer();
          }}>
          <Icon
            type={Icons.MaterialCommunityIcons}
            name={'close'}
            size={30}
            style={tw`text-black`}
          />
        </Pressable>
        {loggedInUser?.profilepic ? (
          <Image
            source={{uri: loggedInUser.profilepic}}
            style={styles.sideMenuProfileIcon}
          />
        ) : (
          <Image
            source={require('../assets/images/default-profile.jpg')}
            style={styles.sideMenuProfileIcon}
          />
        )}
        <Text
          style={[
            tw`text-black text-[24px]`,
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
            tw`text-zinc-600 text-[14px]`,
            {fontFamily: 'Poppins-Light'},
          ]}>
          Active for jobs
        </Text>
        {/* <TouchableOpacity
          onPress={toggleSwitch}
          style={[
            tw`w-10 h-6 justify-center rounded-full ${isEnabled ? 'bg-green-100 ' : 'bg-gray-300'}`,
          ]}
        >
          <Animated.View
            style={[
              tw`w-6 h-6 rounded-full shadow-md ${isEnabled ? 'bg-green-700 ' : 'bg-white'}`,
              animatedStyle,
            ]}
          />
        </TouchableOpacity> */}
        <Switch
          value={isEnabled}
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
            // subtitle={'80% complete'}
            subtitleStyle={tw`text-[#FE6D73] text-[12px]`}
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
            titleStyle={{color: '#E30000'}}
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
            tw`text-center text-black mb-10`,
            {fontFamily: 'Poppins-SemiBold'},
          ]}>
          kaam app LLC
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;

const CustomDrawerItem = props => {
  return (
    <Pressable
      onPress={props.onPress}
      style={({pressed}) =>
        tw`flex-row px-2 my-[3px] items-center justify-between rounded-md ${
          pressed
            ? 'bg-green-500/30'
            : props.id === props.index
            ? 'bg-green-200/30'
            : 'bg-white'
        }`
      }>
      <View style={tw`flex-row items-center gap-3 py-[10px] px-1`}>
        <View style={tw`px-1`}>{props.icon}</View>
        <Text
          style={[
            props.titleStyle ? props.titleStyle : tw`text-black`,
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
