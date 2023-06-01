import { Image, Text, View, Pressable, SafeAreaView } from 'react-native'
import React from 'react'
import BrowseJobsImage from "../../assets/images/browse-jobs.png"
import tw from "twrnc"
import GeneralStatusBar from '../../components/GeneralStatusBar'
const IntroScreenBrowseJobs = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={tw`flex-1`}>
                <GeneralStatusBar backgroundColor={"#5386E4"} />
                <View style={tw`w-full h-[60%]`}>
                    <Image
                        style={{
                            marginTop: '-10%',
                            height: '110%',
                            width: '100%'
                        }}
                        resizeMode='stretch'
                        source={BrowseJobsImage}
                    />
                </View>
                <View style={tw`w-full h-[40%] px-10 py-3 justify-between`}>
                    <View>
                        <Text style={[tw`text-black text-3xl`, { fontFamily: "Poppins-SemiBold" }]}>Browse the perfect jobs from the list</Text>
                        <Text style={[tw`py-2 text-sm text-gray-600`, { fontFamily: 'Poppins-Regular' }]}>
                            Our best jobs rankings incluse several industries, so you can find the best job for you in all the sectors.
                        </Text>
                    </View>

                    <View style={tw`flex flex-row gap-4 h-14 mb-3`}>
                        <Pressable
                            onPress={() => { navigation.replace('registerScreen') }}
                            style={({ pressed }) => [
                                tw`w-1/2 items-start justify-center rounded-2xl`
                            ]}>
                            {({ pressed }) => (
                                <Text style={tw`text-gray-600 text-[15px] font-medium`}>Skip</Text>
                            )}
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                navigation.replace('IntroScreenJobsAndInvitations')

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

export default IntroScreenBrowseJobs
