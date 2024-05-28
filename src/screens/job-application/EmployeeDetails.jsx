import React, {useState, useEffect} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import tw from 'twrnc';
import Icon, {Icons} from '../../components/Icons';
import useStaffStore from '../../store/staff.store';
import {getRandomColor} from '../../helper/utils/colors';
import {
  primaryChatButton,
  primaryApplyNowButton,
} from '../../helper/utils/colors';
const EmployeeDetails = ({route, navigation}) => {
  const {getNearByStaffById} = useStaffStore();
  const [staff, setStaff] = useState({});
  const bgColor = getRandomColor(route?.params?.index);
  useEffect(() => {
    getStaff();
  }, []);

  const getStaff = async () => {
    const staffDetails = await getNearByStaffById(route.params.id);
    setStaff(staffDetails);
  };
  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleJobSelection = async () => {
   navigation.navigate("EngagmentInitiation",{staffid:staff._id})
  };

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
    <View style={tw`flex-1 p-4 mt-6`}>
      <Pressable
        onPress={handleBackPress}
        style={({pressed}) => [
          tw`p-2 rounded-full ${pressed ? 'bg-black/20' : ''}`,
        ]}>
        <Icon
          type={Icons.Ionicons}
          name="chevron-back"
          size={25}
          color={'black'}
        />
      </Pressable>
      {/* Profile Picture */}
      <View style={tw`flex items-center mb-4`}>
        {staff?.profilepic ? (
          <Image source={staff?.profilepic} style={tw`h-12 w-12 rounded-xl`} />
        ) : (
          <Icon
            type={Icons.Ionicons}
            name={'person-circle-outline'}
            size={55}
            color={'green'}
          />
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
      <Text style={tw`text-lg text-gray-600 mb-4`}>
        {staff?.tags ? staff.tags : 'No Data'}
      </Text>

      <Text style={tw`text-lg font-bold mb-2`}>Work Experience</Text>
      <Text style={tw`text-lg text-gray-600 mb-4`}>
        {staff?.tags ? staff.tags : 'No Data'}
      </Text>

      {/* Hire Button */}
      {false ? (
        <ActionButton
          label={'Chat'}
          onPress={handleChatNavigation}
          bgColor={primaryChatButton}
          iconType={Icons.Ionicons}
          iconName={'chatbubbles-outline'}
        />
      ) : (
        <ActionButton
          label={'Select Job to hire'}
          onPress={handleJobSelection}
          bgColor={primaryApplyNowButton}
          iconType={Icons.FontAwesome5}
          iconName={'user-tie'}
        />
      )}
    </View>
  );
};

export default EmployeeDetails;
