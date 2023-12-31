import React, {useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import useMenuStore from '../../store/menu.store';
import useLoaderStore from '../../store/loader.store';
import {useFocusEffect} from '@react-navigation/native';
import dayjs from 'dayjs';
import tw from 'twrnc';
const screenWidth = Dimensions.get('window').width;
const MyAppliedJobs = () => {
  const {jobapplications, getJobApplications, clearJobApplications} =
    useMenuStore();
  const {isLoading} = useLoaderStore();

  useFocusEffect(
    useCallback(() => {
      getJobApplications();
      return () => {
        clearJobApplications();
      };
    }, []),
  );
  return isLoading ? (
    <MenuLoadingComponent />
  ) : jobapplications?.total == 0 ? (
    <NoDataMenuComponent />
  ) : (
    <JobApplicationsComponent jobapplications={jobapplications?.data} />
  );
};

export default MyAppliedJobs;

const MenuLoadingComponent = () => {
  return (
    <View>
      {Array.from({length: 10}, (_, i) => i)?.map(data => (
        <View key={data} style={tw`w-full h-15 bg-white my-2 rounded-3`}></View>
      ))}
    </View>
  );
};
const NoDataMenuComponent = () => {
  return (
    <View style={tw`w-full h-full gap-4`}>
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={[tw`text-lg`, {fontFamily: 'Poppins-SemiBold'}]}>
          No data found!
        </Text>
      </View>
    </View>
  );
};

const status = {
  Applied: {
    text: 'text-blue-600',
    bg: 'bg-blue-100',
    border: 'border-blue-500',
  },
  Approved: {
    text: 'text-green-600',
    bg: 'bg-green-100',
    border: 'border-green-500',
  },
  Rejected: {text: 'text-red-600', bg: 'bg-red-100', border: 'border-red-500'},
};

const JobApplicationsComponent = ({jobapplications}) => {
  return (
    <ScrollView
      style={[tw`h-full gap-2`]}
      contentContainerStyle={{
        gap: 2,
      }}>
      {/* <Text
        style={[
          tw`text-[18px] w-auto text-black text-center`,
          {fontFamily: 'Poppins-Bold'},
        ]}>
        Job Applications
      </Text> */}

      {jobapplications?.map((jobapp, index) => (
        <TouchableOpacity
          key={jobapp?._id}
          style={tw`w-full bg-white px-5 gap-1 py-3 rounded relative border-l-4 border-r-4  ${
            status[jobapp?.status]['border']
          }`}>
          <Text
            style={[
              tw`text-[16px] text-black`,
              {fontFamily: 'Poppins-SemiBold'},
            ]}>
            {jobapp?.jobDetails?.jobtitle}
          </Text>

          <Text
            style={[
              tw`text-xs text-gray-700 absolute top-[12px] right-[20px]`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            Status:{' '}
            <Text
              style={[
                tw`text-xs ${status[jobapp?.status]['text']}`,
                {fontFamily: 'Poppins-SemiBold'},
              ]}>
              {jobapp?.status}
            </Text>
          </Text>

          <View style={tw`flex-row justify-between`}>
            <Text
              style={[
                tw`text-xs text-gray-700`,
                {fontFamily: 'Poppins-Regular'},
              ]}>
              Organization:{' '}
              <Text style={[tw`text-xs`, {fontFamily: 'Poppins-SemiBold'}]}>
                {jobapp?.jobDetails?.employerDetails?.firstname}{' '}
                {jobapp?.jobDetails?.employerDetails?.lastname}
              </Text>
            </Text>

            <Text
              style={[
                tw`text-xs text-gray-700`,
                {fontFamily: 'Poppins-Regular'},
              ]}>
              Applied On:{' '}
              <Text style={[tw`text-xs`, {fontFamily: 'Poppins-SemiBold'}]}>
                {dayjs(jobapp?.jobDetails?.createdat).format('DD MMM YYYY')}
              </Text>
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
