import React, { useMemo, useCallback, useEffect } from 'react';
import { View, Text, Pressable, Image, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Translation } from '../../Translation';
import Icon, { Icons } from '../../../../components/Icons';
import { primaryBGColor } from '../../../../helper/utils/colors';
import useStaffStore from '../../../../store/staff.store';
import useLoginStore from '../../../../store/authentication/login.store';
const AvailableStaff = ({ language, isLoading, navigation}) => {
  const {getStaff,stafflist} = useStaffStore();
  const {loggedInUser} = useLoginStore();
  useEffect(()=>{
    const payload = {
      skip:0,
      limit:10,
      excludeIds:[loggedInUser?._id],
      exclude:'_id'
    }
    getStaff(payload);
  },[])
  const handleSeeAllPress = useCallback(() => {
    navigation.navigate('SeeAllStaffs',{param:'all'});

  }, [navigation]);

  const renderContent = useMemo(() => {
    if (isLoading) {
      return (
        <>
          <View style={tw`flex-row justify-between items-center mt-5 mb-4 mx-5`}>
            <Text style={[tw`text-black text-xl`, {fontFamily: 'Poppins-Bold'}]}>
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
    if (!stafflist || stafflist.length === 0) {
      return (
        <>
          <View style={tw`flex-row justify-between items-center mt-5 mb-4 mx-5`}>
            <Text style={[tw`text-black text-xl`, {fontFamily: 'Poppins-Bold'}]}>
              {/* {Translation[language]['No Available Staffs']} */}
            Available Staffs
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
                There are no Available staffs
              </Text>
            </View>
          </View>
        </>
      );
    }
    return (
      <View style={tw`flex-1`}>
        <ScrollView contentContainerStyle={tw`pb-14`}>
          <View style={tw`flex-row justify-between items-center mt-5 mb-4 mx-5`}>
            <Text style={[tw`text-black text-xl`, {fontFamily: 'Poppins-Bold'}]}>
              {Translation[language]['Available Staff']}
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
  {stafflist?.map((item) => {
    return (
      <Pressable
        key={item._id} // Assuming _id is unique and stable
        onPress={() => navigation.navigate('EmployeeDetails', { user: item })}
        style={({ pressed }) =>
          tw`my-1 w-full border border-gray-200 rounded-3 px-2.5 pb-2.5 pt-4 relative overflow-hidden ${
            pressed ? 'bg-green-100/10' : 'bg-white'
          }`
        }>
        <View style={tw`flex-row items-start justify-between`}>
          <View style={tw`flex-row items-center`}>
            <View style={tw`h-10 w-10 mr-2`}>
              {item?.employerDetails?.profilepic ? (
                <Image
                  source={{ uri: item.employerDetails.profilepic }}
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
            <View>
              <Text
                style={[
                  tw`text-black text-[14px]`,
                  { fontFamily: 'Poppins-SemiBold' },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item?.firstname}
              </Text>
              <Text
                style={[
                  tw`text-neutral-600 text-[14px]`,
                  { fontFamily: 'Poppins-Regular' },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item?.lastname}
              </Text>
            </View>
          </View>
          <Text
            style={[
              tw`text-white text-[12px] px-2 rounded-bl-xl bg-[${primaryBGColor}]`,
              { fontFamily: 'Poppins-SemiBold' },
            ]}>
            {`${item?.address?.city || "City - NA"} / ${item?.address?.state || "State - NA"}`}
          </Text>
        </View>
        <View style={tw`flex-row flex-wrap mt-2`}>
          {item?.tagsDetails?.length > 0 ? (
            <>
              {item.tagsDetails.slice(0, 2).map((tag) => (
                <Text
                  key={tag._id}
                  style={tw`bg-gray-200 text-black text-[12px] px-2 py-1 rounded-full mr-2 mb-2`}>
                  {tag.name}
                </Text>
              ))}
              {item.tagsDetails.length > 2 && (
                <Text
                  style={tw`bg-gray-200 text-black text-[12px] px-2 py-1 rounded-full mr-2 mb-2`}>
                  +{item.tagsDetails.length - 2} more
                </Text>
              )}
            </>
          ) : (
            <Text
              style={tw`text-gray-500 text-[12px]`}>
              No category selected by user
            </Text>
          )}
        </View>
      </Pressable>
    );
  })}
</View>



        </ScrollView>
      </View>
    );
  }, [isLoading, stafflist, language, navigation, handleSeeAllPress]);

  return renderContent;
};

export default AvailableStaff;
