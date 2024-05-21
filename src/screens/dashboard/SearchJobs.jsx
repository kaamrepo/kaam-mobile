
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import FeaturedJobsElement from './components/jobs/FeaturedJobs';
import RecommendedJobsElement from './components/jobs/RecommendedJobs';
import NearbyJobsElement from './components/jobs/NearbyJobs';
import {Text,View} from 'react-native';
import useLoginStore from '../../store/authentication/login.store';
import useLoaderStore from '../../store/loader.store';
import useJobStore from '../../store/jobs.store';
export const SearchJobs = ({navigation,location}) => {
  const {isLoading} = useLoaderStore();
const {language} = useLoginStore();
const onRefresh = useCallback(() => {
  setRefreshing(true);
  if (location) {
    getNearByJobs(0, 5, [location?.coords?.longitude, location?.coords?.latitude]);
  }
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
} = useJobStore();
useEffect(() => {
  clearRecommendedJobs();
  clearFeaturedJobs();
  getRecommendedJobs();
  getFeaturedJobs();
}, [clearRecommendedJobs, clearFeaturedJobs, getRecommendedJobs, getFeaturedJobs]);

  return (<View>
  <Text> From searchJobs</Text>
<NearbyJobsElement {...{ language, nearbyjobs, isLoading, navigation, location }} />
<RecommendedJobsElement {...{ language, recommendedJobs, isLoading, navigation }} />
<FeaturedJobsElement featuredJobs={featuredJobs} isLoading={isLoading} language={language} navigation={navigation} />

  </View>);
};
