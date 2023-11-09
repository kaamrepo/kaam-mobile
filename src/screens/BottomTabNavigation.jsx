import {TouchableOpacity, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon, {Icons} from '../components/Icons';
import * as Animatable from 'react-native-animatable';
import tw from 'twrnc';
import Dashboard from './dashboard/Dashboard';
import Inbox from './home/Inbox';
import Bookmark from './home/Bookmark';
import Menu from './home/Menu';

// svg icons
import HomeSVG from '../assets/svgs/home.svg';
import HomeInactiveSVG from '../assets/svgs/home_inactive.svg';

import MailSVG from '../assets/svgs/mail.svg';
import MailInactiveSVG from '../assets/svgs/mail_inactive.svg';

import BookmarkSVG from '../assets/svgs/bookmark.svg';
import BookmarkInactiveSVG from '../assets/svgs/bookmark_inactive.svg';

import MenuSVG from '../assets/svgs/menu.svg';
import MenuInactiveSVG from '../assets/svgs/menu_inactive.svg';

const Tab = createBottomTabNavigator();

const TabArr = [
  {
    route: 'Dashboard',
    label: 'Dashboard',
    component: Dashboard,
    activeIcon: <HomeSVG width={18} height={18} />,
    inactiveIcon: <HomeInactiveSVG width={18} height={18} />,
  },
  {
    route: 'Inbox',
    label: 'Inbox',
    component: Inbox,
    activeIcon: <MailSVG width={18} height={18} />,
    inactiveIcon: <MailInactiveSVG width={18} height={18} />,
  },
  {
    route: 'Plus',
    label: '+',
    component: Inbox,
    activeIcon: (
      <Icon type={Icons.FontAwesome5} name="plus" size={18} color={'black'} />
    ),
    inactiveIcon: (
      <Icon type={Icons.FontAwesome5} name="plus" size={18} color={'white'} />
    ),
  },
  {
    route: 'Bookmark',
    label: 'Bookmark',
    component: Bookmark,
    activeIcon: <BookmarkSVG width={18} height={18} />,
    inactiveIcon: <BookmarkInactiveSVG width={18} height={18} />,
  },
  {
    route: 'Menu',
    label: 'Menu',
    component: Menu,
    activeIcon: <MenuSVG width={18} height={18} />,
    inactiveIcon: <MenuInactiveSVG width={18} height={18} />,
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
          height: 60,
          // position: 'absolute',
          // bottom: 0,
          // right: 0,
          // left: 0,
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
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

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
                  focused ? 'bg-white' : 'bg-black'
                } w-14 h-14 rounded-full shadow-lg absolute -top-5`
              : ''
          }`,
          styles.container,
        ]}>
        {focused ? item.activeIcon : item.inactiveIcon}
        {!isMiddleElement && (
          <View
            style={tw`mt-[2px] w-[3px] h-[3px] rounded-full ${
              focused ? `bg-green-600 shadow shadow-green-600` : 'bg-white'
            }`}></View>
        )}
      </Animatable.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
