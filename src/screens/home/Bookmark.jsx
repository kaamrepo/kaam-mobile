import {
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Text,
    Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react'
import tw from 'twrnc';
import Image1 from '../../assets/images/browse-jobs.png';
import Image2 from '../../assets/images/IntroScreenJobsAndInvitations.png';
import Image3 from '../../assets/images/search-dream-job.png';
import Image4 from '../../assets/images/checklist.png';

const Bookmark = ({ navigation }) => {
    const handleBackPress = () => {
        navigation.goBack();
    };
    const featuredJobs = [
        {
            image: Image1,
            title: 'Jr Executive',
            description: 'Tester',
            value: 960000,
            location: 'Delhi', workshift: "Full-time",
            status: "closed",
            color: "red"

        },
        {
            image: Image2,
            title: 'Jr Engineer',
            description: 'Devloper',
            value: 98765,
            location: 'Pune', workshift: "Over-Time",
            status: "open",
            color: "green"
        },
        {
            image: Image3,
            title: 'Sr tester',
            description: 'Automation',
            value: 576778,
            location: 'Mumbai', workshift: "Part-time",
            status: "applied",
            color: "blue"
        },
        {
            image: Image4,
            title: 'Manager',
            description: 'Delivery Manager',
            value: 576744,
            location: 'Mumbai', workshift: "Full-time",
            status: "inreview",
            color: "gray"
        },
        {
            image: Image1,
            title: 'Jr Executive',
            description: 'Tester',
            value: 960000,
            location: 'Delhi', workshift: "Full-time",
            status: "closed",
            color: "red"

        },
        {
            image: Image2,
            title: 'Jr Engineer',
            description: 'Devloper',
            value: 98765,
            location: 'Pune', workshift: "Over-Time",
            status: "open",
            color: "green"
        },
        {
            image: Image3,
            title: 'Sr tester',
            description: 'Automation',
            value: 576778,
            location: 'Mumbai', workshift: "Part-time",
            status: "applied",
            color: "blue"
        },
        {
            image: Image4,
            title: 'Manager',
            description: 'Delivery Manager',
            value: 576744,
            location: 'Mumbai', workshift: "Full-time",
            status: "inreview",
            color: "gray"
        },
        {
            image: Image1,
            title: 'Jr Executive',
            description: 'Tester',
            value: 960000,
            location: 'Delhi', workshift: "Full-time",
            status: "closed",
            color: "red"

        },
        {
            image: Image2,
            title: 'Jr Engineer',
            description: 'Devloper',
            value: 98765,
            location: 'Pune', workshift: "Over-Time",
            status: "open",
            color: "green"
        },
        {
            image: Image3,
            title: 'Sr tester',
            description: 'Automation',
            value: 576778,
            location: 'Mumbai', workshift: "Part-time",
            status: "applied",
            color: "blue"
        },
        {
            image: Image4,
            title: 'Manager',
            description: 'Delivery Manager',
            value: 576744,
            location: 'Mumbai', workshift: "Full-time",
            status: "inreview",
            color: "gray"
        },
    ];
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={tw`flex bg-[#FAFAFD]`}>
            <View style={tw`bg-white`}>
                <View style={tw`flex-row justify-between items-center p-3`}>
                    <Pressable onPress={() => {
                        navigation.openDrawer();
                    }}
                        style={({ pressed }) => [tw`h-12 w-12 rounded-full flex-row justify-center items-center ${pressed ? 'bg-slate-200' : ''}`]}
                    >
                        <TouchableOpacity onPress={handleBackPress}>
                            <Ionicons
                                name="chevron-back"
                                size={24}
                                style={tw`text-black`}
                            />
                        </TouchableOpacity>
                    </Pressable>
                    <View>
                        <Text style={[tw`text-xl text-black`, { fontFamily: "Poppins-Bold" }]}>Saved</Text>
                    </View>
                    <TouchableOpacity
                        style={tw`w-10 h-10`}>
                        <View style={tw`w-10 h-10 bg-yellow-400 rounded-lg shadow-2xl shadow-orange-800`}>
                            <Image
                                source={Image2}
                                style={tw`w-10 h-10 rounded-lg`}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={tw`flex-row justify-between items-center mt-3 mb-2 mx-6`}>
                <Text style={[tw`text-xl text-black text-bold`, { fontFamily: "Poppins-Bold" }]}>You Saved 48 Jobs 👍</Text>
            </View>
            <View>
                {featuredJobs.map((item, index) => (
                    <Pressable key={index} onPress={() => { }}>
                        {({ pressed }) => (<View style={tw`rounded-5 p-2 m-3 mx-5 ${pressed ? 'bg-gray-100' : 'bg-white'}`}>
                            <View style={tw`flex-row mb-2 px-5 `}>
                                <View style={tw`m-2 items-center justify-center`}>
                                    <Image
                                        source={item.image}
                                        style={tw`w-12 h-12 rounded-full`}
                                    />
                                </View>
                                <View style={tw`flex-1 items-start justify-center `}>
                                    <Text style={tw`text-lg font-bold text-black`}>{item.title}</Text>
                                    <Text style={tw`text-sm text-gray-400`}>{item.description}</Text>
                                </View>
                                <View style={tw`flex-1 items-end justify-center`}>
                                    <Text style={tw`text-lg font-semibold text-black`}>{item.value}/y</Text>
                                    <Text style={tw`text-sm text-gray-400`}>{item.location}</Text>
                                </View>
                            </View>
                            <View style={tw`flex-row justify-between items-center px-6 `}>
                                <TouchableOpacity
                                    style={tw` w-28 h-10`}>
                                    <View style={tw`w-28 h-10 bg-${item.color}-100 border border-${item.color}-700 rounded-full flex-1 items-center justify-center`}>
                                        <Text style={tw`text-sm text-black capitalize`}>{item.status}</Text>
                                    </View>
                                </TouchableOpacity>
                                <Text style={tw`text-sm text-black `}>{item.workshift}</Text>
                            </View>
                        </View>)}
                    </Pressable>
                ))}
            </View>
        </ScrollView >
    )
}

export default Bookmark

