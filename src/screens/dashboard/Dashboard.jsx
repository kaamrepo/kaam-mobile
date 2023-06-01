
import React from 'react';
import { View, Text, Dimensions, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import tw from 'twrnc';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/Feather';

const Dashboard = () =>
{
  const carouselData = [
    {
      id: 1,
      title: 'Item 1',
      image: require('../../assets/images/browse-jobs.png'), // Replace with actual image path
    },
    {
      id: 2,
      title: 'Item 2',
      image: require('../../assets/images/IntroScreenJobsAndInvitations.png'), // Replace with actual image path
    },
    {
      id: 3,
      title: 'Item 3',
      image: require('../../assets/images/search-dream-job.png'), // Replace with actual image path
    },
  ];

  const renderCarouselItem = item => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={item.image} style={{ width: '70%', height: '70%', resizeMode: 'cover' }} />
      <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
    </View>
  );

  const width = Dimensions.get('window').width;

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={tw`flex bg-white`}>
      <View style={tw`p-6 bg-white mt-5`}>
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <View>
            <Text style={tw`text-lg font-bold`}>Welcome, John Doe</Text>
            <Text style={tw`text-lg font-bold`}>Peter Khalko👋</Text>
          </View>

          <TouchableOpacity
            style={tw`w-10 h-10 bg-green-500 rounded-lg items-center justify-center`}>
            {/* Online green ripple icon */}
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw`flex-row items-center mb-4 mx-5`}>
        <View
          style={tw`flex-1 bg-gray-200 rounded-lg h-10 flex-row items-center pr-2`}>
          <Icon name="search" size={20} color="gray" style={tw`mx-2`} />
          <TextInput
            style={tw`flex-1 text-sm text-black`}
            placeholder="Search"
            placeholderTextColor="gray"
          />
        </View>

        <TouchableOpacity
          style={tw`w-10 h-10 bg-gray-200 rounded-lg items-center justify-center ml-2`}>
          <Icon name="filter" size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <View>
        <View style={tw`flex-row justify-between items-center mb-4 mx-5`}>
          <Text style={tw`font-bold text-black text-xl`}>Nearby Jobs</Text>
          <Text style={tw`text-center text-sm leading-relaxed text-gray-600`}>
            See all
          </Text>
        </View>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Carousel
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            data={carouselData}
            scrollAnimationDuration={1000}
            mode="parallax"
            onSnapToItem={index => console.log('current index:', index)}
            renderItem={({ item }) => (
              <PanGestureHandler>
                <View
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    style={{
                      height: '100%',
                      width: '100%',
                    }}
                    resizeMode="stretch"
                    source={item.image}
                  />
                </View>
              </PanGestureHandler>
            )}
          />
        </GestureHandlerRootView>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
