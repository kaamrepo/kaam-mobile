import React, {useMemo, useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import tw from 'twrnc';
import {Translation} from '../../Translation';
import Icon, {Icons} from '../../../../components/Icons';
import {primaryBGColor} from '../../../../helper/utils/colors';
import useJobStore from '../../../../store/jobs.store';
import useLoginStore from '../../../../store/authentication/login.store';
const AvailableJob = ({language, isLoading, navigation, category}) => {
  const {getJobs, job} = useJobStore();
  const {loggedInUser} = useLoginStore();

  useFocusEffect(
    useCallback(() => {
      const payload = {
        skip: 0,
        limit: 10,
        excludeIds: [loggedInUser._id],
        exclude: 'createdby',
      };
      getJobs(payload);
    }, [getJobs, loggedInUser]), // Update the dependency array to include getJobs and loggedInUser
  );
  const handleSeeAllPress = useCallback(() => {
    navigation.navigate('SeeAllJobs');
  }, [navigation]);
  const renderContent = useMemo(() => {
    if (isLoading) {
      return (
        <>
          <View
            style={tw`flex-row justify-between items-center mt-5 mb-4 mx-5`}>
            <Text
              style={[tw`text-black dark:text-white text-xl`, {fontFamily: 'Poppins-Bold'}]}>
              {Translation[language]['Fetching Staffs...']}
            </Text>
          </View>
          <View style={tw`px-5 mb-14 w-full`}>
            <View
              style={[
                tw`w-full h-30 bg-gray-200 dark:bg-gray-800 rounded-3 items-center justify-center`,
              ]}>
              <Text
                style={[
                  tw`text-gray-700 dark:text-gray-400 text-sm`,
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                Fetching Staffs...
              </Text>
            </View>
          </View>
        </>
      );
    }
    if (!job || job.length === 0) {
      return (
        <>
          <View
            style={tw`flex-row justify-between items-center mt-5 mb-4 mx-5`}>
            <Text
              style={[tw`text-black dark:text-white text-xl`, {fontFamily: 'Poppins-Bold'}]}>
              {/* {Translation[language]['No Available Staffs']} */}
              Available Jobs
            </Text>
          </View>
          <View style={tw`px-5 mb-14 w-full`}>
            <View
              style={tw`w-full h-30 bg-gray-200 dark:bg-gray-800 rounded-3 items-center justify-center`}>
              <Text
                style={[
                  tw`text-neutral-700 dark:text-gray-400 text-sm`,
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                There are no Available Jobs
              </Text>
            </View>
          </View>
        </>
      );
    }

    return (
      <View style={tw`flex-1`}>
        <ScrollView contentContainerStyle={tw`pb-14`}>
          <View
            style={tw`flex-row justify-between items-center mt-5 mb-4 mx-5`}>
            <Text
              style={[tw`text-black dark:text-white text-xl`, {fontFamily: 'Poppins-Bold'}]}>
              Available Jobs
              {/* {Translation[language]['Available Staff']} */}
            </Text>
            <TouchableOpacity onPress={handleSeeAllPress}>
              <Text
                style={[
                  tw`text-center text-sm leading-relaxed text-gray-600`,
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw`px-5 mb-10`}>
            {job?.length &&
              job?.map(item => (
                <Pressable
                  key={item._id}
                  onPress={() => {
                    navigation.navigate('ApplyNow', {
                      jobDetails: item,
                      id: item?._id,
                    });
                  }}
                  style={({pressed}) =>
                    tw`my-1 w-full flex-row items-center gap-3 border border-gray-200 dark:border-gray-700 rounded-3 px-2.5 pb-2.5 pt-4 relative overflow-hidden ${
                      pressed ? 'bg-green-100/10' : 'bg-white dark:bg-gray-900'
                    }`
                  }>
                  <View
                    style={tw`h-10 w-10 border border-gray-300 dark:border-gray-700 justify-center items-center rounded-full overflow-hidden`}>
                    {item?.employerDetails?.profilepic ? (
                      <Image
                        source={{uri: item?.employerDetails?.profilepic}}
                        style={tw`h-10 w-10`}
                      />
                    ) : (
                      <View
                        style={tw`h-10 w-10 justify-center items-center bg-slate-200 dark:bg-gray-800`}>
                        <Icon
                          type={Icons.Ionicons}
                          name={'person'}
                          size={20}
                          color={primaryBGColor}
                        />
                      </View>
                    )}
                  </View>

                  <View style={tw`flex-5`}>
                    <Text
                      style={[
                        tw`text-black dark:text-white text-[14px]`,
                        {fontFamily: 'Poppins-SemiBold'},
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {item?.jobtitle}
                    </Text>
                    <Text
                      style={[
                        tw`text-slate-600 dark:text-slate-300 text-[14px]`,
                        {fontFamily: 'Poppins-Regular'},
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {item?.description}
                    </Text>
                  </View>
                  <Text
                    style={[
                      tw`text-white text-[12px] absolute top-0 right-0 px-2 rounded-bl-xl bg-[${primaryBGColor}]`,
                      {fontFamily: 'Poppins-SemiBold'},
                    ]}>
                    ₹: {item?.salary}
                  </Text>
                </Pressable>
              ))}
          </View>
        </ScrollView>
      </View>
    );
  }, [
    isLoading,
    job,
    language,
    navigation,
    handleSeeAllPress,
    useColorScheme(),
  ]);

  return renderContent;
};

export default AvailableJob;
