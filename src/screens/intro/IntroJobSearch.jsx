import { SafeAreaView, Image, Text, View, Pressable } from 'react-native'
import SearchDreamJob from '../../assets/images/search-dream-job.png'
import React from 'react'
import tw from "twrnc"
import GeneralStatusBar from '../../components/GeneralStatusBar'
const Intro_job_search = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={tw`flex-1`}>
        <GeneralStatusBar backgroundColor={"#57B56E"} />
        <View style={tw`w-full h-[60%]`}>
          <Image
            style={{
              marginTop: '-10%',
              height: '110%',
              width: '100%'
            }}
            resizeMode='stretch'
            source={SearchDreamJob}
          />
        </View>
        <View style={tw`w-full h-[40%] px-10 py-3 justify-between`}>
          <View>
            <Text style={[tw`text-black text-3xl`, { fontFamily: "Poppins-SemiBold" }]}>Search your dream job fast and ease</Text>
            <Text style={[tw`py-2 text-sm text-gray-600`, { fontFamily: 'Poppins-Regular' }]}>
              Figure out your top five priorities -- {'\n'}
              whether it is company culture, salary {'\n'}
              or a specific job position
            </Text>
          </View>
          <View style={tw`flex flex-row gap-4 h-14 mb-3`}>
            <Pressable
              onPress={() => {
                navigation.navigate("registerScreen")
              }}
              style={({ pressed }) => [
                tw`w-1/2 items-start justify-center rounded-2xl`
              ]}>
              {({ pressed }) => (
                <Text style={tw`text-gray-600 text-[15px] font-medium`}>Skip</Text>
              )}
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate('IntroScreenBrowseJobs')
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
      </View >
    </SafeAreaView >
  )
}

export default Intro_job_search
