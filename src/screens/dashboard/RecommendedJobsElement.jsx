import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import {dashboardTranslation} from './dashboardTranslation';
import tw from 'twrnc';
import Carousel from 'react-native-snap-carousel';
import Icon, {Icons} from '../../components/Icons';

const RecommendedJobsElement = ({
  language,
  recommendedJobs,
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
  if (recommendedJobs && recommendedJobs?.total == 0) {
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
  const handleSeeAllPress = () => {
    navigation.navigate('SeeAll', {isLoading});
  };
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
          firstItem={recommendedJobs?.data?.length > 2 ? 1 : 0}
          layoutCardOffset={18}
          autoplay={false}
          loop={false}
          data={recommendedJobs?.data}
          // renderItem={renderItemsRecommendedJobs}
          renderItem={props =>
            renderItemsRecommendedJobs({
              ...props,
              recommendedJobs,
              navigation,
            })
          }
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

const renderItemsRecommendedJobs = ({
  item,
  index,
  navigation,
  recommendedJobs,
}) => {
  const isLastSlide = index === recommendedJobs.data.length - 1;
  if (isLastSlide) {
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

  // Render regular card for other items
  if (!isLastSlide) {
    return (
      <View
        style={[
          tw`w-full h-48 flex flex-col justify-center items-center bg-slate-100 rounded-3 p-4 m-4 text-black relative`,
          {
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.3,
            shadowRadius: 10,
          },
        ]}>
        <Pressable
          onPress={() => {
            console.log('pressed');
            navigation.navigate('ApplyNow', {jobDetails: item, id: item._id});
          }}
          style={tw`w-full h-full`}
          key={index}>
          <View style={tw`items-center mb-4`}>
            {item.profilepic ? (
              <Image
                source={item?.profilepic}
                style={tw`w-15 h-15 rounded-full`}
              />
            ) : (
              <Icon
                type={Icons.Ionicons}
                name={'person'}
                size={45}
                color={'green'}
              />
            )}
          </View>

          <Text style={tw`text-lg my-1`} numberOfLines={1} ellipsizeMode="tail">
            {item?.jobtitle}
          </Text>
          <Text style={[tw`my-1`, {fontFamily: 'Poppins-SemiBold'}]}>
            {`₹ ${new Intl.NumberFormat('en-IN', {
              maximumSignificantDigits: 3,
            }).format(item?.salary)}/y`}
          </Text>
          <View style={tw`flex flex-row`}>
            <Icon type={Icons.MaterialIcons} name={'location-pin'} size={20} />
            <Text style={{fontFamily: 'Poppins-SemiBold'}}>
              {item?.location?.name}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  }
};
