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

const nearbyJobsColorSchemes = ['#87C4FF', '#739072', '#CE5A67', '#ECEE81'];
const NearbyJobsElement = ({
  language,
  nearbyjobs,
  navigation,
  isLoading,
  location,
}) => {
  const {loggedInUser} = useLoginStore();
  nearbyjobs.data.push({});
  if (!location) {
    return (
      <CommonMessageForNearByJobs
        title="Please turn on your location"
        language={language}
      />
    );
  }
  if (isLoading) {
    return (
      <CommonMessageForNearByJobs
        title="Fetching jobs..."
        language={language}
      />
    );
  }
  if (
    (nearbyjobs && nearbyjobs?.total == 0) ||
    Object.keys(nearbyjobs)?.length == 0
  ) {
    return (
      <CommonMessageForNearByJobs
        title="There are no nearby jobs"
        language={language}
      />
    );
  }
  const handleSeeAllPress = () => {
    navigation.navigate('SeeAll', {isLoading});
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
        See all
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
          renderItem={props => renderItemsNearbyJobs({...props, navigation,nearbyjobs})}
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
const renderItemsNearbyJobs = ({item, index, navigation,nearbyjobs}) => {
  const isLastSlide = Object.keys(item).length;
  console.log("isLastSlide",isLastSlide,item);
  if (!isLastSlide) {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SeeAll', {jobDetails: item});
        }}
        style={[
          tw`w-full h-48 flex flex-col justify-center items-center rounded-3 p-4 m-4 text-black relative`,
        ]}
        key={index}>
        <Icon
          type={Icons.Entypo}
          name={'chevron-with-circle-right'}
          size={45}
          color={'green'}
        />
      </TouchableOpacity>
    );
  }
  if (isLastSlide) {
  return (
    <ImageBackground
      source={require('../../assets/images/nearby-jobs-skin-1.png')}
      style={[tw`w-full h-48 rounded-3 bg-[${item?.styles?.bgcolor}]`]}
      resizeMode="cover">
      <Pressable
        onPress={() => {
          console.log('pressed');
          navigation.navigate('ApplyNow', {jobDetails: item, id: item._id});
        }}
        key={item._id}
        style={tw`w-full h-48 rounded-3`}>
        <View style={tw`flex flex-row justify-between p-4 h-35`}>
          {/* <View> 
          <Image source={item.image} style={tw`w-15 h-15 rounded-full`} /> 
         </View> */}
          <View style={tw` items-center p-2`}>
            <Text
              style={[
                tw`text-[${item?.styles?.color}] text-[20px] `,
                {fontFamily: 'Poppins-SemiBold'},
              ]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.position}
            </Text>
            <Text
              style={[
                tw`text-[${item?.styles?.color}] text-[16px]`,
                {fontFamily: 'Poppins-Regular'},
              ]}
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
          <Text
            style={[
              tw`text-[${item?.styles?.color}] text-[16px]`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            ₹. {item.salary}
          </Text>
          <Text
            style={[
              tw`text-[${item?.styles?.color}] text-[16px]`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            {item.location?.name}
          </Text>
        </View>
      </Pressable>
    </ImageBackground>
  );
            }
};

function CommonMessageForNearByJobs({title, language}) {
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
          style={tw`bg-gray-200 w-full h-48 flex flex-row gap-3 rounded-3 items-center justify-center`}>
          {title == 'Please turn on your location' ? (
            <Icon
              type={Icons.MaterialIcons}
              name={'location-off'}
              size={25}
              style={tw`text-red-600`}
            />
          ) : null}

          <Text
            style={[
              tw`text-neutral-700 text-sm`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            {title}
          </Text>
        </View>
      </View>
    </>
  );
}
