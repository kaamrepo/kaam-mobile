import {Pressable, useColorScheme} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

// Screens
import BottomTabNavigation from './BottomTabNavigation';
import CustomSidebarMenu from './CustomSidebarMenu';
import PersonalInfo from './drawer-screens/PersonalInfo';

import Settings from './drawer-screens/Settings';
import Icon, {Icons} from '../components/Icons';
import tw from 'twrnc';
import {ContactSupport} from './drawer-screens/ContactSupport';
import {TermsAndConditions} from './drawer-screens/settings/TermsAndConditions';
import {AboutUs} from './drawer-screens/AboutUs';

function DrawerNavigation() {
  useColorScheme()
  return (
    <Drawer.Navigator
      drawerStyle={{
        width: 240,
      }}
      screenOptions={{headerShown: false}}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
        options={{headerShown: false, drawerItemStyle: {display: 'none'}}}
      />
      <Drawer.Screen name="View Profile" component={PersonalInfo} />
      <Drawer.Screen name="ContactSupport" component={ContactSupport} />
      <Drawer.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Drawer.Screen name="AboutUs" component={AboutUs} />
      {/* <Drawer.Screen name="View Profile" component={ViewProfile} /> */}
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={({navigation}) => ({
          headerLeft: () => (
            <Pressable
              style={({pressed}) =>
                tw`mx-2 h-10 w-10 items-center justify-center rounded-full ${
                  pressed ? 'bg-gray-200 dark:bg-gray-800' : ''
                } `
              }
              onPress={() => {
                navigation.goBack();
                navigation.openDrawer();
              }}>
              <Icon
                type={Icons.Ionicons}
                name={'chevron-back'}
                size={20}
               style={tw`text-black dark:text-white`}
              />
            </Pressable>
          ),

          headerTransparent: false,
          headerShadowVisible: false,
          headerTitle: 'Settings',
          headerTitleAlign: 'center',
          headerShown: true,
          headerStyle: [tw`bg-[#FAFAFD] dark:bg-slate-900`],
          headerTitleStyle: [
            tw`text-black dark:text-white`,
            {fontFamily: 'Poppins-SemiBold'},
          ],
        })}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
