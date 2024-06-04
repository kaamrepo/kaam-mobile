import React, {useCallback, useEffect, useState, useRef, useMemo} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import tw from 'twrnc';
import {RadioButton, Modal, Portal, Provider} from 'react-native-paper';
import FilterIconSVG from '../../../../assets/svgs/FilterIcon.svg';
import Icon, {Icons} from '../../../../components/Icons';
import useStaffStore from '../../../../store/staff.store';
import useLoaderStore from '../../../../store/loader.store';
import useCategoriesStore from '../../../../store/categories.store';
import useLoginStore from '../../../../store/authentication/login.store';
import { debounce } from 'lodash';

export const SeeAllStaffs = ({navigation}) => {
  const {getStaff} = useStaffStore();
  const {categories} = useCategoriesStore();
  const {isLoading} = useLoaderStore();
  const {loggedInUser} = useLoginStore();
  const limit = 10;
  const loadMoreRef = useRef(true);
  const [skip, setSkip] = useState(0);
  const [data, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedPills, setSelectedPills] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchData(0);
  }, []);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const hideModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const showModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleSearch = useCallback(
    debounce((text) => {
      setSearchInput(text);
      setSkip(0);
      setData([]);
      loadMoreRef.current = true; // Reset the load more flag
      fetchData(0, text);
    }, 500),
    []
  );

  const handlePillPress = useCallback(pill => {
    setSelectedPills(prevSelectedPills => {
      const newSelectedPills = prevSelectedPills.includes(pill)
        ? prevSelectedPills.filter(item => item !== pill)
        : [...prevSelectedPills, pill];
      setSkip(0);
      setData([]);
      loadMoreRef.current = true; // Reset the load more flag
      fetchData(0);
      return newSelectedPills;
    });
  }, []);

  const renderCategories = useMemo(() => {
    return (
      <View style={tw`flex flex-wrap flex-row px-4 mb-2`}>
       {categories?.map(item => {
  return (
    <Pressable
      key={item._id}
      onPress={() => handlePillPress(item._id)}
      style={tw`px-4 py-2 m-1 rounded-full ${
        selectedPills.includes(item._id) ? `bg-blue-500` : 'bg-gray-200'
      }`}>
      <Text
        style={tw`text-sm ${
          selectedPills.includes(item._id) ? 'text-white' : 'text-black'
        }`}>
        {item?.name}
      </Text>
    </Pressable>

  );
})}

      </View>
    );
  }, [categories, selectedPills, handlePillPress]);

  const listFooterComponent = useCallback(() => {
    return <ActivityIndicator size={'large'} style={{marginVertical: 16}} />;
  }, []);

  const ItemSeparatorComponent = useCallback(() => {
    return <View style={tw`justify-center`} />;
  }, []);

  const onEndReached = useCallback(
    debounce(async () => {
      if (loadMoreRef.current && !isLoading) {
        await fetchData(skip);
      }
    }, 500),
    [fetchData, skip, isLoading]
  );

  const fetchData = useCallback(
    async (skipValue, searchText = searchInput, selectedCategories = selectedPills) => {
      if (!loadMoreRef.current) return; // Prevent API call if no more data
      try {
        const payload = {
          skip: skipValue,
          limit,
          text: searchText,
          categories: selectedCategories,
          excludeIds: [loggedInUser?._id],
          exclude: '_id'
        };
        const result = await getStaff(payload);
        if (result?.length === 0) {
          loadMoreRef.current = false; // No more data to load
        } else {
          setData(prevData => {
            // Use a Set to store unique _id values of existing data
            const idSet = new Set(prevData.map(item => item._id));
            // Filter out items with IDs already present in the Set
            const newData = result.filter(item => !idSet.has(item._id));
            // Concatenate unique data with previous data
            return [...prevData, ...newData];
          });
          setSkip(skipValue + limit);
        }
      } catch (error) {
        console.log('error', error);
      }
    },
    [limit, getStaff, searchInput, selectedPills, loggedInUser]
  );
  

  const renderItem = useCallback(
    ({item, index}) => (
      <Pressable
        onPress={() => {
          navigation.navigate('EmployeeDetails', {user: item});
        }}
        key={index}
        style={({pressed}) => [
          tw`my-1 flex-row justify-between border border-gray-200 rounded-3 py-3 px-5 ${
            pressed ? 'bg-green-100/10 border-0' : 'bg-white'
          }`,
        ]}>
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
            style={[
              tw`text-black text-[14px]`,
              {fontFamily: 'Poppins-SemiBold'},
            ]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item?.firstname}
          </Text>
          <Text
            style={[
              tw`text-neutral-600 text-[14px]`,
              {fontFamily: 'Poppins-Regular'},
            ]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item?.lastname}
          </Text>
        </View>
        <View style={tw`flex`}>
          <Text
            style={[
              tw`text-black text-[14px]`,
              {fontFamily: 'Poppins-SemiBold'},
            ]}>
            {item?.address?.city || 'City - NA'}/
            {item?.address?.state || 'State - NA'}
          </Text>
        </View>
      </Pressable>
    ),
    [navigation],
  );

  return (
    <Provider>
      <SafeAreaView style={tw`flex-1 bg-slate-50 mt-10`} edges={['top']}>
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
              onChangeText={wildString => handleSearch(wildString)}
            />
          </View>
          <TouchableOpacity
            onPress={showModal}
            style={tw`w-10 h-10 bg-[#F2F2F3] rounded-lg items-center justify-center ml-2 shadow-2xl`}>
            <FilterIconSVG />
          </TouchableOpacity>
        </View>
        {categories?.length != 0 ? (
          renderCategories
        ) : (
          <View style={tw`justify-center items-center p-5`}>
            <Text style={[tw`text-black`, {fontFamily: 'Poppins-Regular'}]}>
              No Categories available
            </Text>
            <Text style={[tw`text-black`, {fontFamily: 'Poppins-Regular'}]}>
              Contact Admin to add categories
            </Text>
          </View>
        )}

        <FlatList
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isLoading ? listFooterComponent : null}
        />

        <Portal>
          <Modal
            visible={isModalVisible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalContainer}>
            <View style={tw`bg-white p-4 rounded-lg shadow-md w-80`}>
              <Text style={tw`font-bold text-lg mb-2`}>Select an Option:</Text>
              <View style={tw`flex-row items-center mb-2`}>
                <RadioButton
                  value="male"
                  status={selectedOption === 'male' ? 'checked' : 'unchecked'}
                  onPress={() => setSelectedOption('male')}
                />
                <Text style={tw`ml-2`}>Male</Text>
              </View>
              <View style={tw`flex-row items-center mb-2`}>
                <RadioButton
                  value="female"
                  status={selectedOption === 'female' ? 'checked' : 'unchecked'}
                  onPress={() => setSelectedOption('female')}
                />
                <Text style={tw`ml-2`}>Female</Text>
              </View>
              <TouchableOpacity style={tw`mt-4`} onPress={hideModal}>
                <Text style={tw`text-blue-500`}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </Portal>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
