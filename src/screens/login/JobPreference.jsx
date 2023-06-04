import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, Pressable } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import SelectChips from '../../components/SelectChips'


const jobRoles = [
    { name: "Product Designer", isSelected: false },
    { name: "Motion Designer", isSelected: false },
    { name: "UX Designer", isSelected: false },
    { name: "Graphics Designer", isSelected: false },
    { name: "Full-Stack Developer", isSelected: false },
    { name: "Data Analyst", isSelected: false },
    { name: "Business Analyst", isSelected: false },
    { name: "Project Manager", isSelected: false },
    { name: "Sales Executive", isSelected: false },
    { name: "Marketing Manager", isSelected: false },
    { name: "HR Manager", isSelected: false },
    { name: "Accountant", isSelected: false },
    { name: "Financial Analyst", isSelected: false },
    { name: "Content Writer", isSelected: false },
    { name: "Graphic Designer", isSelected: false },
    { name: "UI/UX Designer", isSelected: false },
    { name: "Web Developer", isSelected: false },
    { name: "Android Developer", isSelected: false },
    { name: "System Administrator", isSelected: false },
    { name: "Network Engineer", isSelected: false },
    { name: "Operations Manager", isSelected: false },
    { name: "Quality Assurance Analyst", isSelected: false },
    { name: "Electrician", isSelected: false },
    { name: "Plumber", isSelected: false },
    { name: "Carpenter", isSelected: false },
    { name: "Welder", isSelected: false },
    { name: "Mason", isSelected: false },
    { name: "Painter", isSelected: false },
    { name: "Mechanic", isSelected: false },
    { name: "Driver", isSelected: false },
    { name: "Security Guard", isSelected: false },
    { name: "Construction Laborer", isSelected: false },
    { name: "Factory Worker", isSelected: false },
    { name: "Machine Operator", isSelected: false },
    { name: "Technician(e.g., HVAC technician, automotive technician)", isSelected: false },
    { name: "Housekeeping Staff", isSelected: false },
    { name: "Delivery Driver", isSelected: false },
    { name: "Gardener", isSelected: false },
    { name: "Cleaner", isSelected: false },
    { name: "Loading / Unloading Staff", isSelected: false },
    { name: "Packaging Staff", isSelected: false },
    { name: "Farm Worker", isSelected: false }
]
const jobLocation = [
    { name: "Worldwide", isSelected: false },
    { name: "India", isSelected: false },
    { name: "Maharashtra", isSelected: false },
    { name: "Pune", isSelected: false },
    { name: "Wakad", isSelected: false },
    { name: "Hinjewadi", isSelected: false }
]
const jobTypes = [
    { name: "Any", isSelected: false },
    { name: "Full-Time", isSelected: false },
    { name: "Part-Time", isSelected: false }
]
const jobPlace = [
    { name: "Any", isSelected: false },
    { name: "On-Site", isSelected: false },
    { name: "Remote", isSelected: false }
]

const JobPreference = ({ navigation }) =>
{
    const [selectedJobRoles, setSelectedJobRoles] = useState(jobRoles)
    const [selectedJobLocation, setSelectedJobLocation] = useState(jobLocation)
    const [selectedJobTypes, setSelectedJobTypes] = useState(jobTypes)
    const [selectedJobPlace, setSelectedJobPlace] = useState(jobPlace)

    return (
        <SafeAreaView style={[tw`bg-white flex-1 px-4`]}>
            <ScrollView style={[tw`py-2`]} showsVerticalScrollIndicator={false}>
                <View style={[tw`gap-3`]}>
                    <SelectChips
                        items={selectedJobRoles}
                        title={"Select Job Roles"}
                        setSelectedChips={setSelectedJobRoles}
                        allowedCount={2}
                        role={"job roles"}
                    />
                    <SelectChips
                        items={selectedJobLocation}
                        title={"Select Location"}
                        setSelectedChips={setSelectedJobLocation}
                        allowedCount={4}
                        role={"locations"}
                    />
                    <SelectChips
                        items={selectedJobTypes}
                        title={"Job Types"}
                        setSelectedChips={setSelectedJobTypes}
                        allowedCount={3}
                        role={"job types"}
                    />
                    <SelectChips
                        items={selectedJobPlace}
                        title={"Work Place"}
                        setSelectedChips={setSelectedJobPlace}
                        allowedCount={2}
                        role={"work place"}
                    />
                </View>
            </ScrollView >

            <View style={tw`flex-row items-center justify-around gap-1 h-14 mb-1`}>
                <Pressable
                    onPress={() => { }}
                    style={({ pressed }) => [
                        tw`w-1/4 items-center justify-center rounded-2xl`
                    ]}>
                    {({ pressed }) => (
                        <Text style={tw`text-gray-600 text-[15px] font-medium`}>Skip</Text>
                    )}
                </Pressable>
                {/* <Pressable
                    onPress={() =>
                    {
                        // console.log(JSON.stringify({
                        //     selectedJobRoles: selectedJobRoles.filter(i => i.isSelected),
                        //     selectedJobLocation: selectedJobLocation.filter(i => i.isSelected),
                        //     selectedJobTypes: selectedJobTypes.filter(i => i.isSelected),
                        //     selectedJobPlace: selectedJobPlace.filter(i => i.isSelected),
                        // }, null, 5));
                        navigation.navigate("")
                    }}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? '#418c4d' : '#4A9D58',
                        },
                        tw`w-11 h-11 items-center justify-center rounded-full`
                    ]}>
                    {({ pressed }) => (
                        <Icon type={Icons.Ionicons} name="chevron-forward" color="#FFFFFF" size={35} />
                    )}
                </Pressable> */}

                <Pressable
                    onPress={() =>
                    {
                        navigation.navigate('JobSelection');
                        // navigation.navigate('BottomTabNavigation');
                    }}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? '#d7dbd8' : 'transparent',
                        },
                        tw`w-13 h-13 items-center justify-center rounded-full`
                    ]}>
                    {({ pressed }) => (
                        <Image source={require('../../assets/images/gotonextScreen.png')} style={tw`w-12 h-12`} />
                    )}
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default JobPreference

const styles = StyleSheet.create({})
