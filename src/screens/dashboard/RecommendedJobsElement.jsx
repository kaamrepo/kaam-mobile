


import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React from 'react'
import { dashboardTranslation } from './dashboardTranslation'
import tw from "twrnc";
import Carousel from 'react-native-snap-carousel';
import Icon, { Icons } from '../../components/Icons';


const RecommendedJobsElement = ({ language, recommendedJobsData, isLoading, navigation }) =>
{

    if (isLoading)
    {
        return <>
            <View style={tw`flex-row justify-between items-center mt-5 mb-4 mx-5`}>
                <Text style={[tw`text-black text-xl`, { fontFamily: "Poppins-Bold" }]}>
                    {dashboardTranslation[language]["Recommended Jobs"]}
                </Text>
                <Text style={[tw`text-center text-sm leading-relaxed text-gray-600`, { fontFamily: "Poppins-Regular" }]}>
                    {dashboardTranslation[language]["See all"]}
                </Text>
            </View>
            <View style={tw`px-5 mb-14 w-full`}>
                <View style={[tw`w-full h-30 bg-gray-200 rounded-3 items-center justify-center`
                ]}>
                    <Text style={[tw`text-neutral-700 text-sm`, { fontFamily: "Poppins-Regular" }]}>Fetching jobs...</Text>
                </View>
            </View>
        </>
    }
    if (recommendedJobsData && recommendedJobsData?.total == 0)
    {
        return <>
            <View style={tw`flex-row justify-between items-center mt-5 mb-4 mx-5`}>
                <Text style={[tw`text-black text-xl`, { fontFamily: "Poppins-Bold" }]}>
                    {dashboardTranslation[language]["Recommended Jobs"]}
                </Text>
                <Text style={[tw`text-center text-sm leading-relaxed text-gray-600`, { fontFamily: "Poppins-Regular" }]}>
                    {dashboardTranslation[language]["See all"]}
                </Text>
            </View>
            <View style={tw`px-5 mb-14 w-full`}>
                <View style={tw`w-full h-30 bg-gray-200 rounded-3 items-center justify-center`}>
                    <Text style={[tw`text-neutral-700 text-sm`, { fontFamily: "Poppins-Regular" }]}>There are no recommended jobs</Text>
                </View>
            </View>
        </>
    }


    return (
        <>
            <View style={tw`flex-row justify-between items-center mt-5 mb-4 mx-5`}>
                <Text style={[tw`text-black text-xl`, { fontFamily: "Poppins-Bold" }]}>
                    {dashboardTranslation[language]["Recommended Jobs"]}
                </Text>
                <Text style={[tw`text-center text-sm leading-relaxed text-gray-600`, { fontFamily: "Poppins-Regular" }]}>
                    {dashboardTranslation[language]["See all"]}
                </Text>
            </View>
            <View>
                <Carousel
                    layout={'stack'}
                    layoutCardOffset={`18`}
                    autoplay={true} // Enable autoplay
                    autoplayInterval={5000} // Autoplay interval in milliseconds (5 seconds)
                    loop={true} // Loop the carousel
                    data={recommendedJobsData?.data}
                    renderItem={renderItemsRecommendedJobs}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width - 80}
                />
            </View>
        </>
    )
}

export default RecommendedJobsElement

const styles = StyleSheet.create({})



const renderItemsRecommendedJobs = ({ item, index }) =>
{
    return (
        <View style={tw`w-full h-48 justify-center items-center bg-[${ item.bgcolor }] rounded-3 p-4 m-4`}
            key={index}>
            <View style={tw`items-center mb-4`}>
                <Image
                    source={item.image}
                    style={tw`w-20 h-20 rounded-full`}
                />
            </View>
            <Text style={[tw`text-xl mb-2 text-white`, { fontFamily: "Poppins-Bold" }]}>{item.title}</Text>
            <View style={tw`w-full flex-row justify-around items-center`}>
                <View style={tw`flex-row gap-2 items-center`}>
                    <Icon type={Icons.MaterialIcons} name={"location-pin"} size={20} color={"white"} />
                    <Text style={[tw`text-white`, { fontFamily: "Poppins-SemiBold" }]}>
                        {item.location}
                    </Text>
                </View>
                <Text style={[tw`text-white`, { fontFamily: "Poppins-SemiBold" }]}>
                    {`₹ ${ new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(item.value) }/y`}
                </Text>
            </View>
        </View>
    );
};