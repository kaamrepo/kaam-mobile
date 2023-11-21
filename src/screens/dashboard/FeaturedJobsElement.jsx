import {View, Text, Pressable, Image} from 'react-native';
import tw from 'twrnc';
import React from 'react';
import {dashboardTranslation} from './dashboardTranslation';

const FeaturedJobsElement = ({
  featuredJobs,
  isLoading,
  language,
  navigation,
}) => {
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
      <View style={tw`px-5 mb-14`}>
        {featuredJobs?.data?.map(f => (
          <Pressable
            key={f._id}
            onPress={() => {}}
            style={({pressed}) =>
              tw`my-1 w-full flex-row justify-between border border-gray-200 rounded-3 py-3 px-5 ${
                pressed ? 'bg-green-100/10' : 'bg-white'
              }`
            }>
            <View style={tw`h-10 w-10 flex-2`}>
              <Image
                source={f.image}
                style={tw`h-10 w-10 rounded-xl`}
                resizeMode="contain"
              />
            </View>
            <View style={tw` flex-4`}>
              <Text
                style={[
                  tw`text-black text-[14px]`,
                  {fontFamily: 'Poppins-SemiBold'},
                ]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {f.title}
              </Text>
              <Text
                style={[
                  tw`text-neutral-600 text-[14px]`,
                  {fontFamily: 'Poppins-Regular'},
                ]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {f.description}
              </Text>
            </View>
            <View style={tw` flex-2`}>
              <Text
                style={[
                  tw`text-black text-[14px]`,
                  {fontFamily: 'Poppins-SemiBold'},
                ]}>
                ₹: {f.value}
              </Text>
              <Text
                style={[
                  tw`text-neutral-600 text-[14px]`,
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                {f.location}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </>
  );
};

export default FeaturedJobsElement;
