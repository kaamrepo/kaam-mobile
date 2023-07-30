import React, { useEffect, useState } from 'react';
import
{
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  RefreshControl,
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Feather';
import Image1 from '../../assets/images/browse-jobs.png';
import Image2 from '../../assets/images/IntroScreenJobsAndInvitations.png';
import Image3 from '../../assets/images/search-dream-job.png';
import Image4 from '../../assets/images/checklist.png';
import MenuIconSVG from "../../assets/svgs/Menu Icon.svg"
import FilterIconSVG from "../../assets/svgs/FilterIcon.svg"
import useLoginStore from '../../store/authentication/login.store';
import capitalizeFirstLetter from '../../helper/utils/capitalizeFirstLetter';
import GeneralStatusBar from '../../components/GeneralStatusBar';
import useJobStore from '../../store/authentication/dashboard.store';
import useLoaderStore from '../../store/loader.store';
import { requestLocationPermission } from '../../helper/utils/getGeoLocation';
import Geolocation from 'react-native-geolocation-service';
import { dashboardTranslation } from './dashboardTranslation';

const Dashboard = ({ navigation }) =>
{
  const [refreshing, setRefreshing] = useState(false);

  const { loggedInUser, language } = useLoginStore();
  const { nearbyjobs, getNearByJobs } = useJobStore();
  const { isLoading } = useLoaderStore();

  const [location, setLocation] = useState(false);

  useEffect(() =>
  {

    const result = requestLocationPermission();
    result.then(res =>
    {
      if (res)
      {
        Geolocation.getCurrentPosition(
          position =>
          {
            setLocation(position)
          },
          error =>
          {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    });

  }, [])

  useEffect(() =>
  {
    if (location)
    {
      getNearByJobs(0, 5, [location?.coords?.longitude, location?.coords?.latitude]);
    }
  }, [location])


  const onRefresh = React.useCallback(() =>
  {
    setRefreshing(true);
    if (location)
    {
      getNearByJobs(0, 5, [location?.coords?.longitude, location?.coords?.latitude]);
    }
    setRefreshing(false);
  }, [location]);

  const renderItemsRecommendedJobs = ({ item, index }) =>
  {
    return (
      <View style={tw`w-full h-52 justify-center items-center bg-blue-600 rounded-3 p-4 m-4`} key={index}>
        <View style={tw`items-center mb-4`}>
          <Image
            source={item.image}
            style={tw`${ styles.image } w-20 h-20 rounded-full`}
          />
        </View>
        <Text style={tw`font-bold text-xl mb-2`}>{item.title}</Text>
        <Text>{item.location}</Text>
        <Text>{item.value}/y</Text>
      </View>
    );
  };
  const featuredJobs = [
    {
      _id: "fghjkl",
      image: Image1,
      title: 'Jr Executive',
      description: 'Tester',
      value: 960000,
      location: 'Delhi',
    },
    {
      _id: "fghgjkl",
      image: Image2,
      title: 'Jr Engineer',
      description: 'Devloper',
      value: 98765,
      location: 'Pune',
    },
    {
      _id: "fghjksl",
      image: Image1,
      title: 'Sr tester',
      description: 'Automation',
      value: 576778,
      location: 'Mumbai',
    },
  ];

  const renderItemsNearbyJobs = ({ item, index }) =>
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
            {isLoading ? <View style={tw`h-13 w-13 rounded-xl bg-slate-300/40`}></View> : <Image
              source={{ uri: loggedInUser?.profilepic }}
              style={tw`h-13 w-13 rounded-xl`}
              resizeMode="contain"
            />}
            <Text style={[tw`${ item?.styles?.color ? `text-[${ item?.styles?.color }]` : 'text-white' } text-[18px] ${ !isLoading ? `` : `bg-slate-300/40 rounded-full w-[70%] py-2` }`, { fontFamily: "Poppins-Bold" }]}>{item.position}</Text>
          </View>

          <View style={tw`flex-row justify-between items-center ${ !isLoading ? `` : `bg-slate-300/40 rounded-full w-full p-4` }`}>
            {item?.tags?.map(tag => <Text key={tag} style={[tw`p-2 px-3 ${ item?.styles?.color ? `text-[${ item?.styles?.color }]` : 'text-white' } text-xs rounded-full bg-slate-100/30`, { fontFamily: "Poppins-Regular" }]}>{tag}</Text>)}
          </View>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={[tw`${ item?.styles?.color ? `text-[${ item?.styles?.color }]` : 'text-white' } text-sm ${ !isLoading ? `` : `bg-slate-300/40 rounded-full w-[30%] p-1 px-3` }`, { fontFamily: "Poppins-SemiBold" }]}>
              {item?.salary ? `₹ ${ new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(item?.salary) }/${ item?.salaryduration }` : ''}</Text>
            <Text style={[tw`${ item?.styles?.color ? `text-[${ item?.styles?.color }]` : 'text-white' } text-sm ${ !isLoading ? `` : `bg-slate-300/40 rounded-full w-[30%] p-1 px-3` }`, { fontFamily: "Poppins-SemiBold" }]}>{item?.location?.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const recommendedJobsData = [
    {
      image: Image1,
      title: 'cook homemade',
      value: 960000,
      location: 'Delhi',
    },
    {
      image: Image2,
      title: 'cook homemade',
      value: 960000,
      location: 'Delhi',
    },
    {
      image: Image3,
      title: 'cook homemade',
      value: 960000,
      location: 'Delhi',
    },
  ];

  // bg-[#FAFAFD]
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
      style={[tw`py-10 bg-[#FAFAFD]`,]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <GeneralStatusBar backgroundColor={"#d6d6d6"} />
      <View style={tw`mx-5 mb-4 rounded-3 justify-center`}>
        <View style={tw`flex-row justify-between items-center`}>
          <View style={tw`flex-row items-center gap-5`}>
            <Pressable onPress={() => { navigation.openDrawer(); }}
              style={({ pressed }) => [tw`p-2 h-12 w-12 rounded-full flex-row justify-center items-center ${ pressed ? 'bg-slate-200' : '' }`]}
            >
              <MenuIconSVG width={25} height={25} />
            </Pressable>
            <View style={tw`justify-center`}>
              <Text style={[tw`text-slate-600`, { fontFamily: "Poppins-Regular" }]}>{dashboardTranslation[language]["Welcome"]},</Text>
              <Text style={[tw`text-xl text-black`, { fontFamily: "Poppins-Bold" }]}>{`${ capitalizeFirstLetter(loggedInUser?.firstname) } ${ capitalizeFirstLetter(loggedInUser?.lastname) }`} </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("View Profile")}
            style={tw`w-12 h-12`}>
            <View style={tw`w-12 h-12  rounded-lg shadow-2xl shadow-orange-800`}>
              {loggedInUser?.profilepic ? <Image
                source={{ uri: loggedInUser.profilepic }}
                style={styleData.ProfileIcon}
              /> : <Image
                source={require('../../assets/images/default-profile.jpg')}
                style={styleData.ProfileIcon}
              />}
            </View>
          </TouchableOpacity>
        </View>
      </View>


      <View style={tw`flex-row items-center mb-4 mx-5`}>
        <View
          style={tw`flex-1 bg-[#F2F2F3] rounded-lg h-10 flex-row items-center pr-2`}>
          <Icon name="search" size={20} color="gray" style={tw`mx-2`} />
          <TextInput
            style={tw`flex-1 text-sm text-black`}
            placeholder="Search"
            placeholderTextColor="gray"
          />
        </View>
        <TouchableOpacity
          style={tw`w-10 h-10 bg-[#F2F2F3] rounded-lg items-center justify-center ml-2`}>
          <FilterIconSVG />
        </TouchableOpacity>
      </View>
      <View>
        <View style={tw`flex-row justify-between items-center mb-4 mx-5`}>
          <Text style={[tw`text-black text-xl`, { fontFamily: "Poppins-Bold" }]}>{dashboardTranslation[language]["Nearby Jobs"]}</Text>
          <Text style={[tw`text-center text-sm leading-relaxed text-gray-600`, { fontFamily: "Poppins-Regular" }]}>
            {dashboardTranslation[language]["See all"]}
          </Text>
        </View>
        {
          isLoading ?
            <RecommendedJobsFillerComponent isLoading={isLoading} />
            : Object.keys(nearbyjobs)?.length <= 0
              ? <RecommendedJobsFillerComponent isLoading={isLoading} />
              :
              <Carousel
                layout={'default'}
                autoplay={true}
                autoplayInterval={5000}
                loop={true}
                data={nearbyjobs?.data}
                renderItem={renderItemsNearbyJobs}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width - 80}
              />}
      </View>
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
          data={recommendedJobsData}
          renderItem={renderItemsRecommendedJobs}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width - 80}
        />
      </View>
      <View style={tw`flex-row justify-between items-center mt-5 mb-4 mx-5`}>
        <Text style={[tw`text-black text-xl`, { fontFamily: "Poppins-Bold" }]}>
          {dashboardTranslation[language]["Featured Jobs"]}
        </Text>
        <Text style={[tw`text-center text-sm leading-relaxed text-gray-600`, { fontFamily: "Poppins-Regular" }]}>
          {dashboardTranslation[language]["See all"]}
        </Text>
      </View>

      {isLoading ? <LoadingElement /> :
        <FeaturedJobsElement featuredJobs={featuredJobs} />}

    </ScrollView >
  );
};

const cardColors = {
  1: "#4A9D58",
  2: "#5386E4",
  3: "#5F4BB6",
  4: "#F2BB40",
  5: "#313131",
  6: "#D9302A",
  7: "#4A9D58",
  8: "#5386E4",
  9: "#5F4BB6",
  10: "#F2BB40",
  11: "#313131",
  12: "#D9302A",
}

const styles = {
  image: 'w-full h-full',
};
const styleData = StyleSheet.create({
  ProfileIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    // resizeMode: "center",
    shadowColor: '#FF5722',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 16,
  },
});

export default Dashboard;



const RecommendedJobsFillerComponent = ({ isLoading }) =>
{
  return <View style={tw`w-full items-center px-5 h-48`}>
    <View style={tw`w-full h-full justify-center bg-neutral-100 border border-neutral-300 rounded-3`}>
      <Text style={[tw`text-center text-sm leading-relaxed text-gray-600`, { fontFamily: "Poppins-Regular" }]}>
        {isLoading ? "" : "There are no nearby jobs"}
      </Text>
    </View>
  </View>
}

const FeaturedJobsElement = ({ featuredJobs }) =>
{
  return <View style={tw`px-5 mb-14`}>
    {featuredJobs && featuredJobs.length ? featuredJobs?.map(f => (
      <Pressable
        key={f._id}
        // onPress={() => { }}
        style={({ pressed }) => tw`my-1 w-full bg-white border border-gray-200 rounded-3 py-3 px-5 ${ pressed ? '' : '' }`}>
        <Text style={[tw`text-black text-[14px]`, { fontFamily: "Poppins-Regular" }]}>{f.title}</Text>
      </Pressable>
    )
    ) : <Text>There are no featured jobs</Text>
    }
  </View>
}



const LoadingElement = ({ height, width }) =>
{

  return <View style={[tw`bg-gray-200 items-center justify-center px-5 h-32 my-4 w-full`]}>
    <View style={tw``}>

    </View>
  </View>
}