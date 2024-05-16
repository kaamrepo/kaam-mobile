import React,{useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  TouchableOpacity
} from 'react-native';

import {DrawerContentScrollView} from '@react-navigation/drawer';
import tw from 'twrnc';
import Icon, {Icons} from '../components/Icons';

// SVGIcons

import PersonalInformationSVG from '../assets/svgs/Personal Information.svg';
import SettingsSVG from '../assets/svgs/Settings.svg';
import LogoutSVG from '../assets/svgs/Logout.svg';
import BlueTickSVG from '../assets/svgs/Blue Tick.svg';
import PremiumIconSVG from '../assets/svgs/PremiumIcon.svg';

// Store
import useLoginStore from '../store/authentication/login.store';
import capitalizeFirstLetter from '../helper/utils/capitalizeFirstLetter';
import useUsersStore from '../store/authentication/user.store';
import EncryptedStorage from 'react-native-encrypted-storage';

const CustomSidebarMenu = props => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };
  const {logout, loggedInUser} = useLoginStore();
  const {updateFcmDeviceToken} = useUsersStore();
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
          ]}>{`${capitalizeFirstLetter(
          loggedInUser?.firstname,
        )} ${capitalizeFirstLetter(loggedInUser?.lastname)}`}</Text>
        <View style={tw`flex-row`}>
          <Text
            style={[
              tw`text-zinc-600 text-[14px]`,
              {fontFamily: 'Poppins-Light'},
            ]}>
            Comming soon...
          </Text>
          <BlueTickSVG width={20} height={20} />
        </View>
       
      </View>
      <View style={[tw`flex flex-row border-2 justify-center items-center`]}>
      <Text
        style={[
          tw`text-zinc-600 text-[14px]`,
          { fontFamily: 'Poppins-Light' },
        ]}
      >
        Active for jobs
      </Text>
        <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleSwitch}
      style={[
        tw`relative w-10 h-6 bg-gray-300 rounded-full`,
        isEnabled ? tw`bg-white` : null,
      ]}
    >
      <View
        style={[
          tw`absolute left-0 w-6 h-6 bg-white rounded-full shadow-md transform translate-x-0.5`,
          isEnabled ? tw`translate-x-full` : null,
        ]}
      />
    </TouchableOpacity>
    </View>
      <DrawerContentScrollView {...props}>
        <View style={tw`px-4`}>
          <CustomDrawerItem
            title="View Profile"
            id={1}
            index={props?.state?.index}
            icon={<PersonalInformationSVG />}
            subtitle={'80% complete'}
            subtitleStyle={tw`text-[#FE6D73] text-[12px]`}
            onPress={() => props.navigation.navigate('View Profile')}
          />
          <CustomDrawerItem
            title="Contact & Support"
            id={2}
            index={props?.state?.index}
            icon={<SettingsSVG />}
            onPress={() => props.navigation.navigate('Contact And Support')}
          />
          <CustomDrawerItem
            title="Settings"
            id={3}
            index={props?.state?.index}
            icon={<SettingsSVG />}
            onPress={() => props.navigation.navigate('Settings')}
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
          <View style={tw`items-center mt-12`}>
            <Pressable
              onPress={props.onPress}
              style={({pressed}) =>
                tw`my-3 px-5 py-3 flex-row gap-2 items-center justify-center rounded-xl shadow-lg shadow-green-800 ${
                  pressed ? 'bg-green-800' : 'bg-green-700'
                }`
              }>
              <PremiumIconSVG height={18} />
              <Text
                style={[
                  tw`text-center text-white`,
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                Go Premium
              </Text>
            </Pressable>
          </View>
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
    // resizeMode: 'center',
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
