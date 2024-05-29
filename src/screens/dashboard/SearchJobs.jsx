import React, {useEffect, useState, useCallback, useMemo} from 'react';
import FeaturedJobsElement from './components/jobs/FeaturedJobs';
import RecommendedJobsElement from './components/jobs/RecommendedJobs';
import NearbyJobsElement from './components/jobs/NearbyJobs';
import {Text, View} from 'react-native';
import useLoginStore from '../../store/authentication/login.store';
import useLoaderStore from '../../store/loader.store';
import useJobStore from '../../store/jobs.store';
import Categories from './Categories';
export const SearchJobs = ({navigation, location}) => {
  const userid = useLoginStore.getState().loggedInUser?._id;
  const {isLoading} = useLoaderStore();
  const {language} = useLoginStore();
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // if (location) {
    //   // getJobs(0, 5,{type:"nearby",coordinates:[location?.coords?.longitude, location?.coords?.latitude],reject:userid});
    //   getJobs(0, 5,{type:"nearby",reject:userid});
    // }
    getRecommendedJobs();
    getFeaturedJobs();
    setRefreshing(false);
  }, [location, getNearByJobs, getRecommendedJobs, getFeaturedJobs]);

  const {
    getNearByJobs,
    nearbyjobs,
    getRecommendedJobs,
    recommendedJobs,
    clearRecommendedJobs,
    clearFeaturedJobs,
    getFeaturedJobs,
    featuredJobs,
    getJobs,
  } = useJobStore();
  useEffect(() => {
    clearRecommendedJobs();
    clearFeaturedJobs();
    getJobs(0, 5, {type: 'nearby', excludeIdsInJobSearch: userid});
    getJobs(0, 5, {type: 'recommended', excludeIdsInJobSearch: [userid]});
    getJobs(0, 5, {type: 'featured', excludeIdsInJobSearch: [userid]});
    // getJobs(0, 5,{type:"nearby",coordinates:[location?.coords?.longitude, location?.coords?.latitude],excludeIds:[userid]});
    // getJobs(0, 5,{type:"recommended",coordinates:[location?.coords?.longitude, location?.coords?.latitude],excludeIds:[userid]});
    // getJobs(0, 5,{type:"featured",coordinates:[location?.coords?.longitude, location?.coords?.latitude],excludeIds:[userid]});
  }, []);

  return (
    <>
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
    </>
  );
};
