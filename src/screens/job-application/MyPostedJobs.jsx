import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import useMenuStore from '../../store/menu.store';
import useLoaderStore from '../../store/loader.store';
import {useNavigation} from '@react-navigation/native';
import tw from 'twrnc';

const MyPostedJobs = () => {
  useColorScheme()
  const {postedJobs, getPostedJobs, clearPostedJobs} = useMenuStore();
  const {isLoading} = useLoaderStore();
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getPostedJobs();
    return () => {
      clearPostedJobs();
    };
  }, []);

  const refreshPostedJobs = async () => {
    setRefreshing(true);
    await getPostedJobs();
    setRefreshing(false);
  };

  return isLoading && !postedJobs ? (
    <MenuLoadingComponent />
  ) : postedJobs?.total == 0 ? (
    <NoDataMenuComponent message={'No jobs posted!'} />
  ) : (
    <>
      <Text style={[tw`my-1 text-right text-black`]}>
        Total: {postedJobs?.total}
      </Text>
      <JobPostedComponent
        refreshing={refreshing}
        refreshPostedJobs={refreshPostedJobs}
        isLoading={isLoading}
      />
    </>
  );
};

export default MyPostedJobs;

const MenuLoadingComponent = () => {
  return (
    <View style={tw`w-full bg-white dark:bg-gray-950 mt-5 gap-1 rounded`}>
      {Array.from({length: 10}, (_, i) => i)?.map(data => (
        <View
          key={data}
          style={tw`w-full h-15 bg-slate-200/50 dark:bg-gray-800 my-0.6 rounded-3`}></View>
      ))}
    </View>
  );
};
const NoDataMenuComponent = ({message}) => {
  return (
    <View style={tw`w-full h-full gap-4`}>
      <View style={tw`flex-1 justify-center items-center`}>
        <Text
          style={[tw`text-lg text-zinc-700 dark:text-zinc-400`, {fontFamily: 'Poppins-SemiBold'}]}>
          {message}
        </Text>
      </View>
    </View>
  );
};

const JobPostedComponent = ({refreshing, refreshPostedJobs, isLoading}) => {
  const {getPostedJobs, postedJobs} = useMenuStore();

  const fetchMorePostedJobs = async () => {
    if (postedJobs) {
      let {skip, total, limit} = postedJobs;
      if (postedJobs && skip < total) {
        skip = skip + limit;
        await getPostedJobs(skip, limit);
      }
    }
  };

  return (
    <FlatList
      style={tw`mb-16`}
      data={postedJobs?.data}
      renderItem={({item}) => <JobPostedCard job={item} />}
      keyExtractor={item => item._id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshPostedJobs} />
      }
      ListFooterComponent={
        <FooterComponent isLoading={isLoading} refreshing={refreshing} />
      }
      onEndReachedThreshold={0.2}
      onEndReached={fetchMorePostedJobs}
    />
  );
};

const JobPostedCard = ({job}) => {
  const navigation = useNavigation();
  const handleNavigationToAppliacants = job => {
    navigation.navigate('ApplicantListScreen', {job});
  };
  return (
    <TouchableOpacity
      key={job?._id}
      style={tw`w-full bg-white dark:bg-gray-800 px-5 my-0.6 gap-1 py-3 rounded border-l-4 border-r-4 border-emerald-500 shadow`}
      onPress={() => handleNavigationToAppliacants(job)}>
      <View style={tw`flex flex-row justify-between items-start`}>
        <Text
          style={[
            tw`text-[16px] text-black dark:text-white`,
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
              tw`text-xs text-gray-700 dark:text-gray-400`,
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
  );
};

const FooterComponent = ({isLoading, refreshing}) => {
  return (
    <View style={tw``}>
      <ActivityIndicator
        size={30}
        animating={!refreshing && isLoading}
        color={'#000000'}
      />
    </View>
  );
};
