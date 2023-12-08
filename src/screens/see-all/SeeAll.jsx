import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import tw from 'twrnc';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RadioButton} from 'react-native-paper';
import FilterIconSVG from '../../assets/svgs/FilterIcon.svg';
import Icon, {Icons} from '../../components/Icons';
import Image1 from '../../assets/images/browse-jobs.png';
import Image2 from '../../assets/images/IntroScreenJobsAndInvitations.png';
import Image3 from '../../assets/images/search-dream-job.png';

const SeeAll = ({navigation, isLoading}) => {
  const featuredJobs = {
    total: 3,
    skip: 0,
    limit: 0,
    data: [
      {
        _id: 'fghjkl',
        image: Image1,
        title: 'Jr Executive',
        description: 'Tester',
        value: 960000,
        location: 'Delhi',
      },
      {
        _id: 'fghgjkl',
        image: Image2,
        title: 'Jr Engineer',
        description: 'Devloper',
        value: 98765,
        location: 'Pune',
      },
      {
        _id: 'fghjksl',
        image: Image3,
        title: 'Sr tester',
        description: 'Automation',
        value: 576778,
        location: 'Mumbai',
      },
      {
        _id: 'fghjkl',
        image: Image1,
        title: 'Jr Executive',
        description: 'Tester',
        value: 960000,
        location: 'Delhi',
      },
      {
        _id: 'fghgjkl',
        image: Image2,
        title: 'Jr Engineer',
        description: 'Devloper',
        value: 98765,
        location: 'Pune',
      },
      {
        _id: 'fghjksl',
        image: Image3,
        title: 'Sr tester',
        description: 'Automation',
        value: 576778,
        location: 'Mumbai',
      },
      {
        _id: 'fghjkl',
        image: Image1,
        title: 'Jr Executive',
        description: 'Tester',
        value: 960000,
        location: 'Delhi',
      },
      {
        _id: 'fghgjkl',
        image: Image2,
        title: 'Jr Engineer',
        description: 'Devloper',
        value: 98765,
        location: 'Pune',
      },
      {
        _id: 'fghjksl',
        image: Image3,
        title: 'Sr tester',
        description: 'Automation',
        value: 576778,
        location: 'Mumbai',
      },
      {
        _id: 'fghjkl',
        image: Image1,
        title: 'Jr Executive',
        description: 'Tester',
        value: 960000,
        location: 'Delhi',
      },
      {
        _id: 'fghgjkl',
        image: Image2,
        title: 'Jr Engineer',
        description: 'Devloper',
        value: 98765,
        location: 'Pune',
      },
      {
        _id: 'fghjksl',
        image: Image3,
        title: 'Sr tester',
        description: 'Automation',
        value: 576778,
        location: 'Mumbai',
      },
      {
        _id: 'fghjkl',
        image: Image1,
        title: 'Jr Executive',
        description: 'Tester',
        value: 960000,
        location: 'Delhi',
      },
      {
        _id: 'fghgjkl',
        image: Image2,
        title: 'Jr Engineer',
        description: 'Devloper',
        value: 98765,
        location: 'Pune',
      },
      {
        _id: 'fghjksl',
        image: Image3,
        title: 'Sr tester',
        description: 'Automation',
        value: 576778,
        location: 'Mumbai',
      },
      {
        _id: 'fghjkl',
        image: Image1,
        title: 'Jr Executive',
        description: 'Tester',
        value: 960000,
        location: 'Delhi',
      },
      {
        _id: 'fghgjkl',
        image: Image2,
        title: 'Jr Engineer',
        description: 'Devloper',
        value: 98765,
        location: 'Pune',
      },
      {
        _id: 'fghjksl',
        image: Image3,
        title: 'Sr tester',
        description: 'Automation',
        value: 576778,
        location: 'Mumbai',
      },
      {
        _id: 'fghjkl',
        image: Image1,
        title: 'Jr Executive',
        description: 'Tester',
        value: 960000,
        location: 'Delhi',
      },
      {
        _id: 'fghgjkl',
        image: Image2,
        title: 'Jr Engineer',
        description: 'Devloper',
        value: 98765,
        location: 'Pune',
      },
      {
        _id: 'fghjksl',
        image: Image3,
        title: 'Sr tester',
        description: 'Automation',
        value: 576778,
        location: 'Mumbai',
      },
      {
        _id: 'fghjkl',
        image: Image1,
        title: 'Jr Executive',
        description: 'Tester',
        value: 960000,
        location: 'Delhi',
      },
      {
        _id: 'fghgjkl',
        image: Image2,
        title: 'Jr Engineer',
        description: 'Devloper',
        value: 98765,
        location: 'Pune',
      },
      {
        _id: 'fghjksl',
        image: Image3,
        title: 'Sr tester',
        description: 'Automation',
        value: 576778,
        location: 'Mumbai',
      },
      {
        _id: 'fghjkl',
        image: Image1,
        title: 'Jr Executive',
        description: 'Tester',
        value: 960000,
        location: 'Delhi',
      },
      {
        _id: 'fghgjkl',
        image: Image2,
        title: 'Jr Engineer',
        description: 'Devloper',
        value: 98765,
        location: 'Pune',
      },
      {
        _id: 'fghjksl',
        image: Image3,
        title: 'Sr tester',
        description: 'Automation',
        value: 576778,
        location: 'Mumbai',
      },
      {
        _id: 'fghjkl',
        image: Image1,
        title: 'Jr Executive',
        description: 'Tester',
        value: 960000,
        location: 'Delhi',
      },
      {
        _id: 'fghgjkl',
        image: Image2,
        title: 'Jr Engineer',
        description: 'Devloper',
        value: 98765,
        location: 'Pune',
      },
      {
        _id: 'fghjksl',
        image: Image3,
        title: 'Sr tester',
        description: 'Automation',
        value: 576778,
        location: 'Mumbai',
      },
      {
        _id: 'fghjkl',
        image: Image1,
        title: 'Jr Executive',
        description: 'Tester',
        value: 960000,
        location: 'Delhi',
      },
      {
        _id: 'fghgjkl',
        image: Image2,
        title: 'Jr Engineer',
        description: 'Devloper',
        value: 98765,
        location: 'Pune',
      },
      {
        _id: 'fghjksl',
        image: Image3,
        title: 'Sr tester',
        description: 'Automation',
        value: 576778,
        location: 'Mumbai',
      },
      {
        _id: 'fghjkl',
        image: Image1,
        title: 'Jr Executive',
        description: 'Tester',
        value: 960000,
        location: 'Delhi',
      },
      {
        _id: 'fghgjkl',
        image: Image2,
        title: 'Jr Engineer',
        description: 'Devloper',
        value: 98765,
        location: 'Pune',
      },
      {
        _id: 'fghjksl',
        image: Image3,
        title: 'Sr tester',
        description: 'Automation',
        value: 576778,
        location: 'Mumbai',
      },
      {
        _id: 'fghjkl',
        image: Image1,
        title: 'Jr Executive',
        description: 'Tester',
        value: 960000,
        location: 'Delhi',
      },
      {
        _id: 'fghgjkl',
        image: Image2,
        title: 'Jr Engineer',
        description: 'Devloper',
        value: 98765,
        location: 'Pune',
      },
      {
        _id: 'fghjksl',
        image: Image3,
        title: 'Sr tester',
        description: 'Automation',
        value: 576778,
        location: 'Mumbai',
      },
      {
        _id: 'fghjkl',
        image: Image1,
        title: 'Jr Executive',
        description: 'Tester',
        value: 960000,
        location: 'Delhi',
      },
      {
        _id: 'fghgjkl',
        image: Image2,
        title: 'Jr Engineer',
        description: 'Devloper',
        value: 98765,
        location: 'Pune',
      },
      {
        _id: 'fghjksl',
        image: Image3,
        title: 'Sr tester',
        description: 'Automation',
        value: 576778,
        location: 'Mumbai',
      },
      {
        _id: 'fghjkl',
        image: Image1,
        title: 'Jr Executive',
        description: 'Tester',
        value: 960000,
        location: 'Delhi',
      },
      {
        _id: 'fghgjkl',
        image: Image2,
        title: 'Jr Engineer',
        description: 'Devloper',
        value: 98765,
        location: 'Pune',
      },
      {
        _id: 'fghjksl',
        image: Image3,
        title: 'Sr tester',
        description: 'Automation',
        value: 576778,
        location: 'Mumbai',
      },
    ],
  };
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Option1');

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };
  const handleOptionChange = value => {
    setSelectedOption(value);
  };
  const handleBackPress = () => {
    // Handle back button press logic here
    console.log('Back button pressed!');
    navigation.goBack();
  };
  const handleBookmarkPress = () => {
    // Handle bookmark button press logic here
    console.log('Bookmark button pressed!');
  };
  if (isLoading) {
    return (
      <>
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
  return (
    <SafeAreaView style={tw`flex-1 bg-slate-50`} edges={['top']}>
      <View style={tw`flex-row items-center mb-4 mt-2`}>
        <Pressable
          onPress={handleBackPress}
          style={({pressed}) => [
            tw`p-2 rounded-full ${pressed ? 'bg-black/20' : ''}`,
          ]}>
          <Icon
            type={Icons.Ionicons}
            name="chevron-back"
            size={25}
            color={'black'}
          />
        </Pressable>
        <View
          style={tw`px-2 flex-1 bg-[#F2F2F3] rounded-lg h-10 flex-row items-center pr-2 shadow-2xl`}>
          <Icon name="search" size={20} color="gray" style={tw`mx-2`} />
          <Icon
            type={Icons.Ionicons}
            name="search-outline"
            size={20}
            color={'black'}
          />
          <TextInput
            style={tw`flex-1 text-sm text-black`}
            placeholder="Search"
            placeholderTextColor="gray"
          />
        </View>
        <TouchableOpacity
          onPress={showModal}
          style={tw`w-10 h-10 bg-[#F2F2F3] rounded-lg items-center justify-center ml-2 shadow-2xl`}>
          <FilterIconSVG />
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={hideModal}
          style={tw`shadow-2xl`}>
          <View style={tw`flex-1 justify-center items-center shadow-2xl`}>
            <View style={tw`bg-white p-4 rounded-lg shadow-md w-80`}>
              {/* Add your filter options here */}
              <Text style={tw`font-bold text-lg mb-2`}>Select an Option:</Text>

              {/* Radio buttons */}
              <View style={tw`flex-row items-center mb-2`}>
                <RadioButton
                  value="Option1"
                  status={
                    selectedOption === 'Option1' ? 'checked' : 'unchecked'
                  }
                  onPress={() => handleOptionChange('Option1')}
                />
                <Text style={tw`ml-2`}>Salary High to Low</Text>
              </View>

              <View style={tw`flex-row items-center mb-2`}>
                <RadioButton
                  value="Option2"
                  status={
                    selectedOption === 'Option2' ? 'checked' : 'unchecked'
                  }
                  onPress={() => handleOptionChange('Option2')}
                />
                <Text style={tw`ml-2`}>Salary Low to Low</Text>
              </View>
              <View style={tw`flex-row items-center mb-2`}>
                <RadioButton
                  value="Option3"
                  status={
                    selectedOption === 'Option3' ? 'checked' : 'unchecked'
                  }
                  onPress={() => handleOptionChange('Option3')}
                />
                <Text style={tw`ml-2`}>Job Posting Newest</Text>
              </View>
              <View style={tw`flex-row items-center mb-2`}>
                <RadioButton
                  value="Option4"
                  status={
                    selectedOption === 'Option4' ? 'checked' : 'unchecked'
                  }
                  onPress={() => handleOptionChange('Option4')}
                />
                <Text style={tw`ml-2`}>Job Posting Oldest</Text>
              </View>

              {/* Close modal button */}
              <TouchableOpacity onPress={hideModal} style={tw`mt-4`}>
                <Text style={tw`text-blue-500`}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <View style={tw`mb-14`}>
        <ScrollView>
          {featuredJobs?.data?.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => {
                console.log('pressed');
                navigation.navigate('ApplyNow', {jobDetails: item});
              }}
              style={({pressed}) =>
                tw`my-1 w-full flex-row justify-between border border-gray-200 rounded-3 py-3 px-5 ${
                  pressed ? 'bg-green-100/10' : 'bg-white'
                }`
              }>
              <View style={tw`h-10 w-10 flex-2`}>
                <Image
                  source={item.image}
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
                  {item.title}
                </Text>
                <Text
                  style={[
                    tw`text-neutral-600 text-[14px]`,
                    {fontFamily: 'Poppins-Regular'},
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.description}
                </Text>
              </View>
              <View style={tw` flex-2`}>
                <Text
                  style={[
                    tw`text-black text-[14px]`,
                    {fontFamily: 'Poppins-SemiBold'},
                  ]}>
                  ₹: {item.value}
                </Text>
                <Text
                  style={[
                    tw`text-neutral-600 text-[14px]`,
                    {fontFamily: 'Poppins-Regular'},
                  ]}>
                  {item.location}
                </Text>
              </View>
              <Pressable
                onPress={handleBookmarkPress}
                style={({pressed}) => [tw`p-0  rounded-full`]}>
                {({pressed}) => (
                  <Icon
                    type={Icons.Ionicons}
                    name="bookmark"
                    size={22}
                    color={pressed ? 'orange' : 'green'} // Adjust the colors accordingly
                  />
                )}
              </Pressable>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default SeeAll;
