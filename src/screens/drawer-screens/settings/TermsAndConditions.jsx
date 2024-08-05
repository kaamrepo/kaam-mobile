import React, {useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Pressable,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import tw from 'twrnc';
import Icon, {Icons} from '../../../components/Icons';
import RenderHtml from 'react-native-render-html';
import {useNavigation} from '@react-navigation/native';
import useRegistrationStore from '../../../store/authentication/registration.store';

export const TermsAndConditions = () => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const {getTermsAndConditions, termAndConditions} = useRegistrationStore();

  useEffect(() => {
    getTermsAndConditions();
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 p-5 bg-white`}>
      <View style={tw`mt-5 mb-2 flex-row items-center justify-between`}>
        <Pressable
          style={({pressed}) =>
            tw`h-10 w-10 items-center justify-center rounded-full ${
              pressed ? 'bg-gray-200' : ''
            } `
          }
          onPress={() => {
            navigation?.goBack();
          }}>
          <Icon
            type={Icons.Ionicons}
            name={'chevron-back'}
            size={25}
            color={'black'}
          />
        </Pressable>
        <Text
          style={[
            tw`text-2xl text-center my-4 text-black dark:text-white`,
            {fontFamily: 'Poppins-Bold'},
          ]}>
          Terms & Conditions
        </Text>
        <View style={tw`h-10 w-10`}></View>
      </View>
      <ScrollView
        style={tw`bg-gray-100 rounded-2xl p-4 w-full h-full py-2`}
        showsVerticalScrollIndicator={false}>
        {!termAndConditions?.text ? (
          <ActivityIndicator />
        ) : (
          <RenderHtml
            contentWidth={width}
            source={{html: termAndConditions.text}}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
