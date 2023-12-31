import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Menu from './home/Menu';
import {View} from 'react-native';

const Tab = createMaterialTopTabNavigator();

export function TopTabNavigationsMenu() {
  return (
    <View>
      <Tab.Navigator>
        <Tab.Screen name="My Applied Jobs" component={Menu} />
        {/* <Tab.Screen name="My Posted Jobs" component={SettingsScreen} /> */}
      </Tab.Navigator>
    </View>
  );
}
