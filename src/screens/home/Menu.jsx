import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import GeneralStatusBar from '../../components/GeneralStatusBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';

import {primaryBGColor} from '../../helper/utils/colors';
import MyAppliedJobs from '../jobs/MyAppliedJobs';
import MyPostedJobs from '../jobs/MyPostedJobs';

const TopTabItems = [<MyAppliedJobs />, <MyPostedJobs />];
const Menu = ({navigation}) => {
  const [activeTab, setActiveTab] = useState(0);

  const navbarButtons = [{title: 'My Applied Jobs'}, {title: 'My Posted Jobs'}];

  return (
    <SafeAreaView style={tw`flex-1 px-5 py-6 bg-white`} edges={['top']}>
      <GeneralStatusBar backgroundColor={'#F0F0F0'} />
      <ScrollView
        style={tw``}
        contentContainerStyle={{
          flex: 1,
          // justifyContent: 'center',
          // alignItems: 'center',
        }}>
        <View style={tw`flex flex-row bg-zinc-100 p-1.5 rounded-xl`}>
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

        <View style={tw`mt-3`}>{TopTabItems[activeTab]}</View>
      </ScrollView>
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
