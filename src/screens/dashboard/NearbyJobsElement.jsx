


import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from "twrnc";
import { dashboardTranslation } from './dashboardTranslation';
import Carousel from 'react-native-snap-carousel';
import useLoginStore from '../../store/authentication/login.store';
import Icon, { Icons } from '../../components/Icons';

const NearbyJobsElement = ({ language, nearbyjobs, navigation, isLoading }) =>
{
    const { loggedInUser } = useLoginStore();

    if (isLoading)
    {
        return (
            <>
                <View style={tw`flex-row justify-between items-center mb-4 mx-5`}>
                    <Text style={[tw`text-black text-xl`, { fontFamily: "Poppins-Bold" }]}>{dashboardTranslation[language]["Nearby Jobs"]}</Text>
                    <Text style={[tw`text-center text-sm leading-relaxed text-gray-600`, { fontFamily: "Poppins-Regular" }]}>
                        {dashboardTranslation[language]["See all"]}
                    </Text>
                </View>
                <View style={tw`w-full px-5`}>
                    <View style={tw`bg-gray-200 w-full h-48 rounded-3 items-center justify-center`}>
                        <Text style={[tw`text-neutral-700 text-sm`, { fontFamily: "Poppins-Regular" }]}>Fetching jobs...</Text>
                    </View>
                </View>
            </>
        )
    }
    if (nearbyjobs && nearbyjobs?.total == 0)
    {
        return (
            <>
                <View style={tw`flex-row justify-between items-center mb-4 mx-5`}>
                    <Text style={[tw`text-black text-xl`, { fontFamily: "Poppins-Bold" }]}>{dashboardTranslation[language]["Nearby Jobs"]}</Text>
                    <Text style={[tw`text-center text-sm leading-relaxed text-gray-600`, { fontFamily: "Poppins-Regular" }]}>
                        {dashboardTranslation[language]["See all"]}
                    </Text>
                </View>
                <View style={tw`w-full px-5`}>
                    <View style={tw`bg-gray-200 w-full h-48 rounded-3 items-center justify-center`}>
                        <Text style={[tw`text-neutral-700 text-sm`, { fontFamily: "Poppins-Regular" }]}>There are no nearby jobs</Text>
                    </View>
                </View>
            </>
        )
    }
    return (
        <>
            <View style={tw`flex-row justify-between items-center mb-4 mx-5`}>
                <Text style={[tw`text-black text-xl`, { fontFamily: "Poppins-Bold" }]}>{dashboardTranslation[language]["Nearby Jobs"]}</Text>
                <Text style={[tw`text-center text-sm leading-relaxed text-gray-600`, { fontFamily: "Poppins-Regular" }]}>
                    {dashboardTranslation[language]["See all"]}
                </Text>
            </View>
            <View>
                <Carousel
                    layout={'default'}
                    autoplay={true}
                    autoplayInterval={5000}
                    loop={true}
                    data={nearbyjobs?.data}
                    renderItem={({ item, index }) => renderItemsNearbyJobs({ item, index, navigation, isLoading, loggedInUser })}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width - 80}
                />
            </View>
        </>
    )
}

export default NearbyJobsElement

const styles = StyleSheet.create({})




const renderItemsNearbyJobs = ({ item, index, navigation, isLoading, loggedInUser }) =>
{

    return (
        <TouchableOpacity
            onPress={() =>
            {
                navigation.navigate('ApplyNow', { id: item._id });
            }}
            key={item._id}
            style={tw`shadow-md shadow-offset-1 shadow-radius-[10px]`}
        >
            <View style={tw`w-full h-48 justify-between p-5 rounded-3 ${ !isLoading ? `${ item?.styles?.bgcolor ? `bg-[${ item?.styles?.bgcolor }]` : 'bg-white' }` : `bg-slate-200` }`}>
                <View style={tw`w-full flex-row items-center gap-4`}>
                    {isLoading ? <View style={tw`h-13 w-13 rounded-xl bg-slate-300/40`}></View> :
                        <Image
                            source={{ uri: item?.employerDetails?.profilepic ? item?.employerDetails?.profilepic : loggedInUser?.profilepic }}
                            style={tw`h-13 w-13 rounded-xl`}
                            resizeMode="contain"
                        />
                        // <View style={tw`h-13 w-13 rounded-xl bg-slate-300/40`}></View>
                    }
                    <Text style={[tw`${ item?.styles?.color ? `text-[${ item?.styles?.color }]` : 'text-white' } text-[18px] ${ !isLoading ? `` : `bg-slate-300/40 rounded-full w-[70%] py-2` }`, { fontFamily: "Poppins-Bold" }]}>{item.position}</Text>
                </View>

                <View style={tw`flex-row justify-between items-center ${ !isLoading ? `` : `bg-slate-300/40 rounded-full w-full p-4` }`}>
                    {item?.tags?.map(tag => <Text key={tag} style={[tw`p-2 px-3 ${ item?.styles?.color ? `text-[${ item?.styles?.color }]` : 'text-white' } text-xs rounded-full bg-slate-100/30`, { fontFamily: "Poppins-Regular" }]}>{tag?.length > 15 ? `${ tag.slice(0, 15) }...` : tag}</Text>)}
                </View>
                <View style={tw`flex-row justify-between items-center`}>
                    <Text style={[tw`${ item?.styles?.color ? `text-[${ item?.styles?.color }]` : 'text-white' } text-sm ${ !isLoading ? `` : `bg-slate-300/40 rounded-full w-[30%] p-1 px-3` }`, { fontFamily: "Poppins-SemiBold" }]}>
                        {item?.salary ? `₹ ${ new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(item?.salary) }/${ item?.salarybasis }` : ''}</Text>

                    <View style={tw`flex-row gap-2 items-center`}>
                        <Icon type={Icons.MaterialIcons} name={"location-pin"} size={20} color={"white"} />
                        <Text style={[tw`${ item?.styles?.color ? `text-[${ item?.styles?.color }]` : 'text-white' } text-sm ${ !isLoading ? `` : `bg-slate-300/40 rounded-full w-[30%] p-1 px-3` }`, { fontFamily: "Poppins-SemiBold" }]}>{item?.location?.name}</Text>
                    </View>

                </View>
            </View>
        </TouchableOpacity>
    );
};