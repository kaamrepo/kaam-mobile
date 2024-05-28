import React, { useMemo, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import tw from 'twrnc';
import Carousel from 'react-native-snap-carousel';
import { dashboardTranslation } from '../../dashboardTranslation';
import Icon, { Icons } from '../../../../components/Icons';
import { primaryBGColor } from '../../../../helper/utils/colors';

const RecommendedJobsElement = ({
  language,
  recommendedJobs,
  isLoading,
  navigation,
}) => {
  const renderItemsRecommendedJobs = useCallback(
    ({ item, index }) => (
      <Pressable
        onPress={() => {
          navigation.navigate('ApplyNow', { jobDetails: item, id: item._id });
        }}
        style={[
          tw`w-full flex flex-col items-center overflow-hidden bg-white rounded-3xl pt-4 m-4 text-black shadow-md`,
        ]}
        key={index}>
        <View
          style={tw`flex justify-center items-center mb-2 px-4 w-15 h-15 rounded-full bg-gray-100`}>
          {item?.employerDetails?.profilepic ? (
            <Image
              source={{ uri: item.employerDetails.profilepic }}
              style={tw`w-15 h-15 rounded-full`}
            />
          ) : (
            <Icon
              type={Icons.Ionicons}
              name={'person'}
              size={30}
              color={primaryBGColor}
            />
          )}
        </View>

        <Text
          style={[tw`text-lg my-1 text-black`, { fontFamily: 'Poppins-Bold' }]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item?.jobtitle}
        </Text>

        <Text style={[tw`my-1 text-black`, { fontFamily: 'Poppins-SemiBold' }]}>
          {`₹ ${new Intl.NumberFormat('en-IN', {
            maximumSignificantDigits: 3,
          }).format(item?.salary)}/y`}
        </Text>

        <View
          style={tw`w-full py-2 flex flex-row gap-2 justify-center items-end bg-gray-100`}>
          <Icon
            type={Icons.MaterialIcons}
            name={'location-pin'}
            size={20}
            color={'#E34133'}
          />
          <Text
            style={[tw`text-black`, { fontFamily: 'Poppins-Regular' }]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.location?.name ??
              item.location?.fulladdress?.substring(0, 15) + '...'}
          </Text>
        </View>
      </Pressable>
    ),
    [navigation]
  );

  const handleSeeAllPress = useCallback(() => {
    navigation.navigate('SeeAll', { isLoading });
  }, [navigation, isLoading]);

  const renderRecommendedJobs = useMemo(() => {
    if (isLoading) {
      return (
        <View style={tw`px-5 mb-14 w-full`}>
          <View style={[tw`w-full h-48 bg-gray-200 rounded-3 items-center justify-center`]}>
            <Text style={[tw`text-neutral-700 text-sm`, { fontFamily: 'Poppins-Regular' }]}>
              Fetching jobs...
            </Text>
          </View>
        </View>
      );
    } else if (recommendedJobs && recommendedJobs.total === 0) {
      return (
        <View style={tw`px-5 mb-14 w-full`}>
          <View style={tw`w-full h-48 bg-gray-200 rounded-3 items-center justify-center`}>
            <Text style={[tw`text-neutral-700 text-sm`, { fontFamily: 'Poppins-Regular' }]}>
              There are no recommended jobs
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <Carousel
            layout={'default'}
            firstItem={recommendedJobs?.data?.length > 2 ? 1 : 0}
            layoutCardOffset={18}
            autoplay={false}
            loop={false}
            data={recommendedJobs?.data}
            renderItem={(props) =>
              renderItemsRecommendedJobs({ ...props, recommendedJobs, navigation })
            }
            sliderWidth={Dimensions.get('window').width}
            itemWidth={(Dimensions.get('window').width - 80) * 0.5} // Adjust the item width
            inactiveSlideOpacity={1} // To make inactive slides fully visible
          />
        </View>
      );
    }
  }, [isLoading, recommendedJobs, navigation, renderItemsRecommendedJobs]);

  return (
    <>
      <View style={tw`flex-row justify-between items-center mt-5 mb-4 mx-5`}>
        <Text style={[tw`text-black text-xl`, { fontFamily: 'Poppins-Bold' }]}>
          {dashboardTranslation[language]['Recommended Jobs']}
        </Text>
        <TouchableOpacity onPress={handleSeeAllPress}>
          <Text
            style={[
              tw`text-center text-sm leading-relaxed text-gray-600`,
              { fontFamily: 'Poppins-Regular' },
            ]}>
            See all
          </Text>
        </TouchableOpacity>
      </View>
      {renderRecommendedJobs}
    </>
  );
};

export default RecommendedJobsElement;

const styles = StyleSheet.create({});
