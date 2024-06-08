import React, {useMemo} from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Image,
  useColorScheme,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import MenuIconSVG from '../assets/svgs/Menu Icon.svg';
import useLoginStore from '../store/authentication/login.store';
import {Translation} from '../screens/dashboard/Translation';
import capitalizeFirstLetter from '../helper/utils/capitalizeFirstLetter';
import Icon, {Icons} from './Icons';

export const HeaderBanner = ({navigation}) => {
  const {loggedInUser, language} = useLoginStore();
  const colorScheme = useColorScheme();

  const headerComponent = useMemo(
    () => (
      <SafeAreaView style={tw`bg-white dark:bg-slate-900`}>
        <View style={tw`mx-5 mb-2 rounded-3 justify-center`}>
          <View style={tw`flex-row justify-between items-center`}>
            <View style={tw`flex-row items-center gap-5`}>
              <Pressable
                onPress={() => navigation.openDrawer()}
                style={({pressed}) => [
                  tw`p-2 h-12 w-12 rounded-full flex-row justify-center items-center ${
                    pressed ? 'bg-slate-200' : ''
                  }`,
                ]}>
                <Icon
                  type={Icons.Ionicons}
                  name="menu"
                  size={30}
                  style={[tw`text-black dark:text-white`]}
                />
              </Pressable>
              <View style={tw`justify-center`}>
                <Text
                  style={[
                    tw`text-slate-600 dark:text-slate-300`,
                    {fontFamily: 'Poppins-Regular'},
                  ]}>
                  {Translation[language]['Welcome']},
                </Text>
                <Text
                  style={[
                    tw`text-xl text-black dark:text-white`,
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

            <View style={[tw`flex-row gap-2`]}>
              <View
                style={tw`flex-row items-center relative justify-center bg-[#111545] dark:bg-gray-800 w-[48px] h-[48px] rounded-3`}>
                <Icon
                  type={Icons.FontAwesome6}
                  name="location-dot"
                  size={30}
                  color={'#10b981'}
                />
                <Icon
                  type={Icons.FontAwesome5}
                  name="sync"
                  size={15}
                  color={'white'}
                  style={[tw`absolute z-10 top-1 right-1`]}
                />
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
                        tw`w-[48px] h-[48px] rounded-3 bg-[#111545] dark:bg-gray-800 flex-row justify-center items-center overflow-hidden`,
                      ]}>
                      <Text
                        style={[
                          tw`text-[30px] text-white`,
                          {fontFamily: 'Poppins-Bold', verticalAlign: 'middle'},
                        ]}>
                        {loggedInUser?.firstname?.charAt(0)?.toUpperCase()}
                        {loggedInUser?.lastname?.charAt(0)?.toUpperCase()}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    ),
    [loggedInUser, language, navigation, colorScheme],
  );

  return headerComponent;
};
