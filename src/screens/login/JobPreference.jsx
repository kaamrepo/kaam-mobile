import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  Button,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';

import {useInitialDataStore} from '../../store/authentication/initial-data.store';
import GeneralStatusBar from '../../components/GeneralStatusBar';
import KToggle from '../../components/KToggle';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  about: yup.string().required('Job information is required').trim(),
  employer: yup.string().trim(),
  year: yup
    .string()
    .required('Year range is required')
    .matches(/^\d{4}\s*-\s*\d{4}$/, 'Invalid year range format') // Matches the format "YYYY - YYYY"
    .test('validRange', 'Invalid year range', value => {
      if (!value) return true;
      const [startYear, endYear] = value.split(' - ').map(Number);
      return startYear <= endYear;
    }),
});

const JobPreferences = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const {categories, getCategories, setCategories} = useInitialDataStore();
  const colorScheme = useColorScheme();

  const [allJobRoles, setAllJobRoles] = useState(categories);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const maxSelection = categories?.length;

  const {
    control,
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const {fields, append, remove} = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: 'experience', // unique name for your Field Array
  });

  useEffect(() => {
    getCategories();
  }, []);

  console.log('colorScheme', colorScheme);

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
            Active for jobs?
          </Text>
          <View style={tw`w-[30%] h-1 rounded-full bg-black dark:bg-white`} />
        </View>

        <KToggle isEnabled={isEnabled} setIsEnabled={setIsEnabled} />

        <View style={tw`w-full my-5`}>
          <Text
            style={[
              tw`text-2xl text-black dark:text-white`,
              {fontFamily: 'Poppins-Bold'},
            ]}>
            {isEnabled ? 'Categories' : 'Post jobs of'}
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

        <View style={tw`w-full my-5 flex flex-row justify-between`}>
          <View style={tw``}>
            <Text
              style={[
                tw`text-2xl text-black dark:text-white`,
                {fontFamily: 'Poppins-Bold'},
              ]}>
              Experience
            </Text>
            <View style={tw`w-[65%] h-1 rounded-full bg-black dark:bg-white`} />
          </View>
          <TouchableOpacity
            onPress={() => append({about: '', employer: '', year: ''})}
            style={[
              tw`w-10 h-10 px-2 rounded-2xl bg-green-600 items-center justify-center`,
            ]}>
            <Text style={tw`text-white text-3xl`}>+</Text>
          </TouchableOpacity>
        </View>

        <View>
          {fields.map((item, index) => (
            <View
              key={item.id}
              style={[
                tw`my-3 p-2 rounded-3xl bg-gray-200 dark:bg-gray-800 relative`,
              ]}>
              <TouchableOpacity
                onPress={() => remove(index)}
                style={[
                  tw`absolute z-10 right-1 -top-4 w-6 h-6  rounded-2xl bg-red-600 items-center justify-center`,
                ]}>
                <Text style={tw`text-white`}>—</Text>
              </TouchableOpacity>
              <View style={tw``}>
                <Text
                  style={[
                    tw`text-black dark:text-white my-1 mx-2`,
                    {fontFamily: 'Regular-Poppins'},
                  ]}>
                  Your experience:
                </Text>
                <Controller
                  control={control}
                  name={`experience[${index}].about`}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      multiline={true}
                      numberOfLines={2}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Brief information about your work experience"
                      style={[
                        tw`px-4 py-3 h-15 text-gray-800 dark:text-white bg-white dark:bg-gray-700 rounded-2xl`,
                        {textAlignVertical: 'top'},
                      ]}
                      placeholderTextColor={
                        colorScheme === 'dark' ? '#efefef' : '#334155'
                      }
                    />
                  )}
                />

                {errors?.experience?.[index]?.about && (
                  <Text
                    style={[
                      tw`text-[10px] text-red-500 text-right mr-2`,
                      {fontFamily: 'Poppins-Regular'},
                    ]}>
                    {errors?.experience?.[index]?.about?.message}.
                  </Text>
                )}
              </View>

              <View style={tw`mt-2 flex-row justify-between items-center`}>
                <View style={tw`min-w-[60%]`}>
                  <Text
                    style={[
                      tw`text-black dark:text-white my-1 mx-2`,
                      {fontFamily: 'Regular-Poppins'},
                    ]}>
                    Employer/Organisation name:
                  </Text>
                  <Controller
                    control={control}
                    name={`experience[${index}].employer`}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        multiline={true}
                        numberOfLines={1}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="eg. KaamPay"
                        style={[
                          tw`px-4 py-3 h-10 text-gray-800 dark:text-white bg-white dark:bg-gray-700 rounded-2xl`,
                          {textAlignVertical: 'top'},
                        ]}
                        placeholderTextColor={
                          colorScheme === 'dark' ? '#efefef' : '#334155'
                        }
                      />
                    )}
                  />

                  {errors?.experience?.[index]?.employer && (
                    <Text
                      style={[
                        tw`text-[10px] text-red-500 text-right mr-2`,
                        {fontFamily: 'Poppins-Regular'},
                      ]}>
                      {errors?.experience?.[index]?.employer?.message}.
                    </Text>
                  )}
                </View>
                <View style={tw`min-w-[35%]`}>
                  <Text
                    style={[
                      tw`text-black dark:text-white my-1 mx-2`,
                      {fontFamily: 'Regular-Poppins'},
                    ]}>
                    Years of experience:
                  </Text>
                  <Controller
                    control={control}
                    name={`experience[${index}].year`}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        multiline={true}
                        numberOfLines={2}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="eg. 2020 - 2023"
                        style={[
                          tw`px-4 py-3 h-10 text-gray-800 dark:text-white bg-white dark:bg-gray-700 rounded-2xl`,
                          {textAlignVertical: 'top'},
                        ]}
                        placeholderTextColor={
                          colorScheme === 'dark' ? '#efefef' : '#334155'
                        }
                      />
                    )}
                  />

                  {errors?.experience?.[index]?.year && (
                    <Text
                      style={[
                        tw`text-[10px] text-red-500 text-right mr-2`,
                        {fontFamily: 'Poppins-Regular'},
                      ]}>
                      {errors?.experience?.[index]?.year?.message}.
                    </Text>
                  )}
                </View>
              </View>
            </View>
          ))}
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
