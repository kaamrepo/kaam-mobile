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
      style={[tw`py-10 bg-[#FAFAFD]`]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
            <View style={tw`w-12 h-12 rounded-lg`}>
              {loggedInUser?.profilepic ? (
                <Image
                  source={{uri: loggedInUser.profilepic}}
                  style={[tw`w-[48px] h-[48px] rounded-3`]}
                />
              ) : (
                <View
                  style={[
                    tw`w-[48px] h-[48px] rounded-3 bg-violet-600/60 flex-row justify-center items-center overflow-hidden`,
                  ]}>
                  <Text
                    style={[
                      tw`text-[40px] text-white`,
                      {fontFamily: 'Poppins-Bold', verticalAlign: 'middle'},
                    ]}>
                    {loggedInUser.firstname.charAt(0)}
                    {loggedInUser.lastname.charAt(0)}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
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
