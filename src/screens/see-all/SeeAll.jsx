import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  ScrollView,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import tw from 'twrnc';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RadioButton} from 'react-native-paper';
import FilterIconSVG from '../../assets/svgs/FilterIcon.svg';
import Icon, {Icons} from '../../components/Icons';
import Image1 from '../../assets/images/browse-jobs.png';
import Image2 from '../../assets/images/IntroScreenJobsAndInvitations.png';
import Image3 from '../../assets/images/search-dream-job.png';
import useJobStore from '../../store/dashboard.store';
import useLoginStore from '../../store/authentication/login.store';
import {dashboardTranslation} from '../dashboard/dashboardTranslation';
import {getCoordinates} from '../../helper/utils/getGeoLocation';

const SeeAll = ({navigation, isLoading, ...props}) => {
  const {loggedInUser, language} = useLoginStore();
  const {getSearchedJobs, clearsearchedJobs, searchedJobs} = useJobStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    getSearchedJobs(0, 10, {
      type: props?.route?.params.type,
      coordinates: props?.route?.params?.coordinates,
    });
  }, []);
  console.log('searchedJobs', searchedJobs);
  const handleSearch = async () => {
    try {
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
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
  // Check for empty data state
  if (
    !searchedJobs ||
    searchedJobs?.total === 0 ||
    Object.keys(searchedJobs)?.length === 0
  ) {
    console.log('in the no data view');
    return (
      <View style={tw`px-5 mb-14 w-full`}>
        <View
          style={tw`text-slate-950 w-full bg-gray-200 rounded-3 items-center justify-center`}>
          <Text
            style={[
              tw`text-slate-950 text-sm`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            There are no featured jobs
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2023/10/29/12/29/pumpkin-8349988_1280.jpg',
              }}
              style={tw`border-2 h-30 w-30`}
            />
          </Text>
        </View>
      </View>
    );
  }

  // State to track the selected item
  const [selectedItem, setSelectedItem] = useState(null);
  // Render function for each item in the FlatList
  const renderItem = ({item, index}) => (
    <Pressable
      key={index}
      onPress={() => {
        console.log('pressed');
        navigation.navigate('ApplyNow', {jobDetails: item});
      }}
      style={({pressed}) =>
        tw`my-1 w-full flex-row justify-between border border-gray-200 rounded-3 py-3 px-5 ${
          pressed ? 'bg-green-100/10' : 'bg-slate-200'
        }`
      }>
      {item.profilepic ? (
        <Image source={item?.profilepic} style={tw`h-10 w-10 rounded-xl`} />
      ) : (
        <Icon
          type={Icons.Ionicons}
          name={'person-circle-outline'}
          size={55}
          color={'green'}
        />
      )}
      {/* Rest of your UI components */}
    </Pressable>
  );

  // Key extractor function to get unique keys for each item
  const keyExtractor = item => item.id;

  // Flatlist test
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
            onChangeText={text => setSearchQuery(text)}
            onBlur={handleSearch}
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
        <FlatList
          data={searchedJobs?.data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          extraData={selectedItem} // Re-render the FlatList when selectedItem changes
          onPress={() => setSelectedItem(item._id)} // Handle item press
        />
      </View>
      {/* {searchedJobs?.data?.map((item, index) => (
            console.log
          ))} */}
    </SafeAreaView>
  );
};
export default SeeAll;
