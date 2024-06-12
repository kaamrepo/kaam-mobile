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
import dayjs from 'dayjs';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';

const MyAppliedJobs = () => {
  useColorScheme();
  const {jobapplications, getJobApplications, clearJobApplications} =
    useMenuStore();
  const {isLoading} = useLoaderStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getJobApplications();
    return () => {
      clearJobApplications();
    };
  }, []);

  const refreshJobData = async () => {
    setRefreshing(true);
    await getJobApplications();
    setRefreshing(false);
  };

  return isLoading && !jobapplications ? (
    <MenuLoadingComponent />
  ) : jobapplications?.total == 0 ? (
    <NoDataMenuComponent message={'No applications found!'} />
  ) : (
    <>
      <Text style={[tw`my-1 text-right text-black dark:text-white`]}>
        Total: {jobapplications?.total}
      </Text>
      <JobApplicationsComponent
        refreshing={refreshing}
        refreshJobData={refreshJobData}
        isLoading={isLoading}
      />
    </>
  );
};

export default MyAppliedJobs;

const MenuLoadingComponent = () => {
  return (
    <View style={tw`w-full bg-white dark:bg-gray-950 mt-5 gap-1 rounded`}>
      {Array.from({length: 10}, (_, i) => i)?.map(data => (
        <View
          key={data}
          style={tw`w-full h-15 bg-slate-200/50 dark:bg-gray-800 my-0.6 rounded-3`}
        />
      ))}
    </View>
  );
};
const NoDataMenuComponent = ({message}) => {
  return (
    <View style={tw`w-full h-full gap-4`}>
      <View style={tw`flex-1 justify-center items-center`}>
        <Text
          style={[
            tw`text-lg text-zinc-700 dark:text-zinc-400`,
            {fontFamily: 'Poppins-SemiBold'},
          ]}>
          {message}
        </Text>
      </View>
    </View>
  );
};

const JobApplicationsComponent = ({refreshing, refreshJobData, isLoading}) => {
  const {getJobApplications, jobapplications} = useMenuStore();

  const fetchMoreJobApplications = async () => {
    if (jobapplications) {
      let {skip, total, limit} = jobapplications;
      if (jobapplications && skip < total) {
        skip = skip + limit;
        await getJobApplications(skip, limit);
      }
    }
  };

  return (
    <FlatList
      style={tw`mb-16`}
      data={jobapplications?.data}
      renderItem={({item}) => <JobCard job={item} />}
      keyExtractor={item => item._id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshJobData} />
      }
      ListFooterComponent={
        <FooterComponent isLoading={isLoading} refreshing={refreshing} />
      }
      onEndReachedThreshold={0.2}
      onEndReached={fetchMoreJobApplications}
    />
  );
};

export const JobCard = ({job}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      key={job?._id}
      onPress={() => {
        navigation.navigate('Chat', {
          chatid: job.chatid,
          appliedJobId: job._id,
          name: `${job?.employerDetails?.firstname} ${job?.employerDetails?.lastname}`,
        });
      }}
      style={tw`w-full bg-white dark:bg-gray-800 my-0.6 px-5 gap-1 py-3 rounded relative border-l-4 border-r-4 shadow border-emerald-500`}>
      <Text
        style={[
          tw`text-[16px] text-black dark:text-white`,
          {fontFamily: 'Poppins-SemiBold'},
        ]}>
        {job?.jobDetails?.jobtitle}
      </Text>

      <Text
        style={[
          tw`text-xs text-gray-700 dark:text-gray-300 absolute top-[12px] right-[20px]`,
          {fontFamily: 'Poppins-Regular'},
        ]}>
        Status :{' '}
        <Text style={[tw`text-xs`, {fontFamily: 'Poppins-SemiBold'}]}>
          {job?.status}
        </Text>
      </Text>

      <View style={tw`flex-row justify-between`}>
        <Text
          style={[
            tw`text-xs text-gray-700 dark:text-gray-300`,
            {fontFamily: 'Poppins-Regular'},
          ]}>
          Organization:{' '}
          <Text style={[tw`text-xs`, {fontFamily: 'Poppins-SemiBold'}]}>
            {job?.employerDetails?.firstname} {job?.employerDetails?.lastname}
          </Text>
        </Text>

        <Text
          style={[
            tw`text-xs text-gray-700 dark:text-gray-300`,
            {fontFamily: 'Poppins-Regular'},
          ]}>
          Applied On:{' '}
          <Text style={[tw`text-xs`, {fontFamily: 'Poppins-SemiBold'}]}>
            {dayjs(job?.jobDetails?.createdat).format('DD MMM YYYY')}
          </Text>
        </Text>
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
