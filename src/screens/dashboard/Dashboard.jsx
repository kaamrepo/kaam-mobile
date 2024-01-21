import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  Pressable,
  RefreshControl,
} from 'react-native';

import tw from 'twrnc';
import MenuIconSVG from '../../assets/svgs/Menu Icon.svg';
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
  const [refreshing, setRefreshing] = useState(false);
  const {loggedInUser, language} = useLoginStore();
  const {
    getNearByJobs,
    nearbyjobs,
    getRecommendedJobs,
    recommendedJobs,
    clearRecommendedJobs,
    clearFeaturedJobs,
    getFeaturedJobs,
    featuredJobs,
  } = useJobStore();
  const {isLoading} = useLoaderStore();
  const [location, setLocation] = useState(undefined);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    if (location) {
      getNearByJobs(0, 5, [
        location?.coords?.longitude,
        location?.coords?.latitude,
      ]);
    }
    getRecommendedJobs();
    getFeaturedJobs();
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
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
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

  useEffect(() => {
    clearRecommendedJobs();
    clearFeaturedJobs();
    getRecommendedJobs();
    getFeaturedJobs();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
      style={[tw`pb-10 pt-8 mb-12 bg-[#FAFAFD]`]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <GeneralStatusBar backgroundColor={'#d6d6d6'} />
      <View style={tw`mx-5 my-4 rounded-3 justify-center bg-gray-100 relative`}>
        <View style={tw`flex flex-row gap-5 justify-between items-center`}>
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

          <TouchableOpacity
            onPress={() => navigation.navigate('View Profile')}
            style={tw`flex flex-row items-center gap-4`}>
            <View style={tw`justify-center`}>
              <Text
                style={[
                  tw`text-slate-600 text-right`,
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                {dashboardTranslation[language]['Welcome']}
              </Text>
              <Text
                style={[
                  tw`text-xl text-black text-right`,
                  {fontFamily: 'Poppins-Bold'},
                ]}>
                {`${capitalizeFirstLetter(
                  loggedInUser?.firstname,
                )} ${capitalizeFirstLetter(loggedInUser?.lastname)}`}
              </Text>
            </View>
            <View
              style={tw`w-12 h-12 bg-gray-100 rounded-lg justify-center items-center`}>
              {loggedInUser?.profilepic ? (
                <Image
                  source={{uri: loggedInUser.profilepic}}
                  style={[tw`w-12 h-12 rounded-3`]}
                />
              ) : (
                <Image
                  source={require('../../assets/images/default-profile.jpg')}
                  style={[tw`w-12 h-12 rounded-3`]}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={[
            tw`w-18 h-18 rounded-full absolute -top-3 -right-3 bottom-0 bg-gray-100`,
            {zIndex: -10},
          ]}></View>
      </View>
      <NearbyJobsElement
        {...{language, nearbyjobs, isLoading, navigation, location}}
      />
      <RecommendedJobsElement
        {...{language, recommendedJobs, isLoading, navigation}}
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
