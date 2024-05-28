import React, { useMemo, useCallback } from 'react';
import { View, Text, Pressable, Image, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Translation } from '../../Translation';
import Icon, { Icons } from '../../../../components/Icons';
import { primaryBGColor } from '../../../../helper/utils/colors';

const FeaturedJobsElement = ({ featuredJobs, isLoading, language, navigation }) => {
  const handleSeeAllPress = useCallback(() => {
    navigation.navigate('AllJobsFlatlist', {
      isLoading,
      type: 'nearby',
      // coordinates: [position?.coords?.longitude, position?.coords?.latitude],
    });
  }, [navigation, isLoading]);

  const renderJobs = useMemo(() => {
    if (isLoading) {
      return (
        <View style={tw`px-5 mb-14 w-full`}>
          <View style={[tw`w-full h-30 bg-gray-200 rounded-3 items-center justify-center`]}>
            <Text style={[tw`text-neutral-700 text-sm`, { fontFamily: 'Poppins-Regular' }]}>
              Fetching jobs...
            </Text>
          </View>
        </View>
      );
    } else if (featuredJobs && featuredJobs.total === 0) {
      return (
        <View style={tw`px-5 mb-14 w-full`}>
          <View style={tw`w-full h-30 bg-gray-200 rounded-3 items-center justify-center`}>
            <Text style={[tw`text-neutral-700 text-sm`, { fontFamily: 'Poppins-Regular' }]}>
              There are no featured jobs
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <ScrollView>
          <View style={tw`px-5 mb-14`}>
            {featuredJobs?.data?.map(item => (
              <Pressable
                key={item._id}
                onPress={() => {
                  console.log('pressed recommended jobs');
                  navigation.navigate('ApplyNow', { jobDetails: item, id: item._id });
                }}
                style={({ pressed }) =>
                  tw`my-1 w-full flex-row items-center gap-1 border border-gray-200 rounded-3 px-2.5 pb-2.5 pt-4 relative overflow-hidden ${
                    pressed ? 'bg-green-100/10' : 'bg-white'
                  }`
                }>
                <View style={tw`h-10 w-10 flex-1`}>
                  {item.employerDetails.profilepic ? (
                    <Image
                      source={{ uri: item.employerDetails.profilepic }}
                      style={tw`h-10 w-10 rounded`}
                    />
                  ) : (
                    <Icon
                      type={Icons.Ionicons}
                      name={'person'}
                      size={45}
                      color={primaryBGColor}
                    />
                  )}
                </View>
                <View style={tw`flex-5`}>
                  <Text
                    style={[
                      tw`text-black text-[14px]`,
                      { fontFamily: 'Poppins-SemiBold' },
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item?.jobtitle}
                  </Text>
                  <Text
                    style={[
                      tw`text-neutral-600 text-[14px]`,
                      { fontFamily: 'Poppins-Regular' },
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item?.description}
                  </Text>
                </View>
                <Text
                  style={[
                    tw`text-white text-[12px] absolute top-0 right-0 px-2 rounded-bl-xl bg-[${primaryBGColor}]`,
                    { fontFamily: 'Poppins-SemiBold' },
                  ]}>
                  ₹: {item?.salary}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      );
    }
  }, [isLoading, featuredJobs, navigation]);

  return (
    <>
      <View style={tw`flex-row justify-between items-center mt-5 mb-4 mx-5`}>
        <Text style={[tw`text-black text-xl`, { fontFamily: 'Poppins-Bold' }]}>
          {Translation[language]['Featured Jobs']}
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
      {renderJobs}
    </>
  );
};

export default FeaturedJobsElement;
