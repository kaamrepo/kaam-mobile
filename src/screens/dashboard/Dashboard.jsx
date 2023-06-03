import React, {useState} from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  Dimensions,
  Pressable,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Feather';
// Import your images from the assets/images folder
import Image1 from '../../assets/images/browse-jobs.png';
import Image2 from '../../assets/images/IntroScreenJobsAndInvitations.png';
import Image3 from '../../assets/images/search-dream-job.png';
import Image4 from '../../assets/images/checklist.png';

const Dashboard = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const nearbyJobsData = [
    {id: 1, image: Image1},
    {id: 2, image: Image2},
    {id: 3, image: Image3},
    {id: 4, image: Image4},
  ];

  const renderItemsNearbyJobs = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // console.log(item, "clicked");
          navigation.navigate('ApplyNow', {id: item.id});
        }}
        key={index}>
        <View style={tw`${styles.slide}`}>
          <Image
            source={item.image}
            style={tw`${styles.image}`}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    );
  };

  const recommendedJobsData = [
    {
      image: Image1,
      title: 'cook homemade',
      value: 960000,
      location: 'Delhi',
    },
    {
      image: Image2,
      title: 'cook homemade',
      value: 960000,
      location: 'Delhi',
    },
    {
      image: Image3,
      title: 'cook homemade',
      value: 960000,
      location: 'Delhi',
    },
  ];

  const renderItemsRecommendedJobs = ({item, index}) => {
    return (
      <View style={tw`${styles.slide} rounded-3 p-4 m-4`} key={index}>
        <View style={tw`items-center mb-4`}>
          <Image
            source={item.image}
            style={tw`${styles.image} w-20 h-20 rounded-full`}
          />
        </View>
        <Text style={tw`font-bold text-xl mb-2`}>{item.title}</Text>
        <Text>{item.location}</Text>
        <Text>{item.value}/y</Text>
      </View>
    );
  };
  const featuredJobs = [
    {
      image: Image1,
      title: 'Jr Executive',
      description: 'Tester',
      value: 960000,
      location: 'Delhi',
    },
    {
      image: Image2,
      title: 'Jr Engineer',
      description: 'Devloper',
      value: 98765,
      location: 'Pune',
    },
    {
      image: Image1,
      title: 'Sr tester',
      description: 'Automation',
      value: 576778,
      location: 'Mumbai',
    },
  ];

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
            placeholder="Searcvfdfdh"
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
        <Carousel
          layout={'default'}
          autoplay={true} // Enable autoplay
          autoplayInterval={5000} // Autoplay interval in milliseconds (5 seconds)
          loop={true} // Loop the carousel
          data={nearbyJobsData}
          renderItem={renderItemsNearbyJobs}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width - 80}
        />
      </View>
      <View style={tw`flex-row justify-between items-center mt-5 mb-4 mx-5`}>
        <Text style={tw`font-bold text-black text-xl`}>Recomended Jobs</Text>
        <Text style={tw`text-center text-sm leading-relaxed text-gray-600`}>
          See all
        </Text>
      </View>
      <View>
        <Carousel
          layout={'stack'}
          layoutCardOffset={`18`}
          autoplay={true} // Enable autoplay
          autoplayInterval={5000} // Autoplay interval in milliseconds (5 seconds)
          loop={true} // Loop the carousel
          data={recommendedJobsData}
          renderItem={renderItemsRecommendedJobs}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width - 80}
        />
      </View>
      <View style={tw`flex-row justify-between items-center mt-5 mb-4 mx-5`}>
        <Text style={tw`font-bold text-black text-xl`}>Featured Jobs</Text>
        <Text style={tw`text-center text-sm leading-relaxed text-gray-600`}>
          See all
        </Text>
      </View>
      <View>
        {featuredJobs.map((item, index) => (
          <TouchableOpacity key={index}>
            <View style={tw`bg-white rounded-5 p-3 m-3 shadow`}>
              <View style={tw`flex-row`}>
                <View style={tw`flex-1 items-center justify-center`}>
                  <Image
                    source={item.image}
                    style={tw`w-12 h-12 rounded-full`}
                  />
                </View>
                <View style={tw`flex-1 items-center justify-center`}>
                  <Text style={tw`text-lg mb-2 font-bold`}>{item.title}</Text>
                  <Text style={tw`text-lg`}>{item.description}</Text>
                </View>
                <View style={tw`flex-1 items-center justify-center`}>
                  <Text style={tw`text-lg font-bold`}>{item.value}/y</Text>
                  <Text style={tw`text-lg`}>{item.location}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = {
  slide: 'w-full h-52 justify-center items-center bg-gray-300',
  image: 'w-full h-full',
};

export default Dashboard;
