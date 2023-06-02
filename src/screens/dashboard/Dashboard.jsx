import React, { useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, TextInput, Text, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Feather';

// Import your images from the assets/images folder
import Image1 from '../../assets/images/browse-jobs.png';
import Image2 from '../../assets/images/IntroScreenJobsAndInvitations.png';
import Image3 from '../../assets/images/search-dream-job.png';
import Image4 from '../../assets/images/checklist.png';

const Dashboard = () =>
{
  const [selectedImage, setSelectedImage] = useState(null);

  const carouselData = [
    { id: 1, image: Image1 },
    { id: 2, image: Image2 },
    { id: 3, image: Image3 },
    { id: 4, image: Image4 },
  ];

  const renderItem = ({ item }) =>
  {
    return (
      <View style={tw`${ styles.slide }`}>
        <Image source={item.image} style={tw`${ styles.image }`} resizeMode="contain" />
      </View>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={tw`flex bg-white`}>
      <View style={tw`p-6 bg-white mt-5`}>
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <View>
            <Text style={tw`text-lg font-bold`}>Welcome, John Doe</Text>
            <Text style={tw`text-lg font-bold`}>Peter Khalko👋</Text>
          </View>
          <TouchableOpacity style={tw`w-10 h-10 bg-green-500 rounded-lg items-center justify-center`}>
            {/* Online green ripple icon */}
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw`flex-row items-center mb-4 mx-5`}>
        <View style={tw`flex-1 bg-gray-200 rounded-lg h-10 flex-row items-center pr-2`}>
          <Icon name="search" size={20} color="gray" style={tw`mx-2`} />
          <TextInput
            style={tw`flex-1 text-sm text-black`}
            placeholder="Search"
            placeholderTextColor="gray"
          />
        </View>
        <TouchableOpacity
          style={tw`w-10 h-10 bg-gray-200 rounded-lg items-center justify-center ml-2`}
        >
          <Icon name="filter" size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <View>
        <View style={tw`flex-row justify-between items-center mb-4 mx-5`}>
          <Text style={tw`font-bold text-black text-xl`}>Nearby Jobs</Text>
          <Text style={tw`text-center text-sm leading-relaxed text-gray-600`}>See all</Text>
        </View>
        <Carousel
          layout={'default'}
          autoplay={true} // Enable autoplay
          autoplayInterval={5000} // Autoplay interval in milliseconds (5 seconds)
          loop={true} // Loop the carousel
          data={carouselData}
          renderItem={renderItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width - 80}
        />
      </View>
    </ScrollView>
  );
};

const styles = {
  slide: 'w-full h-52 justify-center items-center bg-gray-300',
  image: 'w-full h-full',
};

export default Dashboard;
