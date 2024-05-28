import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import tw from 'twrnc';
import Image1 from '../../assets/images/browse-jobs.png';
import Image2 from '../../assets/images/IntroScreenJobsAndInvitations.png';
import Image3 from '../../assets/images/search-dream-job.png';
import Image4 from '../../assets/images/checklist.png';
import {SafeAreaView} from 'react-native-safe-area-context';
import GeneralStatusBar from '../../components/GeneralStatusBar';
import Icon, {Icons} from '../../components/Icons';

const Bookmark = ({navigation}) => {
  const featuredJobs = [
    {
      image: Image1,
      title: 'Jr Executive',
      description: 'Tester',
      value: 960000,
      location: 'Delhi',
      workshift: 'Full-time',
      status: 'closed',
      color: 'red',
    },
    {
      image: Image2,
      title: 'Jr Engineer',
      description: 'Devloper',
      value: 98765,
      location: 'Pune',
      workshift: 'Over-Time',
      status: 'open',
      color: 'green',
    },
    {
      image: Image3,
      title: 'Sr tester',
      description: 'Automation',
      value: 576778,
      location: 'Mumbai',
      workshift: 'Part-time',
      status: 'applied',
      color: 'blue',
    },
    {
      image: Image4,
      title: 'Manager',
      description: 'Delivery Manager',
      value: 576744,
      location: 'Mumbai',
      workshift: 'Full-time',
      status: 'inreview',
      color: 'gray',
    },
    {
      image: Image1,
      title: 'Jr Executive',
      description: 'Tester',
      value: 960000,
      location: 'Delhi',
      workshift: 'Full-time',
      status: 'closed',
      color: 'red',
    },
    {
      image: Image2,
      title: 'Jr Engineer',
      description: 'Devloper',
      value: 98765,
      location: 'Pune',
      workshift: 'Over-Time',
      status: 'open',
      color: 'green',
    },
    {
      image: Image3,
      title: 'Sr tester',
      description: 'Automation',
      value: 576778,
      location: 'Mumbai',
      workshift: 'Part-time',
      status: 'applied',
      color: 'blue',
    },
    {
      image: Image4,
      title: 'Manager',
      description: 'Delivery Manager',
      value: 576744,
      location: 'Mumbai',
      workshift: 'Full-time',
      status: 'inreview',
      color: 'gray',
    },
    {
      image: Image1,
      title: 'Jr Executive',
      description: 'Tester',
      value: 960000,
      location: 'Delhi',
      workshift: 'Full-time',
      status: 'closed',
      color: 'red',
    },
    {
      image: Image2,
      title: 'Jr Engineer',
      description: 'Devloper',
      value: 98765,
      location: 'Pune',
      workshift: 'Over-Time',
      status: 'open',
      color: 'green',
    },
    {
      image: Image3,
      title: 'Sr tester',
      description: 'Automation',
      value: 576778,
      location: 'Mumbai',
      workshift: 'Part-time',
      status: 'applied',
      color: 'blue',
    },
    {
      image: Image4,
      title: 'Manager',
      description: 'Delivery Manager',
      value: 576744,
      location: 'Mumbai',
      workshift: 'Full-time',
      status: 'inreview',
      color: 'gray',
    },
  ];
  return (
    <SafeAreaView style={tw`flex-1 px-5 py-6 bg-[#FAFAFD]`} edges={['top']}>
      <GeneralStatusBar backgroundColor={'#F0F0F0'} />
      <ScrollView showsVerticalScrollIndicator={false} style={tw`flex `}>
        <View style={tw`flex-row justify-start items-center`}>
          <Pressable
            onPress={() => {
              navigation.openDrawer();
            }}
            style={({pressed}) => [
              tw`h-12 w-12 rounded-full flex-row justify-center items-center ${
                pressed ? 'bg-slate-200' : ''
              }`,
            ]}>
            <Ionicons name="chevron-back" size={24} style={tw`text-black`} />
          </Pressable>
          <View style={[tw`w-3/4`]}>
            <Text
              style={[
                tw`text-center text-xl text-black`,
                {fontFamily: 'Poppins-Bold'},
              ]}>
              Saved Jobs
            </Text>
          </View>
        </View>

        <View style={tw`flex-row justify-between items-center mt-3 mb-2 mx-6`}>
          <Text style={[tw`text-xl text-black `, {fontFamily: 'Poppins-Bold'}]}>
            You Saved 48 Jobs 👍
          </Text>
        </View>
        <View>
          {featuredJobs.map((item, index) => (
            <Pressable key={index} onPress={() => {}}>
              {({pressed}) => (
                <View
                  style={tw`rounded-5 p-2 my-1 mx-2 gap-2 ${
                    pressed ? 'bg-gray-100' : 'bg-white'
                  }`}>
                  <View style={tw`flex-row`}>
                    <View style={tw`flex-row gap-4 items-center `}>
                      <Image
                        source={item.image}
                        style={tw`w-12 h-12 rounded-xl`}
                      />
                      <View>
                        <Text style={tw`text-lg font-bold text-black`}>
                          {item.title}
                        </Text>
                        <Text style={tw`text-sm text-gray-400`}>
                          {item.description}
                        </Text>
                      </View>
                    </View>
                    <View style={tw`flex-1 items-end justify-center`}>
                      <Text style={tw`text-lg font-semibold text-black`}>
                        {item.value}/y
                      </Text>
                      <Text style={tw`text-sm text-gray-400`}>
                        {item.location}
                      </Text>
                    </View>
                  </View>
                  <View style={tw`flex-row justify-between items-center`}>
                    <StatusDisplayArrow text={item.status} />
                    <StatusDisplayArrow text={item.workshift} />
                  </View>
                </View>
              )}
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bookmark;

export const StatusDisplayArrow = ({text}) => {
  return (
    <View style={tw`flex-row items-center bg-gray-100 p-2 rounded-xl`}>
      <Text style={[tw`text-sm text-black capitalize`]}>{text}</Text>
    </View>
  );
};
