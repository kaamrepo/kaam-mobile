import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import tw from 'twrnc';
import Icon, {Icons} from '../../components/Icons';
import {SafeAreaView} from 'react-native-safe-area-context';
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

  return (
    <SafeAreaView style={tw`w-full h-full px-5 pt-5 bg-white`}>
      <ScrollView
        style={tw`my-2`}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View>
          <TouchableOpacity onPress={handleBackPress}>
            <Icon
              type={Icons.Ionicons}
              name={'chevron-back'}
              style={[tw`text-black`]}
            />
          </TouchableOpacity>
        </View>
        <View>
          <View style={tw`flex items-center gap-2 mb-4`}>
            <View
              style={[
                tw`border-4 border-emerald-500 rounded-full overflow-hidden h-20 w-20 items-center justify-center`,
              ]}>
              {staff?.profilepic ? (
                <Image
                  source={{uri: staff?.profilepic}}
                  style={tw`h-12 w-12`}
                />
              ) : (
                <Image source={staticStaffImage} style={tw`h-12 w-12`} />
              )}
            </View>
            <Text
              style={[
                tw`text-2xl text-black`,
                {fontFamily: 'Poppins-Bold'},
              ]}>{`${staff.firstname} ${staff.lastname}`}</Text>
          </View>
          <View style={tw`flex items-center mb-4`}>
            <Text
              style={[
                tw`text-sm text-black mb-2`,
                {fontFamily: 'Poppins-Regular'},
              ]}>
              Address
            </Text>
            <Text
              style={[
                tw`text-lg text-black mb-2`,
                {fontFamily: 'Poppins-Regular'},
              ]}>
              {staff?.location?.city ? staff?.location?.city : 'NA'} /
              {staff?.location?.state ? staff?.location?.state : 'NA'}
            </Text>
          </View>
          <View style={[tw`w-full gap-3 p-2 bg-gray-100 rounded-xl`]}>
            <View>
              <Text
                style={[
                  tw`text-lg text-black`,
                  {fontFamily: 'Poppins-SemiBold'},
                ]}>
                About {staff?.firstname} {staff?.lastname}
              </Text>
              <Text
                style={[
                  tw`text-base text-black`,
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                {staff?.aboutme ? staff.aboutme : '- No Data'}
              </Text>
            </View>

            <View>
              <Text
                style={[
                  tw`text-lg text-black`,
                  {fontFamily: 'Poppins-SemiBold'},
                ]}>
                Skills and Tags
              </Text>
              <View style={tw`flex-row flex-wrap mt-2`}>
                {staff?.tagsDetails?.length > 0 ? (
                  staff.tagsDetails.map(tag => (
                    <Text
                      key={tag._id}
                      style={[
                        tw`bg-cyan-500 text-white text-sm px-3 py-0.5 rounded-full mr-2 mb-2`,
                        {fontFamily: 'Poppins-Regular'},
                      ]}>
                      {tag.name}
                    </Text>
                  ))
                ) : (
                  <Text
                    style={[
                      tw`text-base text-black`,
                      {fontFamily: 'Poppins-Regular'},
                    ]}>
                    - No Category selected by user
                  </Text>
                )}
              </View>
            </View>

            <View>
              <Text
                style={[
                  tw`text-lg mb-2 text-black`,
                  {fontFamily: 'Poppins-SemiBold'},
                ]}>
                Work Experience
              </Text>
              {staff?.experience?.length ? (
                staff?.experience?.map((item, index) => (
                  <View key={index} style={tw`flex flex-row`}>
                    <View style={tw`flex-shrink-0 mr-4`}>
                      <View
                        style={tw`h-5 w-5 items-center justify-center rounded-full border-2 border-cyan-500`}>
                        <View
                          style={tw`bg-cyan-500 h-2.5 w-2.5 rounded-full`}></View>
                      </View>
                      {index < staff?.experience.length - 1 && (
                        <View
                          style={tw`w-0 flex-1 mx-auto border-l-2 border-dashed border-cyan-500 `}></View>
                      )}
                    </View>
                    <View style={tw`flex-1 pb-2`}>
                      <Text
                        style={[
                          tw`text-lg text-black`,
                          {fontFamily: 'Poppins-SemiBold'},
                        ]}>
                        {item.employer}
                      </Text>
                      <Text
                        style={[
                          tw`text-black`,
                          {fontFamily: 'Poppins-Regular'},
                        ]}>
                        {item.year}
                      </Text>
                      <Text
                        style={[
                          tw`text-black`,
                          {fontFamily: 'Poppins-Regular'},
                        ]}>
                        {item.about}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text
                  style={[
                    tw`text-base text-black`,
                    {fontFamily: 'Poppins-Regular'},
                  ]}>
                  - No experience
                </Text>
              )}
            </View>
          </View>

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
              label={'Hire ?'}
              onPress={handleJobSelection}
              bgColor={primaryBGColor}
              iconType={Icons.Octicons}
              iconName={'checklist'}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmployeeDetails;

const ActionButton = ({label, onPress, bgColor, iconType, iconName}) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [
      {
        backgroundColor: bgColor,
      },
      tw`px-8 py-[16px] flex flex-row gap-3 justify-center items-center rounded-[16px] mx-8 mt-5 shadow-lg shadow-[${bgColor}]`,
    ]}>
    <Icon type={iconType} name={iconName} color="#FFFFFF" />
    <Text
      style={[tw`text-white text-[16px]`, {fontFamily: 'Poppins-SemiBold'}]}>
      {label}
    </Text>
  </Pressable>
);
