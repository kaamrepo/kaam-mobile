import { StyleSheet, Image, Text, View, Pressable, ScrollView, TextInput, Button } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context"
import React, { useState, useCallback, useMemo, useRef } from 'react'
import tw from 'twrnc'
import Icon, { Icons } from '../../components/Icons';
import useLoginStore from '../../store/authentication/login.store';
import capitalizeFirstLetter from '../../helper/utils/capitalizeFirstLetter';
import InformationCard from '../../components/InformationCard';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';


const details = [
    { key: "Phone Number", value: "9594031989" },
    { key: "E-mail", value: "sidheshp@gmail.com" },
    { key: "DOB", value: "13/10/2000" },
]
const address = [
    { key: "House no.", value: "Everlasting" },
    { key: "Street", value: "M.G. Road" },
    { key: "Pin Code", value: "400068" },
    { key: "City", value: "Mumbai" },
    { key: "State", value: "Maharashtra" },
]

const resume = [{
    key: "Create Resume", value: ""
}]

const PersonalInfo = ({ navigation }) =>
{
    const { loggedInUser } = useLoginStore();

    const [isAboutMeEdit, setAboutMeEdit] = useState(false);
    const [aboutMeText, onChangeAboutMeText] = useState("sdf");

    const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

    // // callbacks
    // const handleSheetChanges = useCallback((index) =>
    // {
    //     console.log('handleSheetChanges', index);
    // }, []);

    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        []
    );

    return (
        <SafeAreaView style={tw`flex-1 p-4 px-5 bg-[#FAFAFD]`}>
            <View>
                <Pressable style={({ pressed }) => tw`h-10 w-10 items-center justify-center rounded-full ${ pressed ? 'bg-gray-200' : '' } `} onPress={() =>
                {
                    navigation.goBack();
                    navigation.openDrawer();
                }}>
                    <Icon type={Icons.Ionicons} name={"chevron-back"} size={25} color={"black"} />
                </Pressable>
            </View>
            <View style={tw`my-2 flex-row gap-4 items-center`}>
                <Image source={{ uri: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80" }} style={[tw`h-16 w-16 rounded-full`]} />

                <View>
                    <View style={tw`flex-row gap-5 items-center`}>
                        <Text style={[tw`text-[#0D0D26] text-[20px]`, { fontFamily: "Poppins-Bold" }]}>{`${ capitalizeFirstLetter(loggedInUser?.firstname) } ${ capitalizeFirstLetter(loggedInUser?.lastname) }`}</Text>
                        <Icon type={Icons.MaterialCommunityIcons} name={"pencil"} size={20} color={"black"} onPress={() => { console.log("object") }} />
                    </View>

                    <Text style={[tw`text-[#FE6D73] text-[12px]`, { fontFamily: 'Poppins-Light' }]}>{80 + "% Complete"}</Text>
                </View>
            </View>
            <ScrollView style={tw``} showsVerticalScrollIndicator={false}>
                <InformationCard title="Details" onPress={() => { }} informationArray={details} />
                <InformationCard title="Address" onPress={() => { }} informationArray={address} />

                {/* Resume Action Card */}
                <View style={tw`my-3`}>
                    <View style={tw`px-6 flex-row justify-between`}>
                        <Text style={[tw`text-[#0D0D26] text-[18px]`, { fontFamily: "Poppins-Bold" }]}>Resume</Text>
                    </View>
                    <View style={tw`px-6 py-4 bg-white rounded-[20px] border border-gray-100`}>
                        <View style={tw`flex-row justify-between `}>
                            <Text style={[tw`text-[#0D0D26]/50`, { fontFamily: "Poppins-SemiBold" }]}>Create Resume</Text>
                            <Icon type={Icons.MaterialCommunityIcons} name={"pencil"} size={20} color={"black"} onPress={() => { }} />
                        </View>
                    </View>
                </View>
                {/* Resume Action Card: Completed */}

                {/* About Me Action Card */}
                <View style={tw`my-3`}>
                    <View style={tw`px-6 flex-row justify-between`}>
                        <Text style={[tw`text-[#0D0D26] text-[18px]`, { fontFamily: "Poppins-Bold" }]}>About Me</Text>
                    </View>
                    <View style={tw`px-6 py-4 bg-white rounded-[20px] border border-gray-100`}>
                        <View style={tw`flex-row justify-between `}>
                            {isAboutMeEdit ?
                                <TextInput
                                    style={[tw`py-0 w-[85%]`, { fontFamily: "Poppins-Regular" }]}
                                    placeholder='Type here..'
                                    onChangeText={onChangeAboutMeText} value={aboutMeText}
                                /> : <Text style={[tw`text-[#0D0D26]/50 bg-blue-200`, { fontFamily: "Poppins-SemiBold" }]}>{aboutMeText}</Text>
                            }
                            <Icon type={Icons.MaterialCommunityIcons} name={"pencil"} size={20} color={"black"} onPress={() =>
                            {
                                bottomSheetRef.current.snapToIndex(1)
                                // setAboutMeEdit(true)
                            }} />
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* */}
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
            // onChange={handleSheetChanges}
            >
                <View style={styles.contentContainer}>
                    <Text>Awesome 🎉</Text>
                </View>
            </BottomSheet>

            {/*  */}
        </SafeAreaView>
    )
}

export default PersonalInfo

const styles = StyleSheet.create({

    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
})
