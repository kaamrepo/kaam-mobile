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
      //  this will return the job application id if available or return false;
      const appliedJobResponse = await getAppliedJobDetailsById(res);
      if (appliedJobResponse) {
        // if above call success then it will return true else false;
        navigation.navigate('Chat', {
          appliedJobId: appliedJobResponse?._id,
          chatid: appliedJobResponse?.chatid,
        });
      }
    }
  };
  const bgColor = getRandomColor(route?.params?.index);

  const handleBackPress = () => {
    // Handle back button press logic here
    console.log('Back button pressed!');
    navigation.goBack();
  };

  const handleBookmarkPress = () => {
    // Handle bookmark button press logic here
    console.log('Bookmark button pressed!');
  };

  const handleChatNavigation = appliedJob => {
    console.log(JSON.stringify(appliedJob, null, 4));
    const employerName = `${appliedJob?.jobDetails?.employerDetails?.firstname} ${appliedJob?.jobDetails?.employerDetails?.lastname}`;
    console.log('employerName', employerName);
    // navigation.navigate('Chat', {
    //   appliedJobId: appliedJob?._id,
    //   chatid: appliedJob?.chatid,
    //   bgColor,
    //   employerName,
    // });
  };

  useEffect(() => {
    if (route?.params?.id) {
      console.log(route?.params?.id);
      getNearByJobById(route?.params?.id);
    }
  }, [route?.params?.id]);

  useEffect(() => {
    if (job && Object.keys(job)?.length && loggedInUser) {
      getJobApplicationByParams(job?._id, loggedInUser?._id);
    }
  }, [job, loggedInUser]);

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
            style={tw`w-full h-1/2 bg-[${
              bgColor ? bgColor : '#000000'
            }]`}></View>
          <View style={tw`w-full h-1/2 bg-white`}></View>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={tw`flex-1`} edges={['top']}>
      <GeneralStatusBar backgroundColor={bgColor} />
      <View style={tw`flex-1`}>
        <View style={tw`flex-1 bg-[${bgColor}] px-5`}>
          {/* chevron and bookmark button */}
          <View style={tw`flex-row items-center justify-between py-4`}>
            <Pressable
              onPress={handleBackPress}
              style={({pressed}) => [
                tw`p-2 rounded-full ${pressed ? 'bg-black/20' : ''}`,
              ]}>
              <Icon
                type={Icons.Ionicons}
                name="chevron-back"
                size={24}
                color={'white'}
              />
            </Pressable>

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

          {/* Image and employer name */}
          <View style={tw`flex items-center justify-center my-1`}>
            <Image
              source={jobDescription.image}
              style={tw`w-28 h-28 rounded-full`}
            />
            <Text
              style={[
                tw`text-xl mt-2 text-white`,
                {fontFamily: 'Poppins-Bold'},
              ]}>
              Employer:{' '}
              {job?.employerDetails?.firstname +
                ' ' +
                job?.employerDetails?.lastname}
            </Text>
          </View>

          {/* Job Tags */}
          <View style={tw`flex-row justify-around items-center my-1`}>
            {job?.tags?.map(tag => (
              <Text
                key={tag}
                style={[
                  tw`text-sm text-white px-5 py-[5px] shadow-lg bg-blue-200/30 rounded-full`,
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                {tag}
              </Text>
            ))}
          </View>

          {/* Salary and Location */}
          <View style={tw`flex-row justify-between items-center my-3`}>
            <View>
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
            </View>
            <View>
              <Text
                style={[
                  tw`text-[14px] text-white`,
                  {fontFamily: 'Poppins-Bold'},
                ]}>
                {job?.location?.name ??
                  job?.location?.fulladdress?.substring(0, 10)}
              </Text>
            </View>
          </View>
        </View>

        {/* 2nd Half */}
        <View style={tw`flex-1 bg-[#f5f5f5] justify-between pb-5`}>
          <JobDetails job={job} bgColor={bgColor} />

          {/* Apply Now / Chat Call To Action buttons */}
          {!isLoading ? (
            appliedJob && Object.keys(appliedJob)?.length ? (
              <Pressable
                onPress={() => {
                  handleChatNavigation(appliedJob);
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
                  <View style={tw`flex flex-row gap-3 items-start`}>
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

const renderTabContent = (activeTab, job) => {
  switch (activeTab) {
    case 'description':
      return (
        <View style={tw`p-4`}>
          <Text style={[tw`text-lg`, {fontFamily: 'Poppins-SemiBold'}]}>
            Job Description
          </Text>
          <Text style={[tw`text-[12px]`, {fontFamily: 'Poppins-Regular'}]}>
            {job?.description}
          </Text>
        </View>
      );
    case 'requirement':
      return (
        <View style={tw`p-4`}>
          <Text style={[tw`text-lg`, {fontFamily: 'Poppins-SemiBold'}]}>
            Job Requirement
          </Text>
          <Text style={[tw`text-[12px]`, {fontFamily: 'Poppins-Regular'}]}>
            {job?.requirements}
          </Text>
          {job?.requirements && <WebView source={{html: job?.requirements}} />}
        </View>
      );
    case 'about':
      return (
        <View style={tw`p-4`}>
          <Text style={[tw`text-lg`, {fontFamily: 'Poppins-SemiBold'}]}>
            About the Company
          </Text>
          <Text style={[tw`text-[12px]`, {fontFamily: 'Poppins-Regular'}]}>
            {job?.about}
          </Text>
        </View>
      );
    case 'review':
      return (
        <View style={tw`p-4`}>
          <Text style={[tw`text-lg`, {fontFamily: 'Poppins-SemiBold'}]}>
            Review
          </Text>
          <Text style={[tw`text-[12px]`, {fontFamily: 'Poppins-Regular'}]}>
            {job?.review}
          </Text>
        </View>
      );
    default:
      return null;
  }
};

const Tabs = ({label, value}) => {
  return (
    <Pressable onPress={() => handleTabChange()}>
      <Text
        style={[
          tw`${activeTab === value ? 'text-blue-500' : 'text-gray-500'}`,
          {fontFamily: 'Poppins-SemiBold'},
        ]}>
        Description
      </Text>
    </Pressable>
  );
};

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
