import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import GeneralStatusBar from '../../components/GeneralStatusBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';

import {primaryBGColor} from '../../helper/utils/colors';
import MyAppliedJobs from '../job-application/MyAppliedJobs';
import MyPostedJobs from '../job-application/MyPostedJobs';

const TopTabItems = [<MyAppliedJobs />, <MyPostedJobs />];
const Menu = () => {
  useColorScheme();
  const [activeTab, setActiveTab] = useState(0);
  const navbarButtons = [{title: 'My Applied Jobs'}, {title: 'My Posted Jobs'}];

  return (
    <SafeAreaView
      style={tw`flex-1 px-5 py-6 bg-white dark:bg-gray-950`}
      edges={['top']}>
      <GeneralStatusBar />

      <View
        style={tw`flex flex-row bg-zinc-100 dark:bg-gray-800 p-1.5 rounded-xl`}>
        {navbarButtons.map((button, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setActiveTab(index)}
            style={[
              tw`w-1/2 h-10.5 flex items-center justify-center rounded-lg ${
                index === activeTab ? `bg-[${primaryBGColor}] shadow-lg` : ''
              }`,
            ]}>
            <Text
              style={[
                tw`text-gray-500 ${index === activeTab ? 'text-white' : ''}`,
                {fontFamily: 'Poppins-SemiBold'},
              ]}>
              {button.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {TopTabItems[activeTab]}
    </SafeAreaView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  navbarButton: {
    marginHorizontal: 10,
  },
  activeButton: {
    backgroundColor: 'lightblue', // Highlight the active button
  },
  flatListItemContainer: {
    width: '100%',
    padding: 15,
  },
  flatListItemText: {
    fontSize: 18,
  },
});
