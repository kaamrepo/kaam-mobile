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
} from 'react-native';
import tw from 'twrnc';
import {RadioButton, Modal, Portal, Provider} from 'react-native-paper';
import FilterIconSVG from '../../../../assets/svgs/FilterIcon.svg';
import Icon, {Icons} from '../../../../components/Icons';
import useStaffStore from '../../../../store/staff.store';
import useLoaderStore from '../../../../store/loader.store';
import useCategoriesStore from '../../../../store/categories.store';

export const SeeAllStaffs = ({navigation}) => {
  const {getStaffFlatlist} = useStaffStore();
  const {categories} = useCategoriesStore();
  const {isLoading} = useLoaderStore();
  const limit = 10;
  const loadMoreRef = useRef(true);
  const [skip, setSkip] = useState(0);
  const [data, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedPills, setSelectedPills] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchData();
  }, [selectedPills, searchInput]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const hideModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const showModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleSearch = useCallback(async text => {
    setSearchInput(text);
    setSkip(0);
    fetchData(text);
  }, []);

  const handlePillPress = useCallback(pill => {
    setSelectedPills(prevSelectedPills => {
      if (prevSelectedPills.includes(pill)) {
        return prevSelectedPills.filter(item => item !== pill);
      } else {
        return [...prevSelectedPills, pill];
      }
    });
  }, []);
  const renderCategories = useMemo(() => {
    return (
      <View style={tw`flex flex-wrap flex-row px-4 mb-2`}>
        {categories?.map(item => (
          <Pressable
            key={item.id}
            onPress={() => handlePillPress(item.name)}
            style={tw`px-4 py-2 m-1 rounded-full ${
              selectedPills.includes(item.name) ? 'bg-blue-500' : 'bg-gray-200'
            }`}>
            <Text
              style={tw`text-sm ${
                selectedPills.includes(item.name) ? 'text-white' : 'text-black'
              }`}>
              {item?.name}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  }, [categories, selectedPills, handlePillPress]);

  const listFooterComponent = useCallback(() => {
    return <ActivityIndicator size={'large'} style={{marginVertical: 16}} />;
  }, []);

  const ItemSeparatorComponent = useCallback(() => {
    return <View style={tw`justify-center`} />;
  }, []);

  const onEndReached = useCallback(async () => {
    if (loadMoreRef.current) {
      await fetchData();
    }
  }, [fetchData]);

  const fetchData = useCallback(
    async text => {
      try {
        if (text) {
          setData([]);
        }
        const result = await getStaffFlatlist(skip, limit, {
          text,
          categories: selectedPills,
        });
        if (result?.length === 0) {
          loadMoreRef.current = false;
        } else {
          setData(prevData => [...prevData, ...result]);
          setSkip(prevSkip => prevSkip + 10);
        }
      } catch (error) {
        console.log('error', error);
      }
    },
    [skip, limit, getStaffFlatlist, selectedPills],
  );

  const renderItem = useCallback(
    ({item, index}) => (
      <Pressable
        onPress={() => {
          navigation.navigate('EmployeeDetails', {id: item._id});
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
          {renderCategories}
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

const styles = StyleSheet;
