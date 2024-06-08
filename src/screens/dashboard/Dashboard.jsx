import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {View, Animated, ScrollView, TouchableOpacity, useColorScheme} from 'react-native';
import tw from 'twrnc';
import {SafeAreaView} from 'react-native-safe-area-context';
import GeneralStatusBar from '../../components/GeneralStatusBar';
import {useFocusEffect} from '@react-navigation/native';
import useLoginStore from '../../store/authentication/login.store';
import useJobStore from '../../store/jobs.store';
import useLoaderStore from '../../store/loader.store';
import useUsersStore from '../../store/authentication/user.store';
import {
  requestLocationPermission,
  getCoordinates,
} from '../../helper/utils/getGeoLocation';
import Geolocation from 'react-native-geolocation-service';
import Categories from './Categories';
import {HeaderBanner} from '../../components/HeaderBanner';
import AvailableStaff from './components/staff/AvailableStaff';
import AvailableJob from './components/jobs/AvailableJob';
const Dashboard = ({navigation}) => {
  const colorScheme = useColorScheme();
  const [selectedSearchType, setSelectedSearchType] = useState('staff');
  const [location, setLocation] = useState(undefined);
  const {loggedInUser, language} = useLoginStore();
  const {updateUserCoordinates} = useUsersStore();
  const {
    getNearByJobs,
    getRecommendedJobs,
    clearRecommendedJobs,
    clearFeaturedJobs,
    getFeaturedJobs,
  } = useJobStore();
  const {isLoading} = useLoaderStore();

  // Memoized Callbacks
  const handlePress = useCallback(type => {
    setSelectedSearchType(type);
  }, []);

  // Fetching user coordinates
  useEffect(() => {
    
    const fetchCoordinates = async () => {
      const position = await getCoordinates();
      const {latitude: currentLat, longitude: currentLon} = position?.coords;
      const userCoordinates = loggedInUser?.coordinates;
      const calculateDistance = (lat1, lon1, lat2, lon2) => {
        // Your distance calculation function
      };
      if (
        !userCoordinates?.length ||
        calculateDistance(
          userCoordinates[0],
          userCoordinates[1],
          currentLat,
          currentLon,
        ) > 10
      ) {
        updateUserCoordinates({
          source: 'updatelocation',
          lat: currentLat,
          long: currentLon,
        });
      }
    };
    fetchCoordinates();
  }, [loggedInUser, updateUserCoordinates]);

  // Fetching nearby jobs on focus
  useFocusEffect(
    useCallback(() => {
      const result = requestLocationPermission();
      result.then(res => {
        if (res) {
          Geolocation.getCurrentPosition(
            position => setLocation(position),
            error => console.log(error.code, error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );
        }
      });
    }, []),
  );

  // Fetch nearby jobs when location changes
  useEffect(() => {
    if (location) {
      getNearByJobs(0, 5, [
        location?.coords?.longitude,
        location?.coords?.latitude,
      ]);
    }
  }, [location, getNearByJobs]);

  // Fetch recommended and featured jobs
  useEffect(() => {
    clearRecommendedJobs();
    clearFeaturedJobs();
    getRecommendedJobs();
    getFeaturedJobs();
  }, [
    clearRecommendedJobs,
    clearFeaturedJobs,
    getRecommendedJobs,
    getFeaturedJobs,
  ]);

  const SearchToggleComponent = useMemo(
    () => (
      <View
        style={[
          tw`w-[75%] p-1.5 mx-auto flex-row justify-center items-center my-2 rounded-xl bg-white dark:bg-slate-800 shadow`,
        ]}>
        <Animated.View
          style={[tw`flex flex-row items-center rounded-lg overflow-hidden`]}>
          <TouchableOpacity
            style={[
              tw`flex-1 py-2 items-center justify-center rounded-lg ${
                selectedSearchType == 'jobs'
                  ? 'bg-emerald-500'
                  : 'text-black/50'
              } `,
            ]}
            onPress={() => handlePress('jobs')}>
            <Animated.Text
              style={[
                tw`text-[15px] ${
                  selectedSearchType == 'jobs'
                    ? 'text-white'
                    : 'text-black/50 dark:text-gray-300'
                }`,
                {fontFamily: 'Poppins-SemiBold'},
              ]}>
              Search Jobs
            </Animated.Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`flex-1 py-2 items-center justify-center rounded-lg ${
                selectedSearchType == 'staff'
                  ? 'bg-emerald-500'
                  : 'text-black/50 '
              }`,
            ]}
            onPress={() => handlePress('staff')}>
            <Animated.Text
              style={[
                tw`text-[15px] ${
                  selectedSearchType == 'staff'
                    ? 'text-white'
                    : 'text-black/50 dark:text-gray-300'
                }`,
                {fontFamily: 'Poppins-SemiBold'},
              ]}>
              Search Staff
            </Animated.Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    ),
    [selectedSearchType, handlePress],
  );

  return (
    <SafeAreaView style={[tw`h-full`]}>
      <HeaderBanner navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        style={[tw`bg-[#FAFAFD] dark:bg-gray-950`]}>
        <GeneralStatusBar backgroundColor={'#d6d6d6'} />
        {SearchToggleComponent}

        <Categories
          {...{
            language,
            navigation,
            isLoading,
            selectedSearchType,
          }}
        />
        {selectedSearchType === 'jobs' && (
          <AvailableJob
            {...{
              navigation,
              location,
              language,
              selectedSearchType,
            }}
          />
        )}
        {selectedSearchType === 'staff' && (
          <AvailableStaff
            {...{navigation, location, language, selectedSearchType}}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
