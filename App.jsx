import 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/login/Login';
import HomeScreen from './src/screens/home/Home';
const Stack = createNativeStackNavigator();

const App = () => {
  return (  
    // <Stack.Navigator>
    //   <Stack.Screen name="login_route" component={LoginScreen} />
    //   <Stack.Screen name="home_route" component={HomeScreen} />
    // </Stack.Navigator>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login_route" title="testing" component={LoginScreen} />
        <Stack.Screen name="home_route" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
