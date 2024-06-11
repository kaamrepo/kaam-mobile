import React from 'react';
import { Text, SafeAreaView, ScrollView, Linking } from 'react-native';
import tw from 'twrnc';

export const AboutUs = () => {
  return (
    <SafeAreaView style={tw`flex-1 p-4 px-5 bg-[#FAFAFD]`}>
      <ScrollView>
        <Text style={tw`text-2xl font-bold mb-4`}>About Us</Text>

        <Text style={tw`text-lg mb-4`}>
          Welcome to Kaam! We are a platform dedicated to connecting employers and job seekers. Here's what you need to know about us:
        </Text>

        <Text style={tw`font-semibold text-lg mb-2`}>Our Mission</Text>
        <Text style={tw`text-lg mb-4`}>
          At Kaam, our mission is to streamline the hiring process by providing a user-friendly platform that connects employers with qualified candidates.
        </Text>

        <Text style={tw`font-semibold text-lg mb-2`}>Our Vision</Text>
        <Text style={tw`text-lg mb-4`}>
          Our vision is to become the go-to platform for both employers and job seekers, offering innovative solutions and unparalleled support.
        </Text>

        <Text style={tw`font-semibold text-lg mb-2`}>Our Values</Text>
        <Text style={tw`text-lg mb-4`}>
          <Text style={tw`font-semibold`}>Quality:</Text> We prioritize quality in everything we do, from the candidates we recommend to the features we offer on our platform.
        </Text>
        <Text style={tw`text-lg mb-4`}>
          <Text style={tw`font-semibold`}>Integrity:</Text> We operate with integrity, ensuring transparency and honesty in all our interactions.
        </Text>
        <Text style={tw`text-lg mb-4`}>
          <Text style={tw`font-semibold`}>Innovation:</Text> We are committed to innovation, continuously improving our platform to meet the evolving needs of our users.
        </Text>

        <Text style={tw`font-semibold text-lg mb-2`}>Contact Us</Text>
        <Text style={tw`text-lg mb-4`}>
          If you have any questions about our platform or need assistance, please don't hesitate to contact us:
        </Text>

        <Text style={tw`mb-4`} onPress={() => Linking.openURL('mailto:contact@kaam.com')}>
          - By email: contact@kaam.com
        </Text>

        <Text style={tw`mb-4`} onPress={() => Linking.openURL('https://www.kaam.com/contact')}>
          - Visit our Contact page on our website: www.kaam.com/contact
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

