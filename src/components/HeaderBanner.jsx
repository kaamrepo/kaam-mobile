import React, {useMemo} from 'react';
import {View, Text, Pressable, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc'; // assuming you are using Tailwind CSS for React Native
import MenuIconSVG from '../assets/svgs/Menu Icon.svg'; // update with the actual path to your SVG component
import useLoginStore from '../store/authentication/login.store';
import {Translation} from '../screens/dashboard/Translation';
import capitalizeFirstLetter from '../helper/utils/capitalizeFirstLetter';
import Icon, {Icons} from './Icons';

export const HeaderBanner = ({navigation}) => {
  const {loggedInUser, language} = useLoginStore();

  const headerComponent = useMemo(
    () => (
      <SafeAreaView style={tw`bg-white`}>
        <View style={tw`mx-5  mt-2 rounded-3 justify-center`}>
          <View style={tw`flex-row justify-between items-center`}>
            <View style={tw`flex-row items-center gap-5`}>
              <Pressable
                onPress={() => navigation.openDrawer()}
                style={({pressed}) => [
                  tw`p-2 h-12 w-12 rounded-full flex-row justify-center items-center ${
                    pressed ? 'bg-slate-200' : ''
                  }`,
                ]}>
                <MenuIconSVG width={25} height={25} />
              </Pressable>
              <View style={tw`justify-center`}>
                <Text
                  style={[tw`text-slate-600`, {fontFamily: 'Poppins-Regular'}]}>
                  {Translation[language]['Welcome']},
                </Text>
                <Text
                  style={[
                    tw`text-xl text-black`,
                    {fontFamily: 'Poppins-Bold'},
                  ]}>
                  {loggedInUser
                    ? `${capitalizeFirstLetter(
                        loggedInUser?.firstname,
                      )} ${capitalizeFirstLetter(loggedInUser?.lastname)}`
                    : ''}
                </Text>
              </View>
            </View>
            <View style={tw`flex-row items-center`}>
              <Icon
                type={Icons.FontAwesome5}
                name="sync"
                size={18}
                // color={secondaryTextColor}
              />
              <Text> Location sync</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('View Profile')}
              style={tw`w-12 h-12`}>
              <View style={tw`w-12 h-12 rounded-lg`}>
                {loggedInUser?.profilepic ? (
                  <Image
                    source={{uri: loggedInUser.profilepic}}
                    style={[tw`w-[48px] h-[48px] rounded-3`]}
                  />
                ) : (
                  <View
                    style={[
                      tw`w-[48px] h-[48px] rounded-3 bg-[#111545] flex-row justify-center items-center overflow-hidden`,
                    ]}>
                    <Text
                      style={[
                        tw`text-[30px] text-white`,
                        {fontFamily: 'Poppins-Bold', verticalAlign: 'middle'},
                      ]}>
                      {loggedInUser?.firstname?.charAt(0)}
                      {loggedInUser?.lastname?.charAt(0)}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    ),
    [loggedInUser, language, navigation],
  );

  return headerComponent;
};
