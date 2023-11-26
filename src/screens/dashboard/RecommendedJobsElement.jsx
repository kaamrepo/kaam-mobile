import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
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
        <Text
          style={[
            tw`text-center text-sm leading-relaxed text-gray-600`,
            {fontFamily: 'Poppins-Regular'},
          ]}>
          {dashboardTranslation[language]['See all']}
        </Text>
      </View>
      <View>
        <Carousel
          layout={'default'}
          firstItem={recommendedJobsData?.data?.length > 2 ? 1 : 0}
          layoutCardOffset={18}
          autoplay={false}
          loop={false}
          data={recommendedJobsData?.data}
          renderItem={RenderItemsRecommendedJobs}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={(Dimensions.get('window').width - 80) * 0.5} // Adjust the item width
          inactiveSlideOpacity={1} // To make inactive slides fully visible
        />
      </View>
      {/* <View style={tw`w-full `}>
        <FlatList
          style={tw`w-full px-4 mx-3`}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={recommendedJobsData?.data}
          renderItem={({item, index}) => (
            <RenderItemsRecommendedJobsFlatList item={item} index={index} />
          )}
          keyExtractor={item => item._id}
        />
      </View> */}
    </>
  );
};

export default RecommendedJobsElement;

const RenderItemsRecommendedJobsFlatList = ({item, index}) => {
  return (
    <View
      style={[
        tw`w-[160px] p-4 pb-10 mx-2 my-3 justify-center overflow-hidden relative items-center bg-white rounded-3  shadow-md`,
      ]}
      key={index}>
      <View style={tw`items-center mb-4`}>
        <Image source={item.image} style={tw`w-15 h-15 rounded-full`} />
      </View>
      <Text
        style={[tw`text-black my-1`, {fontFamily: 'Poppins-SemiBold'}]}
        numberOfLines={1}
        ellipsizeMode="tail">
        {item.title}
      </Text>
      <Text
        style={[
          tw`text-black my-1 text-[12px]`,
          {fontFamily: 'Poppins-Regular'},
        ]}>
        {`₹ ${new Intl.NumberFormat('en-IN', {
          maximumSignificantDigits: 3,
        }).format(item.value)}/y`}
      </Text>
      <View
        style={tw`absolute bottom-0 right-0 flex flex-row items-center bg-red-200/30 rounded-tl-2xl px-3`}>
        <Icon
          type={Icons.MaterialIcons}
          name={'location-pin'}
          size={16}
          color={'#D2042D'}
          style={tw`h-[70%]`}
        />
        <Text
          style={[
            tw`text-black text-[12px] my-1`,
            {fontFamily: 'Poppins-Regular'},
          ]}>
          {item.location}
        </Text>
      </View>
    </View>
  );
};
const RenderItemsRecommendedJobs = ({item, index}) => {
  return (
    <View
      style={[
        tw`w-full h-48 flex flex-col justify-center items-center bg-white rounded-3 p-4 m-4 text-black`,
        {
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.3,
          shadowRadius: 10,
        },
      ]}
      key={index}>
      <View style={tw`items-center mb-4`}>
        <Image source={item.image} style={tw`w-15 h-15 rounded-full`} />
      </View>
      <Text
        style={[tw`text-black my-1`, {fontFamily: 'Poppins-SemiBold'}]}
        numberOfLines={1}
        ellipsizeMode="tail">
        {item.title}
      </Text>
      <Text style={[tw`text-black my-1`, {fontFamily: 'Poppins-Regular'}]}>
        {`₹ ${new Intl.NumberFormat('en-IN', {
          maximumSignificantDigits: 3,
        }).format(item.value)}/y`}
      </Text>
      <View
        style={tw`flex flex-row items-center bg-red-200/30 rounded-full px-3 mt-1`}>
        <Icon
          type={Icons.MaterialIcons}
          name={'location-pin'}
          size={17}
          color={'#D2042D'}
          style={tw`h-[80%]`}
        />
        <Text style={[tw`text-black my-1 text-[11px]`, {fontFamily: 'Poppins-Regular'}]}>
          {item.location}
        </Text>
      </View>
    </View>
  );
};
