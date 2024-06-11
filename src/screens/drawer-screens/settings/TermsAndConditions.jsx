import React from 'react';
import { Text, SafeAreaView, ScrollView, Linking } from 'react-native';
import tw from 'twrnc';

export const TermsAndConditions = () => {
  return (
    <SafeAreaView style={tw`flex-1 p-4 px-5 bg-[#FAFAFD]`}>
      <ScrollView>
        <Text style={tw`text-2xl font-bold mb-4`}>Terms & Conditions</Text>
        
        <Text style={tw`mb-4`}>
          Welcome to Kaam! These terms and conditions outline the rules and regulations for the use of our platform.
        </Text>

        <Text style={tw`mb-4`}>
          By accessing this platform, we assume you accept these terms and conditions. Do not continue to use Kaam if you do not agree to all of the terms and conditions stated on this page.
        </Text>

        <Text style={tw`mb-4`}>
          The following terminology applies to these Terms and Conditions:
        </Text>

        <Text style={tw`mb-4`}>
          - "Client", "You" and "Your" refers to you, the person accessing this platform and accepting the Company’s terms and conditions.
        </Text>

        <Text style={tw`mb-4`}>
          - "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company.
        </Text>

        <Text style={tw`mb-4`}>
          - "Party", "Parties", or "Us", refers to both the Client and ourselves.
        </Text>

        <Text style={tw`mb-4`}>
          - "Content" means any text, images, graphics, audio, video, software, data compilations, and any other form of information capable of being stored in a computer that appears on or forms part of this platform.
        </Text>

        <Text style={tw`mb-4`}>
          - "Service" refers to the service provided by this platform.
        </Text>

        <Text style={tw`mb-4`}>
          Cookies
        </Text>

        <Text style={tw`mb-4`}>
          We employ the use of cookies. By accessing Kaam, you agreed to use cookies in agreement with the Company's Privacy Policy.
        </Text>

        <Text style={tw`mb-4`}>
          Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our platform to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
        </Text>

        {/* Add more text for License, Content Liability, Reservation of Rights, Removal of links, Content Changes */}

        <Text style={tw`mb-4`}>
          Contact Us
        </Text>

        <Text style={tw`mb-4`}>
          If you have any questions about these Terms and Conditions, you can contact us:
        </Text>

        <Text style={tw`mb-4`} onPress={() => Linking.openURL('mailto:your-email@example.com')}>
          - By email: your-email@example.com
        </Text>

        <Text style={tw`mb-4`} onPress={() => Linking.openURL('https://www.example.com/terms')}>
          - By visiting this page on our website: www.example.com/terms
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

