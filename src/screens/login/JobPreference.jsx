import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';

import {useInitialDataStore} from '../../store/authentication/initial-data.store';
import GeneralStatusBar from '../../components/GeneralStatusBar';

const JobPreferences = ({navigation}) => {
  const {categories, getCategories, setCategories} = useInitialDataStore();
  const colorScheme = useColorScheme();

  const [allJobRoles, setAllJobRoles] = useState(categories);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const maxSelection = categories?.length;

  useEffect(() => {
    getCategories();
  }, []);

  console.log("colorScheme",colorScheme)

  const handleToggleJob = job => {
    if (selectedJobs.some(selectedJob => selectedJob.name === job.name)) {
      setSelectedJobs(
        selectedJobs.filter(selectedJob => selectedJob.name !== job.name),
      );
    } else {
      if (selectedJobs.length < maxSelection) {
        setSelectedJobs([...selectedJobs, job]);
      } else {
      }
    }
  };

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
    await setCategories({tags});
  };

  const isSaveButtonDisabled = selectedJobs.length < 1;

  return (
    <SafeAreaView style={tw`w-full h-full px-5 dark:bg-gray-900`}>
      <GeneralStatusBar
        backgroundColor={colorScheme === 'dark' ? '#000' : '#1F1F1F'}
      />
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
        style={tw`my-2`}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={tw`w-full my-5`}>
          <Text
            style={[
              tw`text-2xl text-black dark:text-white`,
              {fontFamily: 'Poppins-Bold'},
            ]}>
            Categories
          </Text>
          <View style={tw`w-[25%] h-1 rounded-full bg-black dark:bg-white`} />
        </View>

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

        <View style={tw`w-full my-5`}>
          <Text
            style={[
              tw`text-2xl text-black dark:text-white`,
              {fontFamily: 'Poppins-Bold'},
            ]}>
            About you
          </Text>
          <View style={tw`w-[25%] h-1 rounded-full bg-black dark:bg-white`} />
        </View>

        <View style={[tw``]}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            onChangeText={text => {
              if (text.length <= 100) setAboutMe(text);
            }}
            value={aboutMe}
            placeholder="Brief information about you."
            style={[
              tw`px-4 py-4 h-24 text-gray-800 dark:text-white bg-white dark:bg-gray-700 rounded-3xl`,
              {textAlignVertical: 'top'},
            ]}
            placeholderTextColor={
              colorScheme === 'dark' ? '#efefef' : '#334155'
            }
          />
          <Text style={tw`text-right mr-5`}>{100 - aboutMe.length}/100</Text>
        </View>

        <View style={tw`w-full my-5`}>
          <Text
            style={[
              tw`text-2xl text-black dark:text-white`,
              {fontFamily: 'Poppins-Bold'},
            ]}>
            Experience
          </Text>
          <View style={tw`w-[25%] h-1 rounded-full bg-black dark:bg-white`} />
        </View>

      </ScrollView>
      <View style={tw`py-5 flex-row justify-around`}>
        <TouchableOpacity
          disabled={isSaveButtonDisabled}
          style={tw`${
            isSaveButtonDisabled
              ? 'bg-slate-50 dark:bg-gray-800'
              : 'bg-green-700'
          }  w-40 p-4 rounded-full flex-row items-center justify-center`}
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
