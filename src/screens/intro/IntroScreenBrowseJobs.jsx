import {Image, Text, View, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect, useState} from 'react';
import BrowseJobsImage from '../../assets/images/browse-jobs.png';
import tw from 'twrnc';
import GeneralStatusBar from '../../components/GeneralStatusBar';
import {translation} from './stringsoflanguages';
import {retrieveLanguage} from '../../store/authentication/login.store';
const IntroScreenBrowseJobs = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  useEffect(() => {
    async function getData() {
      let response = await retrieveLanguage();
      setSelectedLanguage(response);
    }
    getData();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={tw`flex-1`}>
        <GeneralStatusBar backgroundColor={'#5386E4'} />
        <View style={tw`w-full h-[60%]`}>
          <Image
            style={{
              marginTop: '-10%',
              height: '110%',
              width: '100%',
            }}
            resizeMode="stretch"
            source={BrowseJobsImage}
          />
        </View>
        <View style={tw`w-full h-[40%] px-10 py-3 justify-between`}>
          <View>
            <Text
              style={[
                tw`text-black text-3xl py-2`,
                {fontFamily: 'Poppins-SemiBold'},
              ]}>
              {translation[4][selectedLanguage]}
            </Text>
            <Text
              style={[
                tw`py-2 text-sm text-gray-600`,
                {fontFamily: 'Poppins-Regular'},
              ]}>
              {translation[8][selectedLanguage]}
            </Text>
          </View>
          <View style={tw`flex flex-row gap-4 h-14 mb-3`}>
            <Pressable
              onPress={() => {
                navigation.replace('registerScreen');
              }}
              style={({pressed}) => [
                tw`w-1/2 items-start justify-center rounded-2xl`,
              ]}>
              {({pressed}) => (
                <Text style={tw`text-gray-600 text-[15px] font-medium`}>
                  {translation[0][selectedLanguage]}
                </Text>
              )}
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.replace('IntroScreenJobsAndInvitations');
              }}
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#418c4d' : '#4A9D58',
                },
                tw`w-1/2 items-center justify-center rounded-2xl`,
              ]}>
              {({pressed}) => (
                <Text style={tw`text-white text-[15px] font-medium`}>
                  {translation[1][selectedLanguage]}
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default IntroScreenBrowseJobs;
