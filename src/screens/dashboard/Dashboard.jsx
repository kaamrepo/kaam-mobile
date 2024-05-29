import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
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
import {Header} from '../../components/Header';
import AvailableStaff from './components/staff/AvailableStaff';
import AvailableJob from './components/jobs/AvailableJob';
const Dashboard = ({navigation}) => {
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

  const searchToggleComponent = useMemo(
    () => (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Animated.View
          style={{
            width: '98%',
            height: 60,
            borderRadius: 15,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <TouchableOpacity
            style={{
              width: '50%',
              height: 50,
              backgroundColor:
                selectedSearchType === 'jobs' ? '#ffff' : '#E0FBE2',
              borderWidth: selectedSearchType === 'jobs' ? 1 : 0,
              borderColor:
                selectedSearchType === 'jobs' ? 'grey' : 'transparent',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => handlePress('jobs')}>
            <Animated.Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '700',
                opacity: selectedSearchType === 'jobs' ? 1 : 0.3,
              }}>
              Search Jobs
            </Animated.Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '50%',
              height: 50,
              backgroundColor:
                selectedSearchType === 'staff' ? '#ffff' : '#E0FBE2',
              borderWidth: selectedSearchType === 'staff' ? 1 : 0,
              borderColor:
                selectedSearchType === 'staff' ? 'grey' : 'transparent',
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => handlePress('staff')}>
            <Animated.Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '700',
                opacity: selectedSearchType === 'staff' ? 1 : 0.3,
              }}>
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
      <Header navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        style={[tw`bg-[#FAFAFD]`]}>
        <GeneralStatusBar backgroundColor={'#d6d6d6'} />
        {searchToggleComponent}

        <Categories
          {...{
            language,
            navigation,
            isLoading,
            selectedSearchType,
          }}></Categories>
        {selectedSearchType === 'jobs' && (
          <AvailableJob
            {...{
              navigation,
              location,
              language,
              selectedSearchType,
            }}></AvailableJob>
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
