import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {dashboardTranslation} from './dashboardTranslation';
import Carousel from 'react-native-snap-carousel';
import useLoginStore from '../../store/authentication/login.store';
import Icon, {Icons} from '../../components/Icons';
import SeeAll from '../see-all/SeeAll';
// const image = {uri: 'nearby-jobs-skin-1.png'};
const nearbyJobsColorSchemes = ['#87C4FF', '#739072', '#CE5A67', '#ECEE81'];
const NearbyJobsElement = ({language, nearbyjobs, navigation, isLoading}) => {
  const {loggedInUser} = useLoginStore();

  if (isLoading) {
    return (
      <>
        <View style={tw`flex-row justify-between items-center mb-4 mx-5`}>
          <Text style={[tw`text-black text-xl`, {fontFamily: 'Poppins-Bold'}]}>
            {dashboardTranslation[language]['Nearby Jobs']}
          </Text>
          <Text
            style={[
              tw`text-center text-sm leading-relaxed text-gray-600`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            {dashboardTranslation[language]['See all']}
          </Text>
        </View>
        <View style={tw`w-full px-5`}>
          <View
            style={tw`bg-gray-200 w-full h-48 rounded-3 items-center justify-center`}>
            <Text
              style={[
                tw`text-neutral-700 text-sm`,
                {fontFamily: 'Poppins-Regular'},
              ]}>
              Fetching jobs...
            </Text>
          </View>
        </View>
      </>
    );
  }
  if (
    (nearbyjobs && nearbyjobs?.total == 0) ||
    Object.keys(nearbyjobs)?.length == 0
  ) {
    return (
      <>
        <View style={tw`flex-row justify-between items-center mb-4 mx-5`}>
          <Text style={[tw`text-black text-xl`, {fontFamily: 'Poppins-Bold'}]}>
            {dashboardTranslation[language]['Nearby Jobs']}
          </Text>
          <Text
            style={[
              tw`text-center text-sm leading-relaxed text-gray-600`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            {dashboardTranslation[language]['See all']}
          </Text>
        </View>
        <View style={tw`w-full px-5`}>
          <View
            style={tw`bg-gray-200 w-full h-48 rounded-3 items-center justify-center`}>
            <Text
              style={[
                tw`text-neutral-700 text-sm`,
                {fontFamily: 'Poppins-Regular'},
              ]}>
              There are no nearby jobs
            </Text>
          </View>
        </View>
      </>
    );
  }
  const handleSeeAllPress = () => {
    navigation.navigate('SeeAll',{isLoading});
  };

  return (
    <>
      <View style={tw`flex-row justify-between items-center mb-4 mx-5`}>
        <Text style={[tw`text-black text-xl`, {fontFamily: 'Poppins-Bold'}]}>
          {dashboardTranslation[language]['Nearby Jobs']}
        </Text>
        <TouchableOpacity onPress={handleSeeAllPress}>
        <Text
            style={[
              tw`text-center text-sm leading-relaxed text-gray-600`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
        {/* <TouchableOpacity onPress={handleSeeAllPress}>
         
            {dashboardTranslation[language]['See all']}
        
        </TouchableOpacity> */}
        test
        </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Carousel
          layout={'default'}
          autoplay={false}
          // autoplayInterval={5000}
          loop={false}
          data={nearbyjobs?.data}
          renderItem={props => renderItemsNearbyJobs({...props, navigation})}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width - 80}
        />
      </View>
    </>
  );
};

export default NearbyJobsElement;

const styles = StyleSheet.create({});

const handleBookmarkPress = () => {
  // Handle bookmark button press logic here
  console.log('Bookmark button pressed!');
};
const renderItemsNearbyJobs = ({item, index, navigation}) => {
  const randomColorIndex = Math.floor(
    Math.random() * nearbyJobsColorSchemes.length,
  );
  const randomBackgroundColor = nearbyJobsColorSchemes[randomColorIndex];

  return (
    <ImageBackground
      source={require('../../assets/images/nearby_jobs_skin1.png')}
      style={[tw`w-full h-48 rounded-3 bg-[${nearbyJobsColorSchemes[index]}]`]}
      resizeMode="cover">
      <TouchableOpacity
        onPress={() => {
          console.log('pressed');
          navigation.navigate('ApplyNow', {jobDetails: item});
        }}
        key={item._id}
        style={tw`w-full h-48 rounded-3`}>
        <View style={tw`flex flex-row justify-evenly p-4 h-35`}>
          <View>
            <Image source={item.image} style={tw`w-15 h-15 rounded-full`} />
          </View>
          <View style={tw`flex-3 items-center p-2`}>
            <Text
              style={tw`text-white text-xl font-bold`}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.title}
            </Text>
            <Text
              style={tw`text-white text-lg font-bold`}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.description}
            </Text>
          </View>
          <View style={tw`items-end`}>
            <Pressable
              onPress={handleBookmarkPress}
              style={({pressed}) => [
                tw`p-2 rounded-full ${pressed ? 'bg-black/20' : ''}`,
              ]}>
              <Icon
                type={Icons.Ionicons}
                name="bookmark"
                size={24}
                color={'white'}
              />
            </Pressable>
          </View>
        </View>

        <View style={tw`flex flex-row justify-between px-5 py-2`}>
          <Text style={tw`text-white text-lg`}>{item.value} Rs</Text>
          <Text style={tw`text-white text-lg`}>{item.location}</Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
};
