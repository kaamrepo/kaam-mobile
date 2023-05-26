import React from 'react';
import {
  View,
  Image,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import tw from 'twrnc';
const Intro_job_search = ({navigation}) => {
  return (
    <View style={tw`flex-1`}>
      <View style={tw`w-full h-[60%]`}>
        <Image
          source={require('../../assets/images/search-dream-job.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={tw`w-full px-10 py-3`}>
        <Text style={tw`font-bold text-black text-4xl`}>
          Search your dream job fast and ease
        </Text>
      </View>
      <View style={tw`px-10 py-2 text-sm leading-relaxed text-gray-600`}>
        <Text>Figure out your top five priorities -- </Text>
        <Text>whether it is company culture, salary</Text>
        <Text>or a specific job position</Text>
      </View>
      <View style={tw`flex flex-row px-10 h-14  mt-10 `}>
        <Pressable
          onPress={() => {}}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#d7dbd8' : 'transparent',
            },
            tw`w-1/2 items-center justify-center rounded-2xl`,
          ]}>
          {({pressed}) => (
            <Text style={tw`text-gray-600 text-[15px] font-medium`}>Skip</Text>
          )}
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('IntroScreenJobsAndInvitations');
          }}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#418c4d' : '#4A9D58',
            },
            tw`w-1/2 items-center justify-center rounded-2xl`,
          ]}>
          {({pressed}) => (
            <Text style={tw`text-white text-[15px] font-medium`}>Next</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Intro_job_search;
