import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import tw from 'twrnc';
import Icon, {Icons} from '../../components/Icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStaffStore from '../../store/staff.store';
import {primaryBGColor, primaryBGDarkColor} from '../../helper/utils/colors';
const staticStaffImage = require('../../assets/images/profession-employee.png');
const EmployeeDetails = ({route, navigation}) => {
  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleJobSelection = async () => {
    navigation.navigate('EngagmentInitiation', {staffid: staff._id});
  };

  const staff = route?.params?.user;
  const ActionButton = ({label, onPress, bgColor, iconType, iconName}) => (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          backgroundColor: bgColor,
        },
        tw`px-8 py-[16px] flex flex-row gap-4 justify-center items-center rounded-[16px] mx-8 mt-5 shadow-lg shadow-[${bgColor}]`,
      ]}>
      <Icon type={iconType} name={iconName} color="#FFFFFF" />
      <Text
        style={[tw`text-white text-[16px]`, {fontFamily: 'Poppins-SemiBold'}]}>
        {label}
      </Text>
    </Pressable>
  );
  return (
    <SafeAreaView>
    <View style={tw`px-4 mt-6`}>
      <View style={tw`flex items-center mb-4`}>
        {staff?.profilepic ? (
          <Image source={{uri:staff?.profilepic}} style={tw`h-12 w-12 rounded-xl`} />
        ) : (
          <Image source={staticStaffImage} style={tw`h-12 w-12 rounded-xl`} />
        )}
        <Text
          style={tw`text-2xl mt-2 font-bold mb-2`}>{`${staff.firstname} ${staff.lastname}`}</Text>
      </View>
      <View style={tw`flex items-center mb-4`}>
        <Text style={tw`text-sm text-gray-600 mb-2`}>Address</Text>
        <Text style={tw`text-lg text-gray-600 mb-2`}>
          {staff?.address?.city ? staff?.address?.city : 'NA'} /{' '}
          {staff?.address?.state ? staff?.address?.state : 'NA'}
        </Text>
      </View>
      <Text style={tw`text-lg font-bold mb-2`}>
        About {staff?.firstname} {staff?.lastname}
      </Text>
      <Text style={tw`text-lg text-gray-600 mb-4`}>
        {staff?.aboutme ? staff.aboutme : 'No Data'}
      </Text>
      <Text style={tw`text-lg font-bold mb-2`}>Skills and Tags</Text>
      <View style={tw`flex-row flex-wrap mt-2`}>
        {staff?.tagsDetails?.length > 0 ? (
          staff.tagsDetails.map(tag => (
            <Text
              key={tag._id}
              style={tw`bg-gray-200 text-black text-[12px] px-2 py-1 rounded-full mr-2 mb-2`}>
              {tag.name}
            </Text>
          ))
        ) : (
          <Text style={tw`text-lg text-gray-600 mb-4`}>
            No Category selected by user
          </Text>
        )}
      </View>
      <Text style={tw`text-lg font-bold mb-2`}>Work Experience</Text>
      <Text style={tw`text-lg text-gray-600 mb-4`}>
        {/* {staff?.tags ? staff.tags : 'No Data'} */}
        section in developmen
      </Text>

      {/* Hire Button */}
      {false ? (
        <ActionButton
          label={'Chat'}
          onPress={handleChatNavigation}
          bgColor={primaryBGDarkColor}
          iconType={Icons.Ionicons}
          iconName={'chatbubbles-outline'}
        />
      ) : (
        <ActionButton
          label={'Select Job to hire'}
          onPress={handleJobSelection}
          bgColor={primaryBGColor}
          iconType={Icons.FontAwesome5}
          iconName={'user-tie'}
        />
      )}
    </View>
    </SafeAreaView>
  );
};

export default EmployeeDetails;
