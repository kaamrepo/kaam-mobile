import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import useMenuStore from '../../store/menu.store';
import useLoaderStore from '../../store/loader.store';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import tw from 'twrnc';

const MyPostedJobs = () => {
  const {postedJobs, getPostedJobs, clearPostedJobs} = useMenuStore();
  const {isLoading} = useLoaderStore();

  useFocusEffect(
    useCallback(() => {
      getPostedJobs();
      return () => {
        clearPostedJobs();
      };
    }, []),
  );
  return isLoading ? (
    <MenuLoadingComponent />
  ) : postedJobs?.total == 0 ? (
    <NoDataMenuComponent message={'No jobs posted!'} />
  ) : (
    <JobPostedComponent postedJobs={postedJobs?.data} />
  );
};

export default MyPostedJobs;

const MenuLoadingComponent = () => {
  return (
    <View>
      {Array.from({length: 10}, (_, i) => i)?.map(data => (
        <View key={data} style={tw`w-full h-15 bg-white my-2 rounded-3`}></View>
      ))}
    </View>
  );
};
const NoDataMenuComponent = ({message}) => {
  return (
    <View style={tw`w-full h-full gap-4`}>
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={[tw`text-lg`, {fontFamily: 'Poppins-SemiBold'}]}>
          {message}
        </Text>
      </View>
    </View>
  );
};

const JobPostedComponent = ({postedJobs}) => {
  const navigation = useNavigation();
  const handleNavigationToAppliacants = job => {
    navigation.navigate('ApplicantListScreen', {job});
  };
  return (
    <ScrollView
      style={[tw`h-full gap-2`]}
      contentContainerStyle={{
        gap: 2,
      }}>
      {postedJobs?.map((job, index) => (
        <TouchableOpacity
          key={job?._id}
          style={tw`w-full bg-white px-5 my-0.6 gap-1 py-3 rounded border-l-4 border-r-4 shadow`}
          onPress={() => handleNavigationToAppliacants(job)}>
          <View style={tw`flex flex-row justify-between items-start`}>
            <Text
              style={[
                tw`text-[16px] text-black`,
                {fontFamily: 'Poppins-SemiBold'},
              ]}>
              {job?.jobtitle}
            </Text>

            <Text
              style={[
                tw`text-xs px-1.5 py-0.5 rounded-lg ${
                  job?.isactive
                    ? 'bg-green-600/20 text-green-600'
                    : 'bg-red-600/20 text-red-600'
                }`,
                {fontFamily: 'Poppins-SemiBold'},
              ]}>
              {job?.isactive ? 'Active' : 'Inactive'}
            </Text>
          </View>

          <View style={tw`flex-row justify-between`}>
            <View style={tw`flex flex-row gap-2 items-center`}>
              <Text
                style={[
                  tw`text-xs text-gray-700`,
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                Applicants
              </Text>
              <Text
                style={[
                  tw`text-xs text-white bg-zinc-700 px-2 py-0.3 rounded-xl`,
                  {fontFamily: 'Poppins-SemiBold'},
                ]}>
                {job?.appliedCount}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
