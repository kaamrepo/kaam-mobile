import {
    SafeAreaView,
    View,
    StyleSheet,
    Image,
    Text,
    FlatList,
    Pressable,
    TouchableOpacity
} from 'react-native';
import Icon, { Icons } from '../../components/Icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react'
import tw from 'twrnc';
import BlueTickSVG from '../../assets/svgs/Blue Tick.svg';
import useLoginStore from '../../store/authentication/login.store';
import { launchImageLibrary } from 'react-native-image-picker';
import useUsersStore from '../../store/authentication/user.store';

const ViewProfile = ({ navigation }) => {
    const { loggedInUser } = useLoginStore();
    const { updateUserProfileStore } = useUsersStore()
    let options = {
        title: 'Select Image',
        type: 'library',
        options: {
            maxHeight: 200,
            maxWidth: 200,
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: false,
        },
    }
    const portfolioItems = [
        { id: 1, title: 'Project 1' },
        { id: 2, title: 'Project 2' },
        { id: 3, title: 'Project 3' },
        { id: 4, title: 'Project 4' },
        { id: 5, title: 'Project 5' },
        { id: 6, title: 'Project 6' },
        { id: 7, title: 'Project 7' },
        { id: 8, title: 'Project 8' },
        { id: 9, title: 'Project 9' },
        { id: 10, title: 'Project 10' },
    ];
    const uploadProfile = async () => {
        const image = await launchImageLibrary(options);
        if (image) {
            const formData = new FormData();
            formData.append("source", "uploadProfile");
            formData.append("profilepic", { uri: image.assets[0].uri, type: image.assets[0].type, name: image.assets[0].fileName });
            await updateUserProfileStore(loggedInUser?._id, formData)
        }
    };
    const handleBackPress = () => {
        navigation.goBack();
    };
    const renderItem = ({ item }) => (
        <View style={tw`w-1/3 p-2 `}>
            <Image
                source={require('../../assets/images/browse-jobs.png')} // Replace with your image source
                style={styles.itemImage}
            />
            <Text style={tw`text-center text-black`}>{item.title}</Text>
        </View>
    );

    return (
        <SafeAreaView style={tw`flex-1 px-5`}>
            <View style={tw`flex flex-row justify-between`}>
                <Pressable onPress={() => {
                    navigation.openDrawer();
                }}
                    style={({ pressed }) => [tw`h-10 w-10  flex-row justify-center items-center ${pressed ? 'bg-slate-200' : ''}`]}
                >
                    <TouchableOpacity onPress={handleBackPress}>
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            style={tw`text-black`}
                        />
                    </TouchableOpacity>
                </Pressable>
                {/* <Text style={[tw`text-[#AFB0B6] text-[18px] p-2`, { fontFamily: 'Poppins-Semibold' }]}>
                    {'Edit'}
                </Text> */}
            </View>
            <View style={tw`bg-white rounded-lg`}>
                <View style={tw`flex justify-center items-center`}>
                    <View style={[tw`p-3 items-center justify-center`]}>
                        <View style={tw`flex-row items-center`}>
                            {loggedInUser?.profilepic ? <Image
                                source={{ uri: loggedInUser.profilepic }}
                                style={styles.ProfileIcon}
                            /> : <Image
                                source={require('../../assets/images/default-profile.jpg')}
                                style={styles.ProfileIcon}
                            />}
                            <Icon type={Icons.MaterialCommunityIcons} name={"camera"} size={20} color={"white"} onPress={() => { uploadProfile() }} style={tw`absolute bottom-1 right-1 bg-blue-300/50 rounded-full p-1`} />
                        </View>
                        <Text style={[tw`text-black text-[24px]`, { fontFamily: 'Poppins-SemiBold' }]}>
                            {`${loggedInUser.firstname} ${loggedInUser.lastname}`}
                        </Text>
                        <View style={tw`flex-row`}>
                            <Text style={[tw`text-[#95969D] text-[14px]`, { fontFamily: 'Poppins-Light' }]}>
                                {'UI Designer'}
                            </Text>
                            <BlueTickSVG width={20} height={20} />
                        </View>
                    </View>
                </View>

                <View style={tw`flex flex-row p-2 mb-2`}>
                    <View style={tw`flex-1 justify-center items-center p-1`}>
                        <Text style={[tw`text-[16px] text-black `, { fontFamily: 'Poppins-Bold' }]}>
                            {'27'}
                        </Text>
                        <Text style={[tw`text-[12px] text-[#95969D] `, { fontFamily: 'Poppins-Bold' }]}>
                            {'Applied'}
                        </Text>
                    </View>
                    <View style={tw`flex-1 justify-center items-center p-1`}>
                        <Text style={[tw`text-[16px] text-black `, { fontFamily: 'Poppins-Bold' }]}>
                            {'19'}
                        </Text>
                        <Text style={[tw`text-[12px] text-[#95969D] `, { fontFamily: 'Poppins-Bold' }]}>
                            {'Reviewed'}
                        </Text>
                    </View>
                    <View style={tw`flex-1 justify-center items-center p-1`}>
                        <Text style={[tw`text-[16px] text-black `, { fontFamily: 'Poppins-Bold' }]}>
                            {'22'}
                        </Text>
                        <Text style={[tw`text-[12px] text-[#95969D] `, { fontFamily: 'Poppins-Bold' }]}>
                            {'Interview'}
                        </Text>
                    </View>
                </View>
            </View>
            <FlatList
                ListHeaderComponent={() => (
                    <View style={tw`flex flex-row justify-between items-center mt-2`}>
                        <Text style={[tw`text-[#0D0D26]  text-[16px] p-2`, { fontFamily: 'Poppins-Bold' }]}>
                            {'Resume'}
                        </Text>
                        <Text style={[tw`text-[#0E9D57] text-[13px] p-2`, { fontFamily: 'Poppins-SemiBold' }]}>
                            {'Make a resume'}
                        </Text>
                    </View>
                )}
                ListHeaderComponentStyle={tw`mb-2`}
                data={[{ id: 'resume', content: 'Resume content' }]}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable onPress={() => { }}>
                        {({ pressed }) => (
                            <View style={tw`rounded-5 p-2 mb-2   ${pressed ? 'bg-gray-100' : 'bg-white'}`}>
                                <View style={tw`flex-row justify-between items-center`}>
                                    <View style={tw`w-8 h-4 bg-[#5386E4] border border-[#5386E4] rounded-full  items-center justify-center`}>
                                        <Text style={[tw`text-[8px] text-white  `, { fontFamily: 'Poppins-Bold' }]}>
                                            {'CV'}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={[tw`text-[11px] text-black  `, { fontFamily: 'Poppins-Bold' }]}>
                                            {'Akshay Naik'}
                                        </Text>
                                        <Text style={[tw`text-[8px] text-black  text-center`, { fontFamily: 'Poppins-SemiBold' }]}>
                                            {'UX Designer'}
                                        </Text>
                                    </View>
                                    <View style={tw`w-8 h-5 bg-[#5F4BB6] border border[#5F4BB6] rounded-full  items-center justify-center`}>
                                        <Text style={[tw`text-[8px] text-white `, { fontFamily: 'Poppins-Bold' }]}>
                                            {'PDF'}
                                        </Text>
                                    </View>
                                </View>
                                <View style={tw`p-2`}>
                                    <Text style={tw`text-[8px] text-black `}>
                                        {'Creative UX Designer with 6+ years of experience in optimizing user experience through innovative solutions and dynamic interface designs. Successful in enhancing user engagement for well-known brands, providing a compelling user experience to improve brand loyalty and customer retention.'}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </Pressable>
                )}
                ListFooterComponent={() => (
                    <View>
                        <View style={tw`flex flex-row justify-between items-center`}>
                            <Text style={[tw`text-[#0D0D26]  text-[16px]`, { fontFamily: 'Poppins-Bold' }]}>
                                {'Portfolio'}
                            </Text>
                            <Text style={[tw`text-[#AFB0B6] text-[13px]`, { fontFamily: 'Poppins-SemiBold' }]}>
                                {'See all'}
                            </Text>
                        </View>
                        <FlatList
                            data={portfolioItems}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={3}
                            renderItem={renderItem}
                            contentContainerStyle={tw`mt-2`}
                        />
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default ViewProfile;

const styles = StyleSheet.create({
    ProfileIcon: {
        resizeMode: 'center',
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        alignSelf: 'center',
    },
    itemImage: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        resizeMode: 'center',
        borderRadius: 5,
    },
});
