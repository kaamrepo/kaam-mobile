import React, {useState, useMemo, useCallback} from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import tw from 'twrnc';
import useCategoriesStore from '../../store/categories.store';
import staticEmployeeImage from '../../assets/images/profession-employee.png';
import staticWorkImage from '../../assets/images/internship.png';
import {useFocusEffect} from '@react-navigation/native';

const Categories = ({navigation, selectedSearchType}) => {
  const {categories, getCategories} = useCategoriesStore();
  const [_, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const payload = {
        isActive: true,
      };
      getCategories(payload)
        .then(() => setIsLoading(false))
        .catch(error =>
          console.error('Error while fetching categories:', error),
        );
    }, [getCategories]),
  );

  const RenderCategories = useCallback(
    ({item}) => {
      return (
        <TouchableOpacity
          onPress={() => {
            if (selectedSearchType === 'jobs') {
              navigation.navigate('SeeAllJobs', {category: item?._id});
            }
            if (selectedSearchType === 'staff') {
              navigation.navigate('SeeAllStaffs', {category: item?._id});
            }
          }}
          key={item._id}
          style={tw`flex-row items-center justify-between p-1 gap-2 rounded-full bg-gray-200`}>
          <View
            style={tw`rounded-full bg-white border border-gray-300 overflow-hidden w-6 h-6`}>
            {item.bgurl ? (
              <ImageBackground
                source={{uri: item.bgurl}}
                style={tw`w-full h-full`}
                resizeMode="cover"
              />
            ) : (
              <>
                {selectedSearchType === 'jobs' ? (
                  <ImageBackground
                    source={staticWorkImage}
                    style={tw`w-full h-full`}
                    resizeMode="cover"
                  />
                ) : selectedSearchType === 'staff' ? (
                  <ImageBackground
                    source={staticEmployeeImage}
                    style={tw`w-full h-full`}
                    resizeMode="cover"
                  />
                ) : null}
              </>
            )}
          </View>
          <View style={tw`px-1`}>
            <Text
              style={[
                tw`text-black text-center text-sm`,
                {fontFamily: 'Poppins-Regular'},
              ]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item?.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [selectedSearchType],
  );

  const memoizedCategories = useMemo(() => categories, [categories]);

  return (
    <>
      <View style={tw`flex-row justify-between items-center mt-2 mx-5`} />
      <View style={tw`flex-1 justify-center items-center`}>
        {memoizedCategories.length > 0 ? (
          <FlatList
            data={memoizedCategories}
            horizontal={true}
            renderItem={({item}) => <RenderCategories item={item} />}
            contentContainerStyle={[tw`px-5 py-2 gap-2`]}
            showsHorizontalScrollIndicator={false}
          />
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
      </View>
    </>
  );
};

export default Categories;

const styles = StyleSheet.create({});
