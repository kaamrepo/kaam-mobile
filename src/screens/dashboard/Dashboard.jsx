import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  Pressable,
  RefreshControl,
} from 'react-native';

import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Feather';
import Image1 from '../../assets/images/browse-jobs.png';
import Image2 from '../../assets/images/IntroScreenJobsAndInvitations.png';
import Image3 from '../../assets/images/search-dream-job.png';
import MenuIconSVG from '../../assets/svgs/Menu Icon.svg';
import FilterIconSVG from '../../assets/svgs/FilterIcon.svg';
import useLoginStore from '../../store/authentication/login.store';
import capitalizeFirstLetter from '../../helper/utils/capitalizeFirstLetter';
import GeneralStatusBar from '../../components/GeneralStatusBar';
import useJobStore from '../../store/dashboard.store';
import useLoaderStore from '../../store/loader.store';
import {requestLocationPermission} from '../../helper/utils/getGeoLocation';
import Geolocation from 'react-native-geolocation-service';
import {dashboardTranslation} from './dashboardTranslation';
import FeaturedJobsElement from './FeaturedJobsElement';
import RecommendedJobsElement from './RecommendedJobsElement';
import NearbyJobsElement from './NearbyJobsElement';
import {useFocusEffect} from '@react-navigation/native';

const Dashboard = ({navigation}) => {
  const [isRefreshing, setRefreshing] = useState(false);
  const {loggedInUser, language} = useLoginStore();
  const {nearbyjobs, getNearByJobs} = useJobStore();
  const {isLoading} = useLoaderStore();
  const [location, setLocation] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (location) {
      getNearByJobs(0, 5, [
        location?.coords?.longitude,
        location?.coords?.latitude,
      ]);
    }
    setRefreshing(false);
  }, [location]);

  useFocusEffect(
    useCallback(() => {
      const result = requestLocationPermission();
      result.then(res => {
        if (res) {
          Geolocation.getCurrentPosition(
            position => {
              setLocation(position);
            },
            error => {
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }
      });
    }, []),
  );
  useFocusEffect(
    useCallback(() => {
      if (location) {
        getNearByJobs(0, 5, [
          location?.coords?.longitude,
          location?.coords?.latitude,
        ]);
      }
    }, [location]),
  );

  const featuredJobs = {
    total: 3,
    skip: 0,
    limit: 0,
    data: [
      {
        _id: 'fghjkl',
        image: Image1,
        title: 'Jr Executive',
        description: 'Tester',
        value: 960000,
        location: 'Delhi',
      },
      {
        _id: 'fghgjkl',
        image: Image2,
        title: 'Jr Engineer',
        description: 'Devloper',
        value: 98765,
        location: 'Pune',
      },
      {
        _id: 'fghjksl',
        image: Image3,
        title: 'Sr tester',
        description: 'Automation',
        value: 576778,
        location: 'Mumbai',
      },
    ],
  };

  const recommendedJobsData = {
    total: 3,
    skip: 0,
    limit: 0,
    data: [
      {
        image: Image1,
        title: 'Homemade Cook',
        value: 960000,
        location: 'Mumbai',
        bgcolor: '#28282B',
      },
      {
        image: Image2,
        title: 'Maid',
        value: 960000,
        location: 'Pune',
        bgcolor: '#80461b',
      },
      {
        image: Image3,
        title: 'Hotel helper',
        value: 960000,
        location: 'Delhi',
        bgcolor: '#ce5f38',
      },
    ],
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
      style={[tw`py-10 bg-[#FAFAFD]`]}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }>
      <GeneralStatusBar backgroundColor={'#d6d6d6'} />
      <View style={tw`mx-5 mb-4 rounded-3 justify-center`}>
        <View style={tw`flex-row justify-between items-center`}>
          <View style={tw`flex-row items-center gap-5`}>
            <Pressable
              onPress={() => {
                navigation.openDrawer();
              }}
              style={({pressed}) => [
                tw`p-2 h-12 w-12 rounded-full flex-row justify-center items-center ${
                  pressed ? 'bg-slate-200' : ''
                }`,
              ]}>
              <MenuIconSVG width={25} height={25} />
            </Pressable>
            <View style={tw`justify-center`}>
              <Text
                style={[tw`text-slate-600`, {fontFamily: 'Poppins-Regular'}]}>
                {dashboardTranslation[language]['Welcome']},
              </Text>
              <Text
                style={[tw`text-xl text-black`, {fontFamily: 'Poppins-Bold'}]}>
                {`${capitalizeFirstLetter(
                  loggedInUser?.firstname,
                )} ${capitalizeFirstLetter(loggedInUser?.lastname)}`}{' '}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('View Profile')}
            style={tw`w-12 h-12`}>
            <View
              style={tw`w-12 h-12  rounded-lg shadow-2xl shadow-orange-800`}>
              {loggedInUser?.profilepic ? (
                <Image
                  source={{uri: loggedInUser.profilepic}}
                  style={[tw`w-[48px] h-[48px] rounded-3`]}
                />
              ) : (
                <Image
                  source={require('../../assets/images/default-profile.jpg')}
                  style={[tw`w-[48px] h-[48px] rounded-3`]}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={tw`flex-row items-center mb-4 mx-5`}>
        <View
          style={tw`flex-1 bg-[#F2F2F3] rounded-lg h-10 flex-row items-center pr-2`}>
          <Icon name="search" size={20} color="gray" style={tw`mx-2`} />
          <TextInput
            style={tw`flex-1 text-sm text-black`}
            placeholder="Search"
            placeholderTextColor="gray"
          />
        </View>
        <TouchableOpacity
          style={tw`w-10 h-10 bg-[#F2F2F3] rounded-lg items-center justify-center ml-2`}>
          <FilterIconSVG />
        </TouchableOpacity>
      </View>

      <NearbyJobsElement {...{language, nearbyjobs, isLoading, navigation}} />
      <RecommendedJobsElement
        {...{language, recommendedJobsData, isLoading, navigation}}
      />
      <FeaturedJobsElement
        featuredJobs={featuredJobs}
        isLoading={isLoading}
        language={language}
        navigation={navigation}
      />
    </ScrollView>
  );
};

export default Dashboard;

const RecommendedJobsFillerComponent = ({isLoading}) => {
  return (
    <View style={tw`w-full items-center px-5 h-48`}>
      <View
        style={tw`w-full h-full justify-center bg-neutral-100 border border-neutral-300 rounded-3`}>
        <Text
          style={[
            tw`text-center text-sm leading-relaxed text-gray-600`,
            {fontFamily: 'Poppins-Regular'},
          ]}>
          {isLoading ? '' : 'There are no nearby jobs'}
        </Text>
      </View>
    </View>
  );
};
