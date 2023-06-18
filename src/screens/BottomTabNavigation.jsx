import { TouchableOpacity, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon, { Icons } from '../components/Icons';
import * as Animatable from 'react-native-animatable';
import tw from 'twrnc';
import Dashboard from './dashboard/Dashboard';
import Inbox from './home/Inbox';
import Bookmark from './home/Bookmark';
import Menu from './home/Menu';

// svg icons
import HomeSVG from '../assets/svgs/home.svg'
import HomeInactiveSVG from '../assets/svgs/home_inactive.svg'

import MailSVG from '../assets/svgs/mail.svg'
import MailInactiveSVG from '../assets/svgs/mail_inactive.svg'

import BookmarkSVG from '../assets/svgs/bookmark.svg'
import BookmarkInactiveSVG from '../assets/svgs/bookmark_inactive.svg'

import MenuSVG from '../assets/svgs/menu.svg'
import MenuInactiveSVG from '../assets/svgs/menu_inactive.svg'


const Tab = createBottomTabNavigator();

const TabArr = [
    { route: 'Dashboard', label: 'Dashboard', component: Dashboard, activeIcon: <HomeSVG width={18} height={18} />, inactiveIcon: <HomeInactiveSVG width={18} height={18} /> },
    { route: 'Inbox', label: 'Inbox', component: Inbox, activeIcon: <MailSVG width={18} height={18} />, inactiveIcon: <MailInactiveSVG width={18} height={18} /> },
    { route: 'Bookmark', label: 'Bookmark', component: Bookmark, activeIcon: <BookmarkSVG width={18} height={18} />, inactiveIcon: <BookmarkInactiveSVG width={18} height={18} /> },
    { route: 'Menu', label: 'Menu', component: Menu, activeIcon: <MenuSVG width={18} height={18} />, inactiveIcon: <MenuInactiveSVG width={18} height={18} /> },
];


const BottomTabNavigation = () =>
{
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    height: 50,
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    left: 0,

                }
            }}
        >
            {TabArr.map((item, index) =>
            {
                return (
                    <Tab.Screen key={index} name={item.route} component={item.component}
                        options={{
                            tabBarShowLabel: false,
                            tabBarButton: (props) => <TabButton {...props} item={item} />
                        }}
                    />
                )
            })}
        </Tab.Navigator >
    )
}

export default BottomTabNavigation

const TabButton = (props) =>
{
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);

    useEffect(() =>
    {
        if (focused)
        {
            viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 1.3 } });
        } else
        {
            viewRef.current.animate({ 0: { scale: 1.3 }, 1: { scale: 1 } });
        }
    }, [focused])

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={styles.container}>
            <Animatable.View
                ref={viewRef}
                duration={1000}
                style={styles.container}>
                {focused ? item.activeIcon : item.inactiveIcon}
                {/* <Icon type={item.type} name={focused ? item.activeIcon : item.inActiveIcon} color={item.iconColor} size={20} /> */}
                <View style={tw`mt-[2px] w-[3px] h-[3px] rounded-full ${ focused ? `bg-green-600 shadow shadow-green-600` : "bg-white" }`}></View>
            </Animatable.View>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})