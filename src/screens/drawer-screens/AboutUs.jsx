import React from 'react';
import {
  Text,
  SafeAreaView,
  ScrollView,
  Linking,
  Pressable,
  View,
} from 'react-native';
import tw from 'twrnc';
import Icon, {Icons} from '../../components/Icons';

export const AboutUs = ({navigation}) => {
  return (
    <SafeAreaView style={tw`flex-1 p-5`}>
      <View style={tw`my-4 flex-row items-center justify-between`}>
        <Pressable
          style={({pressed}) =>
            tw`h-10 w-10 items-center justify-center rounded-full ${
              pressed ? 'bg-gray-200' : ''
            } `
          }
          onPress={() => {
            navigation.goBack();
            navigation.openDrawer();
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
          About Us
        </Text>
        <View style={tw`h-10 w-10`}></View>
      </View>
      <ScrollView style={tw``} showsVerticalScrollIndicator={false}>
        <Text
          style={[
            tw`text-black dark:text-white mb-5 text-base`,
            {fontFamily: 'Poppins-Regular'},
          ]}>
          Welcome to Kaam! We are a platform dedicated to connecting employers
          and job seekers. Here's what you need to know about us:
        </Text>

        <Text
          style={[
            tw`text-black dark:text-white`,
            {fontFamily: 'Poppins-SemiBold'},
          ]}>
          Our Mission
        </Text>
        <Text
          style={[
            tw`text-black dark:text-white`,
            {fontFamily: 'Poppins-Regular'},
          ]}>
          At Kaam, our mission is to streamline the hiring process by providing
          a user-friendly platform that connects employers with qualified
          candidates.
        </Text>

        <Text
          style={[
            tw`mt-5 text-black dark:text-white`,
            {fontFamily: 'Poppins-SemiBold'},
          ]}>
          Our Vision
        </Text>
        <Text
          style={[
            tw`text-black dark:text-white`,
            {fontFamily: 'Poppins-Regular'},
          ]}>
          Our vision is to become the go-to platform for both employers and job
          seekers, offering innovative solutions and unparalleled support.
        </Text>

        <Text
          style={[
            tw`mt-5 mb-2 text-black dark:text-white`,
            {fontFamily: 'Poppins-SemiBold'},
          ]}>
          Our Values
        </Text>
        <Text
          style={[
            tw`text-black dark:text-white`,
            {fontFamily: 'Poppins-Regular'},
          ]}>
          <Text style={[tw``, {fontFamily: 'Poppins-SemiBold'}]}>Quality:</Text>{' '}
          We prioritize quality in everything we do, from the candidates we
          recommend to the features we offer on our platform.
        </Text>
        <Text
          style={[
            tw`text-black dark:text-white`,
            {fontFamily: 'Poppins-Regular'},
          ]}>
          <Text style={[tw``, {fontFamily: 'Poppins-SemiBold'}]}>
            Integrity:
          </Text>{' '}
          We operate with integrity, ensuring transparency and honesty in all
          our interactions.
        </Text>
        <Text
          style={[
            tw`text-black dark:text-white`,
            {fontFamily: 'Poppins-Regular'},
          ]}>
          <Text style={tw`font-semibold`}>Innovation:</Text> We are committed to
          innovation, continuously improving our platform to meet the evolving
          needs of our users.
        </Text>

        <Text
          style={[
            tw`mt-5 text-black dark:text-white`,
            {fontFamily: 'Poppins-SemiBold'},
          ]}>
          Contact Us
        </Text>
        <Text
          style={[
            tw`my-2 text-black dark:text-white`,
            {fontFamily: 'Poppins-Regular'},
          ]}>
          If you have any questions about our platform or need assistance,
          please don't hesitate to contact us:
        </Text>

        <Text
          style={[
            tw`text-black dark:text-white`,
            {fontFamily: 'Poppins-Regular'},
          ]}
          onPress={() => Linking.openURL('mailto:contact@kaam.com')}>
          - By email: contact@kaam.com
        </Text>

        <Text
          style={[
            tw`text-black dark:text-white`,
            {fontFamily: 'Poppins-Regular'},
          ]}
          onPress={() => Linking.openURL('https://www.kaam.com/contact')}>
          - Visit our Contact page on our website: www.kaam.com/contact
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
