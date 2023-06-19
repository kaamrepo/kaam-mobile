import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

// Screens
import Feed from './Feed';
import BottomTabNavigation from './BottomTabNavigation';

function DrawerNavigation()
{
    return (
        <Drawer.Navigator drawerStyle={{
            width: 240,
        }}>
            <Drawer.Screen name="BottomTabNavigation"
                component={BottomTabNavigation}
                options={{ headerShown: false, drawerItemStyle: { display: 'none' } }}
            />
            <Drawer.Screen name="Feed2" component={Feed} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigation;