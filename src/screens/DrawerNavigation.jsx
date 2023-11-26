import {Pressable} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

// Screens
import BottomTabNavigation from './BottomTabNavigation';
import CustomSidebarMenu from './CustomSidebarMenu';
import PersonalInfo from './drawer-screens/PersonalInfo';
import Applications from './drawer-screens/Applications';
import Proposals from './drawer-screens/Proposals';
import Resumes from './drawer-screens/Resumes';
import Portfolio from './drawer-screens/Portfolio';
import Settings from './drawer-screens/Settings';
import Icon, {Icons} from '../components/Icons';
import tw from 'twrnc';
import ViewProfile from './drawer-screens/ViewProfile';

function DrawerNavigation() {
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
      {/* <Drawer.Screen name="View Profile" component={ViewProfile} /> */}
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={({navigation}) => ({
          headerLeft: () => (
            <Pressable
              style={({pressed}) =>
                tw`mx-2 h-10 w-10 items-center justify-center rounded-full ${
                  pressed ? 'bg-gray-200' : ''
                } `
              }
              onPress={() => {
                navigation.goBack();
                navigation.openDrawer();
              }}>
              <Icon
                type={Icons.Ionicons}
                name={'chevron-back'}
                size={25}
                color={'black'}
              />
            </Pressable>
          ),
          headerStyle: {backgroundColor: '#FAFAFD'},
          headerTransparent: false,
          headerShadowVisible: false,
          headerTitle: 'Settings',
          headerTitleAlign: 'center',
          headerTitleStyle: {fontFamily: 'Poppins-SemiBold'},
          headerShown: true,
        })}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
