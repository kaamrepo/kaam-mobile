import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import useLoaderStore from '../../store/loader.store';
import dayjs from 'dayjs';
import tw from 'twrnc';
import useApprovalStore from '../../store/approval.store';

const RequestScreen = () => {
  useColorScheme();
  const { clearApproval, getRequests, approval } = useApprovalStore();
  const { isLoading } = useLoaderStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getRequests();
    return () => {
      clearApproval();
    };
  }, []);

  const refreshJobData = async () => {
    setRefreshing(true);
    await getRequests();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white dark:bg-black mx-2`}>
      {isLoading && !approval?.length ? (
        <MenuLoadingComponent />
      ) : approval?.length === 0 ? (
        <NoDataMenuComponent message={'No Requests found!'} />
      ) : (
        <>
          <Text style={[tw`my-1 text-right text-black dark:text-white`]}>
            Total: {approval?.length}
          </Text>
          <RequestApplicationsComponent
            refreshing={refreshing}
            refreshJobData={refreshJobData}
            isLoading={isLoading}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default RequestScreen;

const MenuLoadingComponent = () => {
  return (
    <View style={tw`w-full bg-white dark:bg-gray-950 mt-5 gap-1 rounded`}>
      {Array.from({ length: 10 }, (_, i) => i).map((data) => (
        <View
          key={data}
          style={tw`w-full h-15 bg-slate-200/50 dark:bg-gray-800 my-0.6 rounded-3`}
        />
      ))}
    </View>
  );
};

const NoDataMenuComponent = ({ message }) => {
  const navigation = useNavigation();
  return (
    <View style={tw`w-full h-full gap-4`}>
      <View style={tw`flex-1 justify-center items-center`}>
        <Text
          style={[
            tw`text-lg text-zinc-700 dark:text-zinc-400`,
            { fontFamily: 'Poppins-SemiBold' },
          ]}
        >
          {message}
        </Text>
        <Button onPress={() => navigation.navigate('Dashboard')}>Home</Button>
      </View>
    </View>
  );
};

const RequestApplicationsComponent = ({ refreshing, refreshJobData, isLoading }) => {
  const { clearApproval, getRequests, approval } = useApprovalStore();

  const fetchMoreRequestApplications = async () => {
    if (approval.length) {
      let { skip, total, limit } = approval;
      if (approval && skip < total) {
        skip = skip + limit;
        await getRequests(skip, limit);
      }
    }
  };

  return (
    <FlatList
      style={tw`mb-16`}
      data={approval || []}
      renderItem={({ item }) => <ApplicationCard data={item} />}
      keyExtractor={(item) => item._id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshJobData} />
      }
      ListFooterComponent={
        <FooterComponent isLoading={isLoading} refreshing={refreshing} />
      }
      onEndReachedThreshold={0.2}
      onEndReached={fetchMoreRequestApplications}
    />
  );
};

const ApplicationCard = ({ data }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      key={data?._id}
      style={tw`w-full bg-white dark:bg-gray-800 my-0.6 px-5 gap-1 py-3 rounded relative border-l-4 border-r-4 shadow border-emerald-500`}
    >
      <Text
        style={[
          tw`text-[16px] text-black dark:text-white`,
          { fontFamily: 'Poppins-SemiBold' },
        ]}
      >
        {data?.jobDetails?.jobtitle}
      </Text>
      <View style={tw`flex-row`}>
      <Text
        style={[
          tw`text-xs text-gray-700 dark:text-gray-300 absolute top-[12px] right-[20px]`,
          { fontFamily: 'Poppins-Regular' },
        ]}
      >
        Status:{' '}
        <Text style={[tw`text-xs`, { fontFamily: 'Poppins-SemiBold' }]}>
          {data?.status}
        </Text>
      </Text>
        <Text
          style={[
            tw`text-xs text-gray-700 dark:text-gray-300`,
            { fontFamily: 'Poppins-Regular' },
          ]}
        >
          Request for:{' '}
          <Text style={[tw`text-xs`, { fontFamily: 'Poppins-SemiBold' }]}>
            {data?.requesttype}
          </Text>
        </Text>
      </View>

      <Text
          style={[
            tw`text-xs text-gray-700 dark:text-gray-300`,
            { fontFamily: 'Poppins-Regular' },
          ]}
        >
          Applied On:{' '}
          <Text style={[tw`text-xs`, { fontFamily: 'Poppins-SemiBold' }]}>
            {dayjs(data?.createdat).format('MMMM D, YYYY h:mm A')}
          </Text>
        </Text>
    </TouchableOpacity>
  );
};

const FooterComponent = ({ isLoading, refreshing }) => {
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
