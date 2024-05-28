  import React, {useCallback} from 'react';
  import {View, Text, Image, Pressable, ActivityIndicator} from 'react-native';
  import tw from 'twrnc';
  import Image1 from '../../assets/images/browse-jobs.png';
  import {SafeAreaView} from 'react-native-safe-area-context';
  import useJobStore from '../../store/jobs.store';
  import GeneralStatusBar from '../../components/GeneralStatusBar';
  import useLoaderStore from '../../store/loader.store';
  import Icon, {Icons} from '../../components/Icons';
  import {darkenColor} from '../../helper/utils/getDarkColor';
  import {getRandomColor} from '../../helper/utils/colors';
  import {useFocusEffect} from '@react-navigation/native';
  import useLoginStore from '../../store/authentication/login.store';

  const jobDescription = {
    image: Image1,
  };

  const ApplyNow = ({route, navigation}) => {
    const {isLoading} = useLoaderStore();
    const bgColor = getRandomColor(route?.params?.index);
    const {getNearByJobById, job, clearJob, applyForJob} = useJobStore();

    useFocusEffect(
      useCallback(() => {
        if (route.params.id) getNearByJobById(route.params.id);
        return () => {
          clearJob();
        };
      }, [route.params.id]),
    );

    const handleBookmarkPress = () => {
      console.log('Bookmark button pressed!');
    };

    const handleChatNavigation = () => {
      console.log(" Chat", {
        appliedJobId: job.jobAppliedDetails._id,
        chatid: job.jobAppliedDetails.chatid,
        bgColor,
        name: `${job.employerDetails.firstname} ${job.employerDetails.lastname}`,
      });
      navigation.navigate('Chat', {
        appliedJobId: job.jobAppliedDetails._id,
        chatid: job.jobAppliedDetails.chatid,
        bgColor,
        name: `${job.employerDetails.firstname} ${job.employerDetails.lastname}`,
      });
    };

    const handleAppliedJob = async () => {
      console.log("job in apply before",job);
      const res = await applyForJob({
        jobid: job?._id,
        employerid: job?.createdby,
        initiator: useLoginStore.getState().loggedInUser?._id,
        appliedby: useLoginStore.getState().loggedInUser?._id
      });
      res && getNearByJobById(job?._id);
    };

    return (
      <SafeAreaView style={tw`flex-1`} edges={['top']}>
        <GeneralStatusBar backgroundColor={bgColor} />
        <View style={tw`flex-1`}>
          <View
            style={tw`px-5 py-4 w-full gap-8 h-1/2 bg-[${
              bgColor ? bgColor : '#000000'
            }]`}>
            {/* chevron and bookmark button */}
            <View style={tw`flex-row justify-between items-center`}>
              <PressableButton
                iconname={'chevron-back'}
                onPress={() => navigation.goBack()}
              />
              <PressableButton
                iconname={'bookmark'}
                onPress={handleBookmarkPress}
              />
            </View>
            {/* completed:chevron and bookmark button */}

            {/* image and employer name */}
            <View style={tw`flex gap-4 justify-center items-center`}>
              <Image
                source={jobDescription.image}
                style={tw`w-28 h-28 rounded-full`}
              />
              <Text
                style={[
                  tw`text-xl mt-2 text-white`,
                  {fontFamily: 'Poppins-Bold'},
                ]}>
                {job?.employerDetails
                  ? `Employer - ${job?.employerDetails?.firstname} ${job?.employerDetails?.lastname}`
                  : ''}
              </Text>
            </View>
            {/* completed:image and employer name */}

            {/* job tags */}
            <View
              style={tw`w-full flex-row flex-wrap gap-2 justify-around items-center`}>
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
            {/* completed:job tags */}

            {/* salary and location */}
            <View style={tw`flex-row justify-around items-center`}>
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
                    job?.location?.fulladdress?.substring(0, 15)}
                </Text>
              </View>
            </View>
            {/* completed:salary and location */}
          </View>
          <View style={tw`p-2 w-full h-1/2 bg-white justify-around`}>
            <JobDetails job={job} bgColor={bgColor} />
            {job?.jobAppliedDetails ? (
              <ActionButton
                label={'Chat'}
                onPress={handleChatNavigation}
                bgColor={bgColor}
                iconType={Icons.Ionicons}
                iconName={'chatbubbles-outline'}
              />
            ) : (
              <ActionButton
                label={'Apply Now'}
                onPress={handleAppliedJob}
                bgColor={bgColor}
                iconType={Icons.FontAwesome5}
                iconName={'user-tie'}
              />
            )}
          </View>
        </View>

        {isLoading && (
          <View
            style={[
              tw`absolute top-0 right-0 bottom-0 left-0 bg-transparent justify-center items-center`,
            ]}>
            <ActivityIndicator
              animating={isLoading}
              size={35}
              style={tw`text-green-500`}
            />
          </View>
        )}
      </SafeAreaView>
    );
  };

  export default ApplyNow;

  const PressableButton = ({iconname, onPress}) => (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        tw`p-2 rounded-full ${pressed ? 'bg-black/20' : ''}`,
      ]}>
      <Icon type={Icons.Ionicons} name={iconname} size={24} color={'white'} />
    </Pressable>
  );

  const ActionButton = ({label, onPress, bgColor, iconType, iconName}) => (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? darkenColor(bgColor, 20) : bgColor,
        },
        tw`px-8 py-[16px] flex flex-row gap-4 justify-center items-center rounded-[16px] mx-8 mt-5 shadow-lg shadow-[${bgColor}]`,
      ]}>
      <Icon type={iconType} name={iconName} color="#FFFFFF" />
      <Text
        style={[tw`text-white text-[16px]`, {fontFamily: 'Poppins-SemiBold'}]}>
        {label}
      </Text>
    </Pressable>
  );

  const JobDetails = ({job, bgColor}) => {
    return (
      <View style={tw`w-full gap-2 p-4`}>
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
