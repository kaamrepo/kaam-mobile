import { Image, Text, View, Pressable, SafeAreaView } from 'react-native'
import React from 'react'
import DreamCareerJobImage from "../../assets/images/dream-career-job.png"
import tw from "twrnc"
import GeneralStatusBar from '../../components/GeneralStatusBar'
const LastIntroScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={tw`flex-1`}>
                <GeneralStatusBar backgroundColor={"#5F4BB6"} />
                <View style={tw`w-full h-[60%]`}>
                    <Image
                        style={{
                            marginTop: '-10%',
                            height: '110%',
                            width: '100%'
                        }}
                        resizeMode='stretch'
                        source={DreamCareerJobImage}
                    />
                </View>
                <View style={tw`w-full h-[40%] px-10 py-3 justify-between`}>
                    <View>
                        <Text style={[{ fontFamily: "Poppins-SemiBold" }, tw`text-black text-3xl`]}>Make your dream career with job</Text>
                        <Text style={[tw`py-2 text-sm text-gray-600`, { fontFamily: 'Poppins-Regular' }]}>We help you find your dream job according to your skillset, location & preference to build your career.</Text>
                    </View>
                    <View style={tw`flex flex-row gap-4 h-14 mb-3`}>
                        <Pressable
                            onPress={() => {
                                navigation.navigate("registerScreen")
                            }}
                            style={({ pressed }) => [
                                {
                                    backgroundColor: pressed ? '#418c4d' : '#4A9D58',
                                },
                                tw`w-full items-center justify-center rounded-2xl`
                            ]}>
                            {({ pressed }) => (
                                <Text style={tw`text-white text-[15px] font-medium`}>Explore</Text>
                            )}
                        </Pressable>
                    </View>
                </View>
            </View >
        </SafeAreaView >
    )
}

export default LastIntroScreen
