import { StyleSheet, Image, Text, View, Pressable, SafeAreaView, Button } from 'react-native'
import SearchDreamJob from '../../assets/images/search-dream-job.png'
import React from 'react'
import tw from "twrnc"
import GeneralStatusBar from '../../components/GeneralStatusBar'
const Intro_job_search = ({ navigation }) =>
{
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={tw`flex-1`}>
        <GeneralStatusBar backgroundColor={"#50A853"} />
        <View style={tw`w-full h-[60%]`}>
          <Image
            style={{
              marginTop: '-10%',
              height: '110%',
              width: '100%'
            }}
            resizeMode='cover'
            source={SearchDreamJob}
          />
        </View>
        <View style={tw`w-full h-[40%] px-10 py-3 `}>
          <Text style={tw`font-bold text-black text-4xl`}>Search your dream job fast and ease</Text>
          <Text style={tw`py-2 text-sm leading-relaxed text-gray-600`}>
            Figure out your top five priorities --
            whether it is company culture, salary
            or a specific job position
          </Text>

          <View style={tw`flex flex-row gap-4 h-14`}>
            <Pressable
              onPress={() =>
              {
              }}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#d7dbd8' : 'transparent',
                },
                tw`w-1/2 items-center justify-center rounded-2xl`
              ]}>
              {({ pressed }) => (
                <Text style={tw`text-gray-600 text-[15px] font-medium`}>Skip</Text>
              )}
            </Pressable>
            <Pressable
              onPress={() =>
              {
                navigation.navigate('IntroScreenJobsAndInvitations')
              }}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#418c4d' : '#4A9D58',
                },
                tw`w-1/2 items-center justify-center rounded-2xl`
              ]}>
              {({ pressed }) => (
                <Text style={tw`text-white text-[15px] font-medium`}>Next</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Intro_job_search

const styles = StyleSheet.create({})