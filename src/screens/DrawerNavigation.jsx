import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

// Screens
import Feed from './Feed';
import BottomTabNavigation from './BottomTabNavigation';
import CustomSidebarMenu from './CustomSidebarMenu';
import PersonalInfo from './drawer-screens/PersonalInfo';
import Applications from './drawer-screens/Applications';
import Proposals from './drawer-screens/Proposals';
import Resumes from './drawer-screens/Resumes';
import Portfolio from './drawer-screens/Portfolio';
import Settings from './drawer-screens/Settings';

function DrawerNavigation()
{
    return (
        <Drawer.Navigator
            drawerStyle={{
                width: 240,
            }}
            screenOptions={{ headerShown: false }}
            drawerContent={props => <CustomSidebarMenu {...props} />}
        >
            <Drawer.Screen name="BottomTabNavigation"
                component={BottomTabNavigation}
                options={{ headerShown: false, drawerItemStyle: { display: 'none' } }}
            />
            <Drawer.Screen name="Personal Info" component={PersonalInfo} />
            <Drawer.Screen name="Applications" component={Applications} />
            <Drawer.Screen name="Proposals" component={Proposals} />
            <Drawer.Screen name="Resumes" component={Resumes} />
            <Drawer.Screen name="Portfolio" component={Portfolio} />
            <Drawer.Screen name="Settings" component={Settings} />
            <Drawer.Screen name="Logout" component={Feed} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigation;