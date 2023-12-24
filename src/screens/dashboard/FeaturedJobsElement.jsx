import {View, Text, Pressable, Image} from 'react-native';
import tw from 'twrnc';
import React from 'react';
import {dashboardTranslation} from './dashboardTranslation';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon, {Icons} from '../../components/Icons';


const FeaturedJobsElement = ({
  featuredJobs,
  isLoading,
  language,
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
            {dashboardTranslation[language]['Featured Jobs']}
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
              tw`w-full h-30 bg-gray-200 rounded-3 items-center justify-center`,
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
  if (featuredJobs && featuredJobs?.total == 0) {
    return (
      <>
        <View style={tw`flex-row justify-between items-center mt-5 mb-4 mx-5`}>
          <Text style={[tw`text-black text-xl`, {fontFamily: 'Poppins-Bold'}]}>
            {dashboardTranslation[language]['Featured Jobs']}
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
            style={tw`w-full h-30 bg-gray-200 rounded-3 items-center justify-center`}>
            <Text
              style={[
                tw`text-neutral-700 text-sm`,
                {fontFamily: 'Poppins-Regular'},
              ]}>
              There are no featured jobs
            </Text>
          </View>
        </View>
      </>
    );
  }

  return (
    <ScrollView>
      <View style={tw`flex-row justify-between items-center mt-5 mb-4 mx-5`}>
        <Text style={[tw`text-black text-xl`, {fontFamily: 'Poppins-Bold'}]}>
          {dashboardTranslation[language]['Featured Jobs']}
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
      <View style={tw`px-5 mb-14`}>
        {featuredJobs?.data?.map(item => (
          <Pressable
            key={item._id}
            onPress={() => {
              console.log('pressed recommended jobs');
              navigation.navigate('ApplyNow', {jobDetails: item, id: item._id});
            }}
            style={({pressed}) =>
              tw`my-1 w-full flex-row justify-between border border-gray-200 rounded-3 py-3 px-5 ${
                pressed ? 'bg-green-100/10' : 'bg-white'
              }`
            }>
            <View style={tw`h-10 w-10 flex-2`}>
              {item.profilepic ? (
                <Image
                  source={item?.profilepic}
                  style={tw`h-10 w-10 rounded-xl`}
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
            <View style={tw` flex-4`}>
              <Text
                style={[
                  tw`text-black text-[14px]`,
                  {fontFamily: 'Poppins-SemiBold'},
                ]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item?.jobtitle}
              </Text>
              <Text
                style={[
                  tw`text-neutral-600 text-[14px]`,
                  {fontFamily: 'Poppins-Regular'},
                ]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item?.description}
              </Text>
            </View>
            <View style={tw` flex-2`}>
              <Text
                style={[
                  tw`text-black text-[14px]`,
                  {fontFamily: 'Poppins-SemiBold'},
                ]}>
                ₹: {item?.salary}
              </Text>
              <Text
                style={[
                  tw`text-neutral-600 text-[14px]`,
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                {item?.location?.name}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default FeaturedJobsElement;
