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
      const success = await getAppliedJobDetailsById(res);
      if (success) {
        // if above call success then it will return true else false;
        navigation.navigate('Chat', {
          appliedJobId: appliedJob?._id,
          chatid: appliedJob?.chatid,
        });
      }
    }
  };
  const [activeTab, setActiveTab] = useState('description');

  const handleBackPress = () => {
    // Handle back button press logic here
    console.log('Back button pressed!');
    navigation.goBack();
  };

  const handleBookmarkPress = () => {
    // Handle bookmark button press logic here
    console.log('Bookmark button pressed!');
  };

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  const handleChatNavigation = appliedJob => {
    navigation.navigate('Chat', {
      appliedJobId: appliedJob?._id,
      chatid: appliedJob?.chatid,
    });
  };

  useEffect(() => {
    if (route?.params?.id) {
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

  return (
    <SafeAreaView style={tw`flex-1`} edges={['top']}>
      <GeneralStatusBar backgroundColor={job?.styles?.bgcolor} />
      <View style={tw`flex-1`}>
        <View
          style={tw`flex-1 ${
            job?.styles?.bgcolor ? `bg-[${job?.styles?.bgcolor}]` : 'bg-white'
          } px-5`}>
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
                color={job?.styles?.color ? `${job?.styles?.color}` : 'white'}
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
                color={job?.styles?.color ? `${job?.styles?.color}` : 'white'}
              />
            </Pressable>
          </View>
          <View style={tw`flex items-center justify-center py-3`}>
            <Image
              source={jobDescription.image}
              style={tw`w-28 h-28 rounded-full`}
            />
            <Text
              style={[
                tw`text-xl mt-2 ${
                  job?.styles?.color
                    ? `text-[${job?.styles?.color}]`
                    : 'text-white'
                }`,
                {fontFamily: 'Poppins-Bold'},
              ]}>
              {job?.employerDetails?.firstname}
            </Text>
            <Text
              style={[
                tw`text-lg ${
                  job?.styles?.color
                    ? `text-[${job?.styles?.color}]`
                    : 'text-white'
                }`,
                {fontFamily: 'Poppins-Bold'},
              ]}>
              {job?.position}
            </Text>
          </View>
          <View style={tw`flex-row justify-around items-center my-1`}>
            {job?.tags?.map(tag => (
              <Text
                key={tag}
                style={[
                  tw`text-xs ${
                    job?.styles?.color
                      ? `text-[${job?.styles?.color}]`
                      : 'text-white'
                  } px-5 py-[5px] bg-blue-200/30 rounded-full`,
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                {tag}
              </Text>
            ))}
          </View>
          <View style={tw`flex-row justify-between items-center my-3`}>
            <View>
              <Text
                style={[
                  tw`text-[14px] ${
                    job?.styles?.color
                      ? `text-[${job?.styles?.color}]`
                      : 'text-white'
                  }`,
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
                  tw`text-[14px]  ${
                    job?.styles?.color
                      ? `text-[${job?.styles?.color}]`
                      : 'text-white'
                  }`,
                  {fontFamily: 'Poppins-Bold'},
                ]}>
                {job?.location?.name}
              </Text>
            </View>
          </View>
        </View>
        <View style={tw`flex-1 bg-white justify-between pb-5`}>
          <View>
            <View
              style={tw`flex-row justify-between items-center p-4 bg-white`}>
              <Pressable onPress={() => handleTabChange('description')}>
                <Text
                  style={[
                    tw`${
                      activeTab === 'description'
                        ? 'text-blue-500'
                        : 'text-gray-500'
                    }`,
                    {fontFamily: 'Poppins-SemiBold'},
                  ]}>
                  Description
                </Text>
              </Pressable>
              <Pressable onPress={() => handleTabChange('requirement')}>
                <Text
                  style={[
                    tw`${
                      activeTab === 'requirement'
                        ? 'text-blue-500'
                        : 'text-gray-500'
                    }`,
                    {fontFamily: 'Poppins-SemiBold'},
                  ]}>
                  Requirement
                </Text>
              </Pressable>
              <Pressable onPress={() => handleTabChange('about')}>
                <Text
                  style={[
                    tw`${
                      activeTab === 'about' ? 'text-blue-500' : 'text-gray-500'
                    }`,
                    {fontFamily: 'Poppins-SemiBold'},
                  ]}>
                  About
                </Text>
              </Pressable>
              <Pressable onPress={() => handleTabChange('review')}>
                <Text
                  style={[
                    tw`${
                      activeTab === 'review' ? 'text-blue-500' : 'text-gray-500'
                    }`,
                    {fontFamily: 'Poppins-SemiBold'},
                  ]}>
                  Review
                </Text>
              </Pressable>
            </View>
            <View style={tw`flex`}>{renderTabContent(activeTab, job)}</View>
          </View>
          {!isLoading ? (
            appliedJob && Object.keys(appliedJob)?.length ? (
              <Pressable
                onPress={() => {
                  handleChatNavigation(appliedJob);
                }}
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? '#418c4d' : '#0E9D57',
                  },
                  tw`px-8 py-[16px] flex justify-center items-center rounded-[16px] mx-8 mt-5 shadow-lg shadow-green-500`,
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
                    backgroundColor: pressed ? '#418c4d' : '#0E9D57',
                  },
                  tw`px-8 py-[16px] flex justify-center items-center rounded-[16px] mx-8 mt-5 shadow-lg shadow-green-500`,
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
