import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import {
  Text,
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { RadioButton, Modal, Portal, Provider } from 'react-native-paper';
import FilterIconSVG from '../../../../assets/svgs/FilterIcon.svg';
import Icon, { Icons } from '../../../../components/Icons';
import useStaffStore from '../../../../store/staff.store';
import useLoaderStore from '../../../../store/loader.store';
import useCategoriesStore from '../../../../store/categories.store';
import useLoginStore from '../../../../store/authentication/login.store';
import { debounce } from 'lodash';

export const SeeAllStaffs = ({ route, navigation }) => {
  const { getStaff } = useStaffStore();
  const { categories } = useCategoriesStore();
  const { isLoading } = useLoaderStore();
  const { loggedInUser } = useLoginStore();
  const limit = 10;
  const loadMoreRef = useRef(true);
  const [skip, setSkip] = useState(0);
  const [data, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedPills, setSelectedPills] = useState(route.params?.category ? [route.params.category] : []);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchData(0, searchInput, selectedPills);
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
      fetchData(0, text, selectedPills);
    }, 500),
    [selectedPills] // Depend on selectedPills to capture the latest selection
  );

  const handlePillPress = useCallback((pill) => {
    setSelectedPills((prevSelectedPills) => {
      const newSelectedPills = prevSelectedPills.includes(pill)
        ? prevSelectedPills.filter((item) => item !== pill)
        : [...prevSelectedPills, pill];
      setSkip(0);
      setData([]);
      loadMoreRef.current = true; // Reset the load more flag
      fetchData(0, searchInput, newSelectedPills);
      return newSelectedPills;
    });
  }, [searchInput]); // Depend on searchInput to capture the latest search term

  const renderCategories = useMemo(() => {
    return (
      <View style={tw`flex flex-wrap flex-row px-4 mb-2`}>
        {categories?.map((item) => {
          return (
            <Pressable
              key={item._id}
              onPress={() => handlePillPress(item._id)}
              style={tw`px-4 py-2 m-1 rounded-full ${
                selectedPills.includes(item._id) ? 'bg-blue-500' : 'bg-gray-200'
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
    return <ActivityIndicator size={'large'} style={{ marginVertical: 16 }} />;
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
          exclude: '_id',
        };
      
        const result = await getStaff(payload);
        if (result?.length === 0) {
          loadMoreRef.current = false; // No more data to load
        } else {
          setData((prevData) => {
            const idSet = new Set(prevData?.map((item) => item?._id));
            const newData = result?.filter((item) => !idSet?.has(item._id));
            return [...prevData, ...newData];
          });
          setSkip(skipValue + limit);
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    },
    [limit, getStaff, searchInput, selectedPills, loggedInUser]
  );

  const renderItem = useCallback(
    ({ item, index }) => (
      <Pressable
        onPress={() => {
          console.log("item in press", item);
          navigation.navigate('EmployeeDetails', { user: item });
        }}
        key={item._id} // Assuming _id is unique and stable
        style={({ pressed }) =>
          tw`my-1 w-full border border-gray-200 rounded-3 px-2.5 pb-2.5 pt-4 relative overflow-hidden ${
            pressed ? 'bg-green-100/10' : 'bg-white'
          }`
        }>
        <View style={tw`flex-row items-start justify-between`}>
          <View style={tw`flex-row items-center`}>
            <View style={tw`h-10 w-10 mr-2`}>
              {item?.profilepic ? (
                <Image source={{ uri: item.profilepic }} style={tw`h-10 w-10 rounded`} />
              ) : (
                <Icon
                  type={Icons.Ionicons}
                  name={'person'}
                  size={45}
                  color={'green'}
                />
              )}
            </View>
            <View>
              <Text
                style={[
                  tw`text-black text-[14px]`,
                  { fontFamily: 'Poppins-SemiBold' },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item?.firstname}
              </Text>
              <Text
                style={[
                  tw`text-neutral-600 text-[14px]`,
                  { fontFamily: 'Poppins-Regular' },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item?.lastname}
              </Text>
            </View>
          </View>
          <Text
            style={[
              tw`text-white text-[12px] px-2 rounded-bl-xl bg-green-500`, // Adjust the color as per your theme
              { fontFamily: 'Poppins-SemiBold' },
            ]}>
            {`${item?.address?.city || "City - NA"} / ${item?.address?.state || "State - NA"}`}
          </Text>
        </View>
        <View style={tw`flex-row flex-wrap mt-2`}>
          {item?.tagsDetails?.length > 0 ? (
            <>
              {item.tagsDetails.map((tag) => (
                <Text
                  key={tag._id}
                  style={tw`bg-gray-200 text-black text-[12px] px-2 py-1 rounded-full mr-2 mb-2`}>
                  {tag.name}
                </Text>
              ))}
              
            </>
          ) : (
            <Text
              style={tw`text-gray-500 text-[12px]`}>
              No category selected by user
            </Text>
          )}
        </View>
      </Pressable>
    ),
    [navigation]
  );
  

  return (
    <Provider>
      <SafeAreaView style={tw`flex-1 bg-slate-50`} edges={['top']}>
        <View style={tw`flex-row items-center mb-4 mt-2`}>
          <Pressable
            onPress={handleBackPress}
            style={({ pressed }) => [
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
              onChangeText={(wildString) => handleSearch(wildString)}
            />
          </View>
          <TouchableOpacity
            onPress={showModal}
            style={tw`w-10 h-10 bg-[#F2F2F3] rounded-lg items-center justify-center ml-2 shadow-2xl`}>
            <FilterIconSVG />
          </TouchableOpacity>
        </View>
        {categories?.length !== 0 ? (
          renderCategories
        ) : (
          <View style={tw`justify-center items-center p-5`}>
            <Text style={[tw`text-black`, { fontFamily: 'Poppins-Regular' }]}>
              No Categories available
            </Text>
            <Text style={[tw`text-black`, { fontFamily: 'Poppins-Regular' }]}>
              Contact Admin to add categories
            </Text>
          </View>
        )}

        {data.length === 0 ? (
        <View style={tw`flex-1 justify-center items-center p-5`}>
          <Text style={[tw`text-black text-lg mb-2`, { fontFamily: 'Poppins-Bold' }]}>
            No staff available for the selected categories
          </Text>
          
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isLoading ? listFooterComponent : null}
        />
      )}

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
