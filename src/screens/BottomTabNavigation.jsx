import { TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon, { Icons } from '../components/Icons';
import * as Animatable from 'react-native-animatable';

import Home from './home/Home';
import Inbox from './home/Inbox';
import Bookmark from './home/Bookmark';
import Menu from './home/Menu';

const Tab = createBottomTabNavigator();

const TabArr = [
    { route: 'Home', label: 'Home', type: Icons.Ionicons, activeIcon: 'home', inActiveIcon: 'home-outline', component: Home },
    { route: 'Inbox', label: 'Inbox', type: Icons.MaterialCommunityIcons, activeIcon: 'email', inActiveIcon: 'email-outline', component: Inbox },
    { route: 'Bookmark', label: 'Bookmark', type: Icons.MaterialCommunityIcons, activeIcon: 'bookmark', inActiveIcon: 'bookmark-outline', component: Bookmark },
    { route: 'Menu', label: 'Menu', type: Icons.Ionicons, activeIcon: 'grid', inActiveIcon: 'grid-outline', component: Menu },
];


const BottomTabNavigation = () =>
{
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 60,
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    left: 16,
                    borderRadius: 16
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
                <Icon type={item.type} name={focused ? item.activeIcon : item.inActiveIcon} color={focused ? '#4A9D58' : '#CACBCE'} />
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