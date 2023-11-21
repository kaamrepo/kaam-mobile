import {Text, View, TextInput, TouchableOpacity,Pressable,Image,ScrollView} from 'react-native';
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Feather';
import FilterIconSVG from '../../assets/svgs/FilterIcon.svg';
import Icon, { Icons } from '../../components/Icons';
import Image1 from '../../assets/images/browse-jobs.png';
import Image2 from '../../assets/images/IntroScreenJobsAndInvitations.png';
import Image3 from '../../assets/images/search-dream-job.png';

const SeeAll = ({navigation,isLoading}) => {
    const featuredJobs = {
        total: 3,
        skip: 0,
        limit: 0,
        data: [
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
            image: Image3,
            title: 'Sr tester',
            description: 'Automation',
            value: 576778,
            location: 'Mumbai',
          },{
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
            image: Image3,
            title: 'Sr tester',
            description: 'Automation',
            value: 576778,
            location: 'Mumbai',
          },{
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
            image: Image3,
            title: 'Sr tester',
            description: 'Automation',
            value: 576778,
            location: 'Mumbai',
          },{
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
            image: Image3,
            title: 'Sr tester',
            description: 'Automation',
            value: 576778,
            location: 'Mumbai',
          },{
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
            image: Image3,
            title: 'Sr tester',
            description: 'Automation',
            value: 576778,
            location: 'Mumbai',
          },{
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
            image: Image3,
            title: 'Sr tester',
            description: 'Automation',
            value: 576778,
            location: 'Mumbai',
          },{
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
            image: Image3,
            title: 'Sr tester',
            description: 'Automation',
            value: 576778,
            location: 'Mumbai',
          },{
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
            image: Image3,
            title: 'Sr tester',
            description: 'Automation',
            value: 576778,
            location: 'Mumbai',
          },{
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
            image: Image3,
            title: 'Sr tester',
            description: 'Automation',
            value: 576778,
            location: 'Mumbai',
          },{
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
            image: Image3,
            title: 'Sr tester',
            description: 'Automation',
            value: 576778,
            location: 'Mumbai',
          },{
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
            image: Image3,
            title: 'Sr tester',
            description: 'Automation',
            value: 576778,
            location: 'Mumbai',
          },{
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
            image: Image3,
            title: 'Sr tester',
            description: 'Automation',
            value: 576778,
            location: 'Mumbai',
          },{
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
            image: Image3,
            title: 'Sr tester',
            description: 'Automation',
            value: 576778,
            location: 'Mumbai',
          },{
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
            image: Image3,
            title: 'Sr tester',
            description: 'Automation',
            value: 576778,
            location: 'Mumbai',
          },{
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
            image: Image3,
            title: 'Sr tester',
            description: 'Automation',
            value: 576778,
            location: 'Mumbai',
          },
        ]
      };
    const handleBackPress = () => {
        // Handle back button press logic here
        console.log('Back button pressed!');
        navigation.goBack();
      };
      if (isLoading) {
        return (
          <>
            {/* <View style={tw`flex-row justify-between items-center mt-5 mb-4 mx-5`}>
              <Text style={[tw`text-black text-xl`, {fontFamily: 'Poppins-Bold'}]}>
                {dashboardTranslation[language]['Featured Jobs']}
              </Text>
              <Text
                style={[
                  tw`text-center text-sm leading-relaxed text-gray-600`,
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                {dashboardTranslation[language]['See all']}
              </Text>
            </View> */}
            <View style={tw`px-5 mb-14 w-full`}>
              <View
                style={[
                  tw`w-full h-30 bg-gray-200 rounded-3 items-center justify-center`,
                ]}>
                <Text
                  style={[
                    tw`text-neutral-700 text-sm`,
                    {fontFamily: 'Poppins-Regular'},
                  ]}>
                  Fetching jobs...
                </Text>
              </View>
            </View>
          </>
        );
      }
      if (featuredJobs && featuredJobs?.total == 0) {
        return (
          <>
            {/* <View style={tw`flex-row justify-between items-center mt-5 mb-4 mx-5`}>
              <Text style={[tw`text-black text-xl`, {fontFamily: 'Poppins-Bold'}]}>
                {dashboardTranslation[language]['Featured Jobs']}
              </Text>
              <Text
                style={[
                  tw`text-center text-sm leading-relaxed text-gray-600`,
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                {dashboardTranslation[language]['See all']}
              </Text>
            </View> */}
            <View style={tw`px-5 mb-14 w-full`}>
              <View
                style={tw`w-full h-30 bg-gray-200 rounded-3 items-center justify-center`}>
                <Text
                  style={[
                    tw`text-neutral-700 text-sm`,
                    {fontFamily: 'Poppins-Regular'},
                  ]}>
                  There are no featured jobs
                </Text>
              </View>
            </View>
          </>
        );
      }
  console.log('in the seall page');
  return (
    <SafeAreaView style={tw`flex-1 bg-slate-50`} edges={['top']}>
   <Pressable
              onPress={handleBackPress}
              style={({ pressed }) => [
                tw`p-2 rounded-full ${ pressed ? 'bg-black/20' : '' }`,
              ]}>
              <Icon type={Icons.Ionicons}
                name="chevron-back"
                size={25}
                color={'black'} />
            </Pressable>
      <View style={tw`flex-row items-center mb-4 mx-5 mt-2`}>
        <View
          style={tw`flex-1 bg-[#F2F2F3] rounded-lg h-10 flex-row items-center pr-2 shadow-2xl`}>
          <Icon name="search" size={20} color="gray" style={tw`mx-2`} />
          <TextInput
            style={tw`flex-1 text-sm text-black`}
            placeholder="Search"
            placeholderTextColor="gray"
          />
        </View>
        <TouchableOpacity
          style={tw`w-10 h-10 bg-[#F2F2F3] rounded-lg items-center justify-center ml-2 shadow-2xl`}>
          <FilterIconSVG />
        </TouchableOpacity>
      </View>
      <View style={tw`px-5 mb-14`}>
      <ScrollView>
        {featuredJobs?.data?.map((f,index) => (
          <Pressable
            key={index}
            onPress={() => {}}
            style={({pressed}) =>
              tw`my-1 w-full flex-row justify-between border border-gray-200 rounded-3 py-3 px-5 ${
                pressed ? 'bg-green-100/10' : 'bg-white'
              }`
            }>
            <View style={tw`h-10 w-10 flex-2`}>
              <Image
                source={f.image}
                style={tw`h-10 w-10 rounded-xl`}
                resizeMode="contain"
              />
            </View>
            <View style={tw` flex-4`}>
              <Text
                style={[
                  tw`text-black text-[14px]`,
                  {fontFamily: 'Poppins-SemiBold'},
                ]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {f.title}
              </Text>
              <Text
                style={[
                  tw`text-neutral-600 text-[14px]`,
                  {fontFamily: 'Poppins-Regular'},
                ]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {f.description}
              </Text>
            </View>
            <View style={tw` flex-2`}>
              <Text
                style={[
                  tw`text-black text-[14px]`,
                  {fontFamily: 'Poppins-SemiBold'},
                ]}>
                ₹: {f.value}
              </Text>
              <Text
                style={[
                  tw`text-neutral-600 text-[14px]`,
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                {f.location}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default SeeAll;
