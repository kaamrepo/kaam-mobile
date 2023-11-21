import {StyleSheet, Text, View, Dimensions, Image,TouchableOpacity,Pressable} from 'react-native';
import React from 'react';
import {dashboardTranslation} from './dashboardTranslation';
import tw from 'twrnc';
import Carousel from 'react-native-snap-carousel';
import Icon, {Icons} from '../../components/Icons';

const RecommendedJobsElement = ({
  language,
  recommendedJobsData,
  isLoading,
  navigation,
}) => {
  const handleSeeAllPress = () => {
    navigation.navigate('SeeAll',{isLoading});
  };
  if (isLoading) {
    return (
      <>
        <View style={tw`flex-row justify-between items-center mt-5 mb-4 mx-5`}>
          <Text style={[tw`text-black text-xl`, {fontFamily: 'Poppins-Bold'}]}>
            {dashboardTranslation[language]['Recommended Jobs']}
          </Text>
          <Text
            style={[
              tw`text-center text-sm leading-relaxed text-gray-600`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            {dashboardTranslation[language]['See all']}
          </Text>
        </View>
        <View style={tw`px-5 mb-14 w-full`}>
          <View
            style={[
              tw`w-full h-48 bg-gray-200 rounded-3 items-center justify-center`,
            ]}>
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
  if (recommendedJobsData && recommendedJobsData?.total == 0) {
    return (
      <>
        <View style={tw`flex-row justify-between items-center mt-5 mb-4 mx-5`}>
          <Text style={[tw`text-black text-xl`, {fontFamily: 'Poppins-Bold'}]}>
            {dashboardTranslation[language]['Recommended Jobs']}
          </Text>
          <Text
            style={[
              tw`text-center text-sm leading-relaxed text-gray-600`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            {dashboardTranslation[language]['See all']}
          </Text>
        </View>
        <View style={tw`px-5 mb-14 w-full`}>
          <View
            style={tw`w-full h-48 bg-gray-200 rounded-3 items-center justify-center`}>
            <Text
              style={[
                tw`text-neutral-700 text-sm`,
                {fontFamily: 'Poppins-Regular'},
              ]}>
              There are no recommended jobs
            </Text>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <View style={tw`flex-row justify-between items-center mt-5 mb-4 mx-5`}>
        <Text style={[tw`text-black text-xl`, {fontFamily: 'Poppins-Bold'}]}>
          {dashboardTranslation[language]['Recommended Jobs']}
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
          layoutCardOffset={18}
          autoplay={false}
          loop={false}
          data={recommendedJobsData?.data}
          renderItem={props => renderItemsRecommendedJobs({...props, navigation})}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={(Dimensions.get('window').width - 80) * 0.5} // Adjust the item width
          inactiveSlideOpacity={1} // To make inactive slides fully visible
        />
      </View>
    </>
  );
};

export default RecommendedJobsElement;

const styles = StyleSheet.create({});

const renderItemsRecommendedJobs = ({item, index,navigation}) => {
  return (
    <Pressable
     style={[
        tw`w-full h-48 flex flex-col justify-center items-center bg-slate-100 rounded-3 p-4 m-4 text-black`,
        {
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.3,
          shadowRadius: 10,
        },
      ]}
      key={index}
     onPress={() => {
          console.log('pressed recommended jobs');
          navigation.navigate('ApplyNow',{jobDetails: item});
        }}
    >
      <View style={tw`items-center mb-4`}>
        <Image source={item.image} style={tw`w-15 h-15 rounded-full`} />
      </View>
      <Text style={tw`text-lg my-1`} numberOfLines={1} ellipsizeMode="tail">
        {item.title}
      </Text>
      <Text style={[tw`my-1`, {fontFamily: 'Poppins-SemiBold'}]}>
        {`₹ ${new Intl.NumberFormat('en-IN', {
          maximumSignificantDigits: 3,
        }).format(item.value)}/y`}
      </Text>
      <View style={tw`flex flex-row`}>
        <Icon type={Icons.MaterialIcons} name={'location-pin'} size={20} />
        <Text style={{fontFamily: 'Poppins-SemiBold'}}>{item.location}</Text>
      </View>
    </Pressable>
  );
};
