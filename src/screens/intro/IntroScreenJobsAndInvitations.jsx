import { Image, Text, View, Pressable } from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react'
import IntroScreenJobsAndInvitations from "../../assets/images/IntroScreenJobsAndInvitations.png"
import tw from "twrnc"
import GeneralStatusBar from '../../components/GeneralStatusBar'
const Intro_Jobs_and_Invitations = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={tw`flex-1`}>
                <GeneralStatusBar backgroundColor={"#f77278"} />
                <View style={tw`w-full h-[60%]`}>
                    <Image
                        style={{
                            marginTop: '-10%',
                            height: '110%',
                            width: '100%'
                        }}
                        resizeMode='stretch'
                        source={IntroScreenJobsAndInvitations}
                    />
                </View>
                <View style={tw`w-full h-[40%] px-10 py-3 justify-between`}>
                    <View>
                        <Text style={[{ fontFamily: "Poppins-SemiBold" }, tw`text-black text-3xl`]}>Apply to fitted jobs & get invitations</Text>
                        <Text style={[tw`py-2 text-sm text-gray-600`, { fontFamily: 'Poppins-Regular' }]}>You will ask to attend interviews to various companies and get your job proposals after that process.</Text>
                    </View>
                    <View style={tw`flex flex-row gap-4 h-14 mb-3`}>
                        <Pressable
                            onPress={() => {
                                navigation.replace("registerScreen")
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
                                navigation.replace("lastIntroScreen")
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

export default Intro_Jobs_and_Invitations
