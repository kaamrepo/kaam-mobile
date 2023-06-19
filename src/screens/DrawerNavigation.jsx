import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

// Screens
import Feed from './Feed';
import BottomTabNavigation from './BottomTabNavigation';
import CustomSidebarMenu from './CustomSidebarMenu';

function DrawerNavigation()
{
    return (
        <Drawer.Navigator
            drawerStyle={{
                width: 240,
            }}
            drawerContent={props => <CustomSidebarMenu {...props} />}
        >
            <Drawer.Screen name="BottomTabNavigation"
                component={BottomTabNavigation}
                options={{ headerShown: false, drawerItemStyle: { display: 'none' } }}
            />
            <Drawer.Screen name="Personal Info" component={Feed} />
            <Drawer.Screen name="Applications" component={Feed} />
            <Drawer.Screen name="Proposals" component={Feed} />
            <Drawer.Screen name="Resumes" component={Feed} />
            <Drawer.Screen name="Portfolio" component={Feed} />
            <Drawer.Screen name="Settings" component={Feed} />
            <Drawer.Screen name="Logout" component={Feed} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigation;