import React, {useMemo, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import tw from 'twrnc';
import {Translation} from '../../Translation';
import Icon, {Icons} from '../../../../components/Icons';
import {primaryBGColor} from '../../../../helper/utils/colors';
import useJobStore from '../../../../store/jobs.store';
import useLoginStore from '../../../../store/authentication/login.store';
const AvailableJob = ({language, isLoading, navigation}) => {
  const {getJobs, job} = useJobStore();
  const {loggedInUser} = useLoginStore();
  useEffect(() => {
    const payload = {
      skip: 0,
      limit: 10,
      excludeIds: [loggedInUser._id],
    };
    getJobs(payload);
  }, []);
  const handleSeeAllPress = useCallback(() => {
    navigation.navigate('SeeAllStaffs');
  }, [navigation]);
  const renderContent = useMemo(() => {
    if (isLoading) {
      return (
        <>
          <View
            style={tw`flex-row justify-between items-center mt-5 mb-4 mx-5`}>
            <Text
              style={[tw`text-black text-xl`, {fontFamily: 'Poppins-Bold'}]}>
              {Translation[language]['Fetching Staffs...']}
            </Text>
          </View>
          <View style={tw`px-5 mb-14 w-full`}>
            <View
              style={[
                tw`w-full h-30 bg-gray-200 rounded-3 items-center justify-center`,
              ]}>
              <Text
                style={[
                  tw`text-neutral-700 text-sm`,
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
              style={[tw`text-black text-xl`, {fontFamily: 'Poppins-Bold'}]}>
              {/* {Translation[language]['No Available Staffs']} */}
              Available Jobs
            </Text>
          </View>
          <View style={tw`px-5 mb-14 w-full`}>
            <View
              style={tw`w-full h-30 bg-gray-200 rounded-3 items-center justify-center`}>
              <Text
                style={[
                  tw`text-neutral-700 text-sm`,
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
              style={[tw`text-black text-xl`, {fontFamily: 'Poppins-Bold'}]}>
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
            {job &&
              job?.length !== 0 &&
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
                    tw`my-1 w-full flex-row items-center gap-1 border border-gray-200 rounded-3 px-2.5 pb-2.5 pt-4 relative overflow-hidden ${
                      pressed ? 'bg-green-100/10' : 'bg-white'
                    }`
                  }>
                  <View style={tw`h-10 w-10 flex-1`}>
                    {item.employerDetails.profilepic ? (
                      <Image
                        source={{uri: item.employerDetails.profilepic}}
                        style={tw`h-10 w-10 rounded`}
                      />
                    ) : (
                      <Icon
                        type={Icons.Ionicons}
                        name={'person'}
                        size={45}
                        color={primaryBGColor}
                      />
                    )}
                  </View>
                  <View style={tw`flex-5`}>
                    <Text
                      style={[
                        tw`text-black text-[14px]`,
                        {fontFamily: 'Poppins-SemiBold'},
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {item?.jobtitle}
                    </Text>
                    <Text
                      style={[
                        tw`text-neutral-600 text-[14px]`,
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
  }, [isLoading, job, language, navigation, handleSeeAllPress]);

  return renderContent;
};

export default AvailableJob;
