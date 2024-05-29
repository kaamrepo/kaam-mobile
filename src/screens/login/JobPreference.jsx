import {
  Text,
  View,
  ScrollView,
  TextInput,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw, {useAppColorScheme} from 'twrnc';

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import {useInitialDataStore} from '../../store/authentication/initial-data.store';

const JobPreferences = ({navigation}) => {
  const {categories, getCategories, setCategories} = useInitialDataStore();
  const [colorScheme] = useAppColorScheme(tw);

  const [allJobRoles, setAllJobRoles] = useState(categories);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const maxSelection = categories?.length;
  const [errorMessage, setErrorMessage] = useState('');

  const shateTranslationX = useSharedValue(0);
  const errorOpacity = useSharedValue(0);

  const shake = useCallback(() => {
    const translationAmount = 10;
    const timingConf = {
      duration: 80,
    };

    errorOpacity.value = withTiming(1);

    shateTranslationX.value = withSequence(
      withTiming(translationAmount, timingConf),
      withRepeat(withTiming(-translationAmount, timingConf), 4, true),
      withTiming(0, timingConf),
    );

    setTimeout(() => {
      errorOpacity.value = withTiming(0, {duration: 300});
      if (errorOpacity.value === 0) {
        setErrorMessage('');
      }
    }, 5000);
  }, [shateTranslationX, errorOpacity]);

  useEffect(() => {
    getCategories();
  }, []);

  const handleToggleJob = job => {
    if (selectedJobs.some(selectedJob => selectedJob.name === job.name)) {
      setSelectedJobs(
        selectedJobs.filter(selectedJob => selectedJob.name !== job.name),
      );
    } else {
      if (selectedJobs.length < maxSelection) {
        setSelectedJobs([...selectedJobs, job]);
      } else {
        setErrorMessage(`You can only select ${maxSelection} job preferences!`);
        shake();
      }
    }
  };
  const textShakeStyle = useAnimatedStyle(() => {
    return {
      opacity: errorOpacity.value,
      transform: [{translateX: shateTranslationX.value}], // Optional: Slide up animation
    };
  });

  const handleSearch = query => {
    setSearchQuery(query);
  };

  useMemo(() => {
    if (categories && Array.isArray(categories)) {
      const filteredJobRoles =
        categories?.filter(job =>
          job?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
        ) ?? [];
      setAllJobRoles(filteredJobRoles);
    }
  }, [categories, searchQuery]);

  const handleSubmitJobPreference = async () => {
    const tags = selectedJobs.map(job => job._id);
    console.log('payload', tags);
    await setCategories({tags});
  };

  const isSaveButtonDisabled = selectedJobs.length < 1;

  return (
    <SafeAreaView style={tw`w-full h-full px-5  dark:bg-gray-900`}>
      <View style={tw`w-full mt-10`}>
        <Text
          style={[
            tw`text-2xl text-black dark:text-white`,
            {fontFamily: 'Poppins-Bold'},
          ]}>
          Categories
        </Text>
        <View style={tw`w-[25%] h-1 rounded-full bg-black dark:bg-white`} />
      </View>

      {/* <View style={tw`rounded-full bg-white dark:bg-gray-800`}>
        <TextInput
          placeholder="Search"
          onChangeText={handleSearch}
          value={searchQuery}
          style={tw`mx-1 px-6 py-2 text-gray-800 dark:text-white`}
          placeholderTextColor={colorScheme === 'dark' ? '#cbd5e1' : '#334155'}
        />
      </View> */}

      <ScrollView
        style={tw`my-2 pt-2`}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Animated.View style={[textShakeStyle, tw`mx-5`]}>
          <Text style={[tw`text-red-500`, {fontFamily: 'Poppins-Regular'}]}>
            {errorMessage}
          </Text>
        </Animated.View>
        <View style={tw`pb-4 flex-row flex-wrap`}>
          {allJobRoles?.length ? (
            allJobRoles.map(jobRole => (
              <JobChip
                key={jobRole._id}
                item={jobRole}
                isSelected={selectedJobs.some(
                  selectedJob => selectedJob.name === jobRole.name,
                )}
                onPress={handleToggleJob}
              />
            ))
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
      <View style={tw`py-5 flex-row justify-around`}>
        {/* <TouchableOpacity
          style={tw`bg-slate-50 dark:bg-gray-800 w-32 p-3 rounded-md flex-row items-center justify-center`}
          onPress={() => skipPreferenceScreens()}>
          <Text style={[tw`text-black dark:text-white`,{fontFamily: 'Poppins-Regular'}]}>Skip</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          disabled={isSaveButtonDisabled}
          style={tw`${
            isSaveButtonDisabled
              ? 'bg-slate-50 dark:bg-gray-800'
              : 'bg-green-700'
          }  w-32 p-3 rounded-md flex-row items-center justify-center`}
          onPress={handleSubmitJobPreference}>
          <Text
            style={[
              tw`mr-3 text-2xl ${
                isSaveButtonDisabled ? 'text-slate-300' : 'text-white'
              }`,
              {fontFamily: 'Poppins-SemiBold'},
            ]}>
            Save
          </Text>
          {/* <Icon
            IconComponent={CircleArrowRight}
            darkColor={isSaveButtonDisabled ? 'text-slate-300' : 'text-white'}
            lightColor={isSaveButtonDisabled ? 'text-slate-300' : 'text-white'}
            style="rounded-full items-center justify-center"
          /> */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default JobPreferences;

const JobChip = ({item, isSelected, onPress}) => {
  return (
    <TouchableOpacity
      style={tw`px-4 py-1.5 mx-1 flex self-start my-1 rounded-full ${
        isSelected ? 'bg-green-600' : 'bg-white dark:bg-transparent'
      } border border-white`}
      onPress={() => onPress(item)}>
      <Text
        numberOfLines={1}
        style={[
          tw`${isSelected ? 'text-white' : 'text-black dark:text-white'}`,
          ,
          {fontFamily: 'Poppins-Regular'},
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};
