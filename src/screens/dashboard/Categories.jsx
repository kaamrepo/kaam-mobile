import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {
  View,
  Dimensions,
  Pressable,
  ImageBackground,
  Text,
  StyleSheet,
} from 'react-native';
import tw from 'twrnc';
import Carousel from 'react-native-snap-carousel';
import Icon, {Icons} from '../../components/Icons';
import useCategoriesStore from '../../store/categories.store';
import staticEmployeeImage from '../../assets/images/profession-employee.png';
import staticWorkImage from '../../assets/images/internship.png';

const Categories = ({navigation, selectedSearchType}) => {
  const {categories, getCategories} = useCategoriesStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const payload = {
      isActive: true,
    };
    getCategories(payload)
      .then(() => setIsLoading(false))
      .catch(error => console.error('Error while fetching categories:', error));
  }, [getCategories]);

  const renderCategories = useCallback(
    ({item}) => {
      return (
        <Pressable
          onPress={() => {
            if (selectedSearchType === 'jobs') {
              navigation.navigate('SeeAllJobs');
            }
            if (selectedSearchType === 'staff') {
              navigation.navigate('SeeAllStaffs', {category: item?._id});
            }
          }}
          key={item._id}
          style={tw`items-center justify-center w-[150px] h-[180px] mx-2`}>
          <View style={tw`rounded-full overflow-hidden w-24 h-24`}>
            
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
          <View style={tw`bg-emerald-500 rounded-full w-3/4 py-1 mt-2`}>
            <Text
              style={[
                tw`text-white text-center text-lg`,
                {fontFamily: 'Poppins-SemiBold'},
              ]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item?.name}
            </Text>
          </View>
        </Pressable>
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
          <Carousel
            layout={'default'}
            autoplay={false}
            loop={false}
            data={memoizedCategories}
            renderItem={renderCategories}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={150}
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
