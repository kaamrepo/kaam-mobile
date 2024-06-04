import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  Modal,
  FlatList,
} from 'react-native';
import tw from 'twrnc';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RadioButton} from 'react-native-paper';
import FilterIconSVG from '../../../../assets/svgs/FilterIcon.svg';
import Icon,{Icons} from '../../../../components/Icons';
import useJobStore from '../../../../store/jobs.store';
const AllJobsFlatlist = ({navigation, isLoading, ...props}) => {
  const {getSearchedJobs, clearsearchedJobs, searchedJobs} = useJobStore();
  const [searchDefaultQuery, setDefaultSearchQuery] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const keyExtractor = item => item._id;
  const [page, setPage] = useState(0);


  useEffect(() => {
    clearsearchedJobs();
    setDefaultSearchQuery({
      type: props?.route?.params.type,
      coordinates: props?.route?.params?.coordinates,
    });
    switch (props?.route?.params.type) {
      case 'nearby':
        setDefaultSearchQuery({
          type: props?.route?.params.type,
          coordinates: props?.route?.params?.coordinates,
        });
        getSearchDatahandler();
        break;

      default:
        setDefaultSearchQuery({
          type: props?.route?.params.type,
        });
        break;
    }
  }, [props?.route?.params.type, props?.route?.params?.coordinates,page]);

  const getSearchDatahandler =()=>{
    const skip = page * 10;
      const limit = 10;
      getSearchedJobs(skip, limit, {
        type: props?.route?.params.type,
        coordinates: props?.route?.params?.coordinates,
      });

  }

  const handleSearch = async text => {
    try {
      clearsearchedJobs();
      switch (props?.route?.params.type) {
        case 'nearby':
          setDefaultSearchQuery({
            type: props?.route?.params.type,
            coordinates: props?.route?.params?.coordinates,
            searchText: text,
          });
          getSearchedJobs(0, 10, {
            type: props?.route?.params.type,
            coordinates: props?.route?.params?.coordinates,
            searchText: text,
          });
          break;

        default:
          break;
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };
  const handleOptionChange = async value => {
    setSelectedOption(value);
    const updatedSearchQuery = {
      ...searchDefaultQuery,
      salary:value
    };
    await setDefaultSearchQuery(updatedSearchQuery);
    getSearchedJobs(0,10,updatedSearchQuery)

  };

  const handleBackPress = () => {
    navigation.goBack();
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

  // Render function for each item in the FlatList
  const renderItem = ({item, index}) => {
    return(
    <Pressable
      key={item?._id}
      onPress={() => {
        navigation.navigate('ApplyNow', {jobDetails: item});
      }}
      style={({pressed}) =>
        tw`my-1 flex-row justify-between border border-gray-200 rounded-3 py-3 px-5 ${
          pressed ? 'bg-green-100/10' : 'bg-white'
        }`
      }>
      <View style={tw`h-auto w-auto flex`}>
        {item?.profilepic ? (
          <Image source={item?.profilepic} style={tw`h-12 w-12 rounded-xl`} />
        ) : (
          <Icon
            type={Icons.Ionicons}
            name={'person-circle-outline'}
            size={55}
            color={'green'}
          />
        )}
      </View>
      <View style={tw`flex w-35`}>
        <Text
          style={[tw`text-black text-[14px]`, {fontFamily: 'Poppins-SemiBold'}]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item?.position}
        </Text>
        <Text
          style={[
            tw`text-neutral-600 text-[14px]`,
            {fontFamily: 'Poppins-Regular'},
          ]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item?.description}
        </Text>
      </View>
      <View style={tw` flex`}>
        <Text
          style={[
            tw`text-black text-[14px]`,
            {fontFamily: 'Poppins-SemiBold'},
          ]}>
          ₹: {item?.salary}
        </Text>
        <Text
          style={[
            tw`w-30 text-neutral-600 text-[14px]`,
            {fontFamily: 'Poppins-Regular'},
          ]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item?.location?.name}
        </Text>
      </View>
    </Pressable>
  );
        }

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
            onChangeText={text => handleSearch(text)}
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
                  value="1"
                  status={
                    selectedOption === 1 ? 'checked' : 'unchecked'
                  }
                  onPress={() => handleOptionChange(1)}
                />
                <Text style={tw`ml-2`}>Salary Low to High</Text>
              </View>

              <View style={tw`flex-row items-center mb-2`}>
                <RadioButton
                  value="-1"
                  status={
                    selectedOption === -1 ? 'checked' : 'unchecked'
                  }
                  onPress={() => handleOptionChange(-1)}
                />
                <Text style={tw`ml-2`}>Salary High to Low</Text>
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
          data={searchedJobs}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          extraData={selectedItem} // Re-render the FlatList when selectedItem changes
          onPress={() => setSelectedItem(item._id)} // Handle item press
          onEndReached={()=>{return setPage((prevPage) => prevPage + 1);}}
          onEndReachedThreshold={0.2}
        />
      </View>
    </SafeAreaView>
  );
};
export default AllJobsFlatlist;
