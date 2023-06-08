import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity,Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import Image1 from '../../assets/images/browse-jobs.png';
import {SafeAreaView} from 'react-native-safe-area-context';

const jobDescription = {
  image: Image1,
};

const ApplyNow = ({navigation}) => {
  const handleAppliedJob =()=>{
    console.log("clicked on handle job ");
    navigation.navigate('Chat');
    
    }
  const [activeTab, setActiveTab] = useState('description');

  const handleBackPress = () => {
    // Handle back button press logic here
    console.log('Back button pressed!');
    navigation.goBack();
  };

  const handleBookmarkPress = () => {
    // Handle bookmark button press logic here
    console.log('Bookmark button pressed!');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <View style={tw`p-4`}>
            <Text style={tw`text-lg`}>Job Description</Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum volutpat vestibulum augue a ultricies. Maecenas eget
              mi id justo egestas vehicula. Mauris finibus justo sed magna
              ullamcorper, ac gravida dui faucibus. Aenean mollis metus ut
              ligula viverra, id ullamcorper mi pretium. Nulla facilisi.
            </Text>
          </View>
        );
      case 'requirement':
        return (
          <View style={tw`p-4`}>
            <Text style={tw`text-lg`}>Job Requirement</Text>
            <Text>
              Nullam sagittis quam euismod, pulvinar ligula a, faucibus nunc.
              Vivamus in arcu tristique, eleifend sem nec, cursus nunc. Nulla
              sed volutpat justo, id tincidunt velit. Etiam luctus mauris ac
              turpis mollis, id euismod ligula ultricies.
            </Text>
          </View>
        );
      case 'about':
        return (
          <View style={tw`p-4`}>
            <Text style={tw`text-lg`}>About the Company</Text>
            <Text>
              Fusce gravida sollicitudin massa in luctus. Nam efficitur metus
              eu erat bibendum rhoncus. Aliquam nec sapien at lectus
              pellentesque sagittis. Sed blandit sapien eget efficitur
              ullamcorper. Vestibulum lacinia ligula sit amet lorem mattis
              consectetur.
            </Text>
          </View>
        );
      case 'review':
        return (
          <View style={tw`p-4`}>
            <Text style={tw`text-lg`}>Review</Text>
            <Text>
              Donec eu mi at orci fringilla condimentum. Phasellus malesuada
              metus nec purus lacinia ultrices. Proin ac congue ipsum, vitae
              consectetur quam. Pellentesque habitant morbi tristique
              senectus et netus et malesuada fames ac turpis egestas.
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={tw`flex-1`} edges={['top']}>

    <View style={tw`flex-1`}>
      <View style={tw`flex-1 bg-blue-500`}>
        <View style={tw`flex-row items-center justify-between p-4`}>
        <View style={tw`mt-5`}>
          <TouchableOpacity onPress={handleBackPress}>
            <Ionicons
              name="chevron-back"
              size={24}
              style={tw`text-white`}
            />
          </TouchableOpacity>
          </View>
          <View style={tw`flex flex-row items-center justify-end absolute top-10 right-4`}>
            <TouchableOpacity onPress={handleBookmarkPress}>
              <Icon name="bookmark" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw`flex items-center justify-center p-4`}>
          <Image
            source={jobDescription.image}
            style={tw`w-48 h-48 rounded-full`}
          />
          <Text style={tw`text-xl font-bold mt-2 text-white`}>John Doe</Text>
          <Text style={tw`text-lg text-white`}>Software Engineer</Text>
        </View>
        <View style={tw`flex-row justify-between items-center m-4 px-5`}>
          <View>
            <Text style={tw`text-lg font-bold text-white`}>988888 /y</Text>
          </View>
          <View>
            <Text style={tw`text-lg font-bold text-white`}>India, Pune</Text>
          </View>
        </View>
      </View>
      <View style={tw`flex-1 bg-white`}>
        <View style={tw`flex-row justify-between items-center p-4 bg-white`}>
          <TouchableOpacity onPress={() => handleTabChange('description')}>
            <Text style={tw`${activeTab === 'description' ? 'text-blue-500' : 'text-gray-500'} font-bold`}>
              Description
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTabChange('requirement')}>
            <Text style={tw`${activeTab === 'requirement' ? 'text-blue-500' : 'text-gray-500'} font-bold`}>
              Requirement
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTabChange('about')}>
            <Text style={tw`${activeTab === 'about' ? 'text-blue-500' : 'text-gray-500'} font-bold`}>
              About
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTabChange('review')}>
            <Text style={tw`${activeTab === 'review' ? 'text-blue-500' : 'text-gray-500'} font-bold`}>
              Review
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`flex`}>{renderTabContent()}</View>
        
        <Pressable
              onPress={handleAppliedJob}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#418c4d' : '#4A9D58',
                },
                 tw`px-8 py-2 flex justify-center items-center rounded-xl mx-8 mt-5`,
              ]}>
              {({ pressed }) => (
                <Text style={tw`text-white text-[24px] py-2 font-medium`}>
                  Apply Now
                </Text>
              )}
            </Pressable>
      </View>
    </View>
    </SafeAreaView>
  );
};

export default ApplyNow;
