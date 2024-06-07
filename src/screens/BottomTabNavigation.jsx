import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import Icon, {Icons} from '../components/Icons';
import * as Animatable from 'react-native-animatable';
import tw from 'twrnc';
import Dashboard from './dashboard/Dashboard';
import JobPostingForm from './bottom-bar/JobPostingForm';
import Bookmark from './bottom-bar/Bookmark';
import Menu from './bottom-bar/Menu';
import LinearGradient from 'react-native-linear-gradient';

// svg icons
import HomeSVG from '../assets/svgs/home.svg';
import HomeInactiveSVG from '../assets/svgs/home_inactive.svg';

import MenuSVG from '../assets/svgs/menu.svg';
import MenuInactiveSVG from '../assets/svgs/menu_inactive.svg';
import {
  primaryBGColor,
  primaryTextColor,
  secondaryTextColor,
} from '../helper/utils/colors';
const Tab = createBottomTabNavigator();

const TabArr = [
  {
    route: 'Dashboard',
    label: 'Dashboard',
    component: Dashboard,
    activeIcon: <HomeSVG width={24} height={24} />,
    inactiveIcon: <HomeInactiveSVG width={18} height={18} />,
  },
  // {
  //   route: 'Inbox',
  //   label: 'Inbox',
  //   component: Engagments,
  //   activeIcon: <MailSVG width={18} height={18} />,
  //   inactiveIcon: <MailInactiveSVG width={18} height={18} />,
  // },
  {
    route: 'Plus',
    label: '+',
    component: JobPostingForm,
    activeIcon: (
      <Icon
        type={Icons.FontAwesome5}
        name="plus"
        size={18}
        color={secondaryTextColor}
      />
    ),
    inactiveIcon: (
      <Icon
        type={Icons.FontAwesome5}
        name="plus"
        size={18}
        color={primaryTextColor}
      />
    ),
  },
  // {
  //   route: 'Bookmark',
  //   label: 'Bookmark',
  //   component: Bookmark,
  //   activeIcon: <BookmarkSVG width={18} height={18} />,
  //   inactiveIcon: <BookmarkInactiveSVG width={18} height={18} />,
  // },
  {
    route: 'Menu',
    label: 'Menu',
    component: Menu,

    activeIcon: <MenuSVG width={24} height={24} />,
    inactiveIcon: <MenuInactiveSVG width={19} height={19} />,
  },
];

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          height: 60,
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
        },

        headerBackgroundContainerStyle: {
          backgroundColor: 'transparent',
        },
      }}>
      {TabArr.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.route}
          component={item.component}
          options={{
            tabBarShowLabel: false,
            tabBarButton: props => (
              <TabButton
                {...props}
                item={item}
                isMiddleElement={Math.floor(TabArr.length / 2) === index}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const TabButton = props => {
  const {item, onPress, accessibilityState, isMiddleElement} = props;
  const viewRef = useRef(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const focused = accessibilityState.selected || popupVisible;

  useEffect(() => {
    if (!isMiddleElement) {
      if (focused) {
        viewRef.current.animate({0: {scale: 1}, 1: {scale: 1.3}});
      } else {
        viewRef.current.animate({0: {scale: 1.3}, 1: {scale: 1}});
      }
    } else {
      // if this is middle tab button
      if (focused) {
        viewRef.current.animate({0: {rotate: '0deg'}, 1: {rotate: '45deg'}});
      } else {
        viewRef.current.animate({0: {rotate: '45deg'}, 1: {rotate: '0deg'}});
      }
    }
  }, [focused]);

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        style={[tw`relative`, styles.container]}>
        <Animatable.View
          ref={viewRef}
          duration={1000}
          style={[
            tw`${
              isMiddleElement
                ? `${
                    focused
                      ? `bg-[${primaryBGColor}]`
                      : `bg-white border-2 border-[${primaryTextColor}]`
                  } w-14 h-14 rounded-full shadow-lg absolute -top-[48%]`
                : ''
            }`,
            styles.container,
            {zIndex: 20},
          ]}>
          {focused ? item.activeIcon : item.inactiveIcon}
          {!isMiddleElement && (
            <View
              style={tw`mt-[2px] w-[3px] h-[3px] rounded-full z-50 ${
                focused ? `bg-green-600 shadow shadow-green-600` : 'bg-white'
              }`}></View>
          )}
        </Animatable.View>
      </TouchableOpacity>
    </>
  );
};

const PopupMenu = ({visible}) => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={[
        'rgba(56, 130, 246, 0)',
        'rgba(56, 130, 246, 0.3)',
        'rgba(56, 130, 246, 0.6)',
      ]}
      style={tw`${
        visible
          ? 'flex h-[200px] w-full absolute left-0 right-0 bottom-[100%] justify-end items-center'
          : 'hidden'
      }`}>
      <View
        style={[
          tw`flex h-[90px] w-[45%] mb-1 justify-center items-center bg-white rounded-t-lg`,
        ]}>
        <TouchableOpacity
          onPress={() => {
            console.log('create new job pressed!');
            navigation.navigate('Bookmark');
          }}
          style={tw`px-3 py-2 border-2 border-blue-500 rounded-md`}>
          <Text
            style={[
              tw`text-blue-500 text-[13px]`,
              {fontFamily: 'Poppins-SemiBold'},
            ]}>
            Create New Job
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
