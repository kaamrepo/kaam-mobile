import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import tw from 'twrnc';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RadioButton} from 'react-native-paper';
import useStaffStore from '../../../../store/staff.store';
import FilterIconSVG from '../../../../assets/svgs/FilterIcon.svg';
import Icon, {Icons} from '../../../../components/Icons';
import useLoaderStore from '../../../../store/loader.store';

export const SeeAllStaffs = ({navigation, language}) => {
  const {isLoading, setLoading} = useLoaderStore();
  const {stafflist, getStaff, clearUsers, appendStaff} = useStaffStore(); // Assuming appendStaff adds new staff to the existing list
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    clearUsers();
    loadStaffs(0);
  }, []);

  const loadStaffs = async (page) => {
    setLoading(true);
    await getStaff(page, 10);
    setLoading(false);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleSearch = useCallback(text => {
    setSearchQuery(text);
    clearUsers();
    loadStaffs(0);
  }, []);

  const handleOptionChange = option => {
    setSelectedOption(option);
    // Assuming filter logic here based on selected option
    clearUsers();
    loadStaffs(0);
    hideModal();
  };

  const loadMoreStaffs = () => {
    setPage(prevPage => {
      const nextPage = prevPage + 1;
      loadStaffs(nextPage);
      return nextPage;
    });
  };

  const filteredStaffList = useMemo(() => {
    return stafflist?.filter(staff =>
      staff.firstname.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, stafflist]);

  const renderItem = ({item}) => {
    return (
      <Pressable
        key={item._id}
        style={({pressed}) =>
          tw`my-1 flex-row justify-between border border-gray-200 rounded-3 py-3 px-5 ${
            pressed ? 'bg-green-100/10' : 'bg-white'
          }`
        }>
        <View style={tw`h-auto w-auto flex`}>
          {item.profilepic ? (
            <Image source={item.profilepic} style={tw`h-12 w-12 rounded-xl`} />
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
            style={[
              tw`text-black text-[14px]`,
              {fontFamily: 'Poppins-SemiBold'},
            ]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.firstname}
          </Text>
          <Text
            style={[
              tw`text-neutral-600 text-[14px]`,
              {fontFamily: 'Poppins-Regular'},
            ]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.lastname}
          </Text>
        </View>
        <View style={tw`flex`}>
          <Text
            style={[
              tw`text-black text-[14px]`,
              {fontFamily: 'Poppins-SemiBold'},
            ]}>
            {item.address?.city || 'City - NA'}/
            {item.address?.state || 'State - NA'}
          </Text>
        </View>
      </Pressable>
    );
  };

  const renderLoader = () => (
    <View style={tw`flex-1 justify-center items-center`}>
      <ActivityIndicator size="large" color="gray" />
      <Text
        style={[
          tw`text-neutral-700 text-sm mt-2`,
          {fontFamily: 'Poppins-Regular'},
        ]}>
        Fetching jobs...
      </Text>
    </View>
  );

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
          <TextInput
            style={tw`flex-1 text-sm text-black`}
            placeholder="Search"
            placeholderTextColor="gray"
            onChangeText={handleSearch}
            value={searchQuery}
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
              <Text style={tw`font-bold text-lg mb-2`}>Select an Option:</Text>
              <View style={tw`flex-row items-center mb-2`}>
                <RadioButton
                  value="1"
                  status={selectedOption === 1 ? 'checked' : 'unchecked'}
                  onPress={() => handleOptionChange(1)}
                />
                <Text style={tw`ml-2`}>Male</Text>
              </View>
              <View style={tw`flex-row items-center mb-2`}>
                <RadioButton
                  value="-1"
                  status={selectedOption === -1 ? 'checked' : 'unchecked'}
                  onPress={() => handleOptionChange(-1)}
                />
                <Text style={tw`ml-2`}>Female</Text>
              </View>
              <TouchableOpacity onPress={hideModal} style={tw`mt-4`}>
                <Text style={tw`text-blue-500`}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      {!stafflist || stafflist.length === 0 ? (
          <CommonMessageForStaffs
            title="There are no Staffs"
            language={language}
          />
        ) : (
          ''
        )}
      <View style={tw`mb-14 flex-1`}>
        {isLoading ? (
          renderLoader()
        ) : (
          <FlatList
            data={filteredStaffList}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            onEndReached={loadMoreStaffs}
            onEndReachedThreshold={0.2}
          />
        )}
       
      </View>
    </SafeAreaView>
  );
};

function CommonMessageForStaffs({title, language}) {
  return (
    <View>
      <View style={tw`flex-row justify-between items-center mb-4 mx-5`}>
        {/* <Text style={[tw`text-black text-xl`, {fontFamily: 'Poppins-Bold'}]}>
          {'Nearby Staff'}
        </Text> */}
      </View>
      <View style={tw`w-full px-5`}>
        <View
          style={tw`bg-gray-200 w-full h-48 flex flex-row gap-3 rounded-3 items-center justify-center`}>
          {title === 'Please turn on your location' && (
            <Icon
              type={Icons.MaterialIcons}
              name={'location-off'}
              size={25}
              style={tw`text-red-600`}
            />
          )}
          <Text
            style={[
              tw`text-neutral-700 text-sm`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
}
