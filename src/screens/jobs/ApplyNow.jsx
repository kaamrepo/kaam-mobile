import React, {useEffect, useState} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import tw from 'twrnc';
import Image1 from '../../assets/images/browse-jobs.png';
import {SafeAreaView} from 'react-native-safe-area-context';
import useJobStore from '../../store/dashboard.store';
import {WebView} from 'react-native-webview';
import GeneralStatusBar from '../../components/GeneralStatusBar';
import useLoginStore from '../../store/authentication/login.store';
import useLoaderStore from '../../store/loader.store';
import Icon, {Icons} from '../../components/Icons';
import {darkenColor} from '../../helper/utils/getDarkColor';
import {
  getRandomBackgroundColor,
  getRandomColor,
} from '../../helper/utils/colors';

const jobDescription = {
  image: Image1,
};

const ApplyNow = ({route, navigation}) => {
  const {
    getNearByJobById,
    job,
    clearJob,
    appliedJob,
    applyForJob,
    getJobApplicationByParams,
    getAppliedJobDetailsById,
  } = useJobStore();
  const {loggedInUser} = useLoginStore();
  const {isLoading} = useLoaderStore();

  const handleAppliedJob = async () => {
    const res = await applyForJob({
      jobid: job?._id,
      employerid: job?.createdby,
    });
    if (res) {
      const appliedJobResponse = await getAppliedJobDetailsById(res);
      if (appliedJobResponse) {
        console.log(
          JSON.stringify(
            '\n\n appliedJobResponse',
            appliedJobResponse,
            null,
            4,
          ),
        );
        // if above call success then it will return true else false;
        // navigation.navigate('Chat', {
        //   appliedJobId: appliedJobResponse?._id,
        //   chatid: appliedJobResponse?.chatid,
        // });
      }
    }
  };
  const bgColor = getRandomColor(route?.params?.index);

  const handleBookmarkPress = () => {
    // Handle bookmark button press logic here
    console.log('Bookmark button pressed!');
  };

  const handleChatNavigation = () => {
    const employerName = `${job?.employerDetails?.firstname} ${job?.employerDetails?.lastname}`;
    const payload = {
      chatid: job.jobAppliedDetails.chatid,
      appliedJobId: job.jobAppliedDetails._id,
      employerDetails: {...job.employerDetails, name: employerName},
      bgColor,
    };
    navigation.navigate('Chat', payload);
  };

  useEffect(() => {
    if (route?.params?.id) {
      getNearByJobById(route?.params?.id);
    }
  }, [route?.params?.id]);

  useEffect(() => {
    return () => {
      clearJob();
    };
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={tw`flex-1`} edges={['top']}>
        <GeneralStatusBar backgroundColor={bgColor} />
        <View style={tw`flex w-full h-full justify-center items-center`}>
          <View
            style={tw`w-full h-1/3 bg-[${
              bgColor ? bgColor : '#000000'
            }]`}></View>
          <View style={tw`w-full h-2/3 bg-white`}></View>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={tw`flex-1`} edges={['top']}>
      <GeneralStatusBar backgroundColor={bgColor} />
      <View style={tw`h-full bg-[${bgColor}]`}>
        <View
          style={[
            tw`bg-[${bgColor}] px-5 pb-10 pt-5 h-[40%] items-center gap-4`,
          ]}>
          {/* chevron and bookmark button */}
          <View style={tw`w-full flex-row items-center justify-between`}>
            {[
              {name: 'chevron-back', onPress: () => navigation.goBack()},
              {name: 'bookmark', onPress: handleBookmarkPress},
            ]?.map(icon => (
              <Pressable
                key={icon.name}
                onPress={icon.onPress}
                style={({pressed}) => [
                  tw`p-2 rounded-full ${pressed ? 'bg-black/20' : ''}`,
                ]}>
                <Icon
                  type={Icons.Ionicons}
                  name={icon.name}
                  size={24}
                  color={'white'}
                />
              </Pressable>
            ))}
          </View>

          {/* Image and employer name */}
          <View style={tw`flex items-center justify-center`}>
            {job?.employerDetails?.profilepic ? (
              <Image
                source={{uri: job?.employerDetails?.profilepic}}
                style={tw`w-22 h-22 rounded-full`}
              />
            ) : (
              <View
                style={tw`w-22 h-22 flex items-center justify-center bg-white/10 rounded-full`}>
                <Icon
                  name={'user-circle'}
                  type={Icons.FontAwesome5}
                  size={60}
                  style={tw`text-white/20  rounded-full`}
                />
              </View>
            )}

            <Text
              style={[
                tw`text-xl my-3 text-white`,
                {fontFamily: 'Poppins-Bold'},
              ]}>
              {`Employer - ${job?.employerDetails?.firstname} ${job?.employerDetails?.lastname}`}
            </Text>
          </View>

          {/* Job Tags */}
          <View style={tw`w-full flex-row justify-around items-center`}>
            {job?.tags?.map(tag => (
              <Text
                key={tag}
                style={[
                  tw`text-sm text-white px-5 py-2 bg-white/10 rounded-full`,
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                {tag}
              </Text>
            ))}
          </View>

          {/* Salary and Location flex-row justify-around items-center */}
          <View style={[tw`w-2/3 py-1 rounded-xl flex-row justify-around`]}>
            <Text
              style={[
                tw`text-[14px] text-white`,
                {fontFamily: 'Poppins-Bold'},
              ]}>
              {job?.salary
                ? `₹ ${new Intl.NumberFormat('en-IN', {
                    maximumSignificantDigits: 3,
                  }).format(job?.salary)}/${job?.salarybasis}`
                : ''}
            </Text>
            <Text style={[tw`text-white`]}>|</Text>
            <Text
              style={[
                tw`text-[14px] text-white`,
                {fontFamily: 'Poppins-Bold'},
              ]}>
              {job?.location?.name ?? job?.location?.fulladdress}
            </Text>
          </View>
        </View>

        {/* 2nd Half */}
        <View
          style={tw`h-[60%] bg-[#f5f5f5] rounded-t-3xl justify-between pb-5 pt-10`}>
          <JobDetails job={job} bgColor={bgColor} />

          {/* Apply Now / Chat Call To Action buttons */}
          {!isLoading ? (
            job &&
            job.jobAppliedDetails &&
            job.jobAppliedDetails.hasOwnProperty('chatid') ? (
              <Pressable
                onPress={() => {
                  handleChatNavigation();
                }}
                style={({pressed}) => [
                  {
                    backgroundColor: pressed
                      ? darkenColor(bgColor, 20)
                      : bgColor,
                  },
                  tw`px-8 py-[16px] flex justify-center items-center rounded-[16px] mx-8 mt-5 shadow-lg shadow-[${bgColor}]}]`,
                ]}>
                {({pressed}) => (
                  <View style={tw`flex flex-row gap-3 items-center`}>
                    <Text
                      style={[
                        tw`text-white text-[16px]`,
                        {fontFamily: 'Poppins-SemiBold'},
                      ]}>
                      Chat
                    </Text>
                    <Icon
                      type={Icons.Ionicons}
                      name="chatbubbles-outline"
                      color="#FFFFFF"
                    />
                  </View>
                )}
              </Pressable>
            ) : (
              <Pressable
                onPress={handleAppliedJob}
                style={({pressed}) => [
                  {
                    backgroundColor: pressed
                      ? darkenColor(bgColor, 20)
                      : bgColor,
                  },
                  tw`px-8 py-[16px] flex justify-center items-center rounded-[16px] mx-8 mt-5 shadow-lg shadow-[${bgColor}]`,
                ]}>
                {({pressed}) => (
                  <Text
                    style={[
                      tw`text-white text-[16px]`,
                      {fontFamily: 'Poppins-SemiBold'},
                    ]}>
                    Apply Now
                  </Text>
                )}
              </Pressable>
            )
          ) : (
            <View
              style={tw`px-8 py-[16px] bg-gray-200 h-16 rounded-[16px] mx-8 mt-5`}></View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ApplyNow;

const JobDetails = ({job, bgColor}) => {
  return (
    <View style={tw`w-full gap-2 h-4/5 p-4`}>
      <View
        style={[
          tw`relative bg-white p-4 overflow-hidden w-full rounded-xl shadow`,
        ]}>
        <Text
          style={[
            tw`absolute top-0 left-0 px-5 rounded-br-full  bg-[${bgColor}] text-white text-[8px]`,
            {fontFamily: 'Poppins-SemiBold'},
          ]}>
          Job Title
        </Text>
        <Text style={[tw`text-black text-xl`, {fontFamily: 'Poppins-Bold'}]}>
          {job?.jobtitle}
        </Text>
      </View>
      <View
        style={[
          tw`relative bg-white p-4 overflow-hidden w-full rounded-xl shadow`,
        ]}>
        <Text
          style={[
            tw`absolute top-0 left-0 px-5 rounded-br-full bg-[${bgColor}] text-white text-[8px]`,
            {fontFamily: 'Poppins-SemiBold'},
          ]}>
          Job Description
        </Text>
        <Text style={[tw`text-black text-sm`, {fontFamily: 'Poppins-Regular'}]}>
          {job?.description}
        </Text>
      </View>
    </View>
  );
};
