import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
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
import Animated, {ZoomInLeft, ZoomOutRight} from 'react-native-reanimated';
import {Dropdown} from 'react-native-element-dropdown';
import useJobStore from '../../store/jobs.store';
import useLoaderStore from '../../store/loader.store';
import {getCoordinates} from '../../helper/utils/getGeoLocation';

const validationSchema = yup.object().shape({
  aboutme: yup.string().max(100, 'Maximum 100 characters allowed'),
  tags: yup
    .array()
    .of(yup.string())
    .min(1, 'Select at least one category'),
  location: yup.object().shape({
    pincode: yup.string().required('Pincode is required!'),
    district: yup.string().required('District is required!'),
    city: yup.string().required('City is required!'),
    state: yup.string().required('State is required!'),
    // fulladdress: yup
    //   .string()
    //   .trim()
    //   .required('Job location is required!')
    //   .test(
    //     'noBadWords',
    //     'Inappropriate language detected',
    //     value => !wordsFilter.isProfane(value),
    //   ),
  }),
  experience: yup.array().of(
    yup.object().shape({
      about: yup.string().required('Job information is required').trim(),
      employer: yup.string().trim(),
      year: yup
        .string()
        .required('Year range is required')
        .trim()
        .matches(/^\d{4}-\d{4}$/, 'Invalid year range format') // Matches the format "YYYY - YYYY"
        .test('validRange', 'Invalid year range', value => {
          if (!value) return true;
          const [startYear, endYear] = value.split('-').map(Number);
          return startYear <= endYear;
        })
        .test('validFirstYear', 'Invalid start year', value => {
          if (!value) return true;
          const [startYear] = value.split('-').map(Number);
          const year = new Date().getFullYear();
          return startYear <= year;
        })
        .test('validLastYear', 'Invalid end year', value => {
          if (!value) return true;
          const [startYear, lastYear] = value.split('-').map(Number);
          const year = new Date().getFullYear();
          return lastYear <= year;
        }),
    }),
  ),
});

const steps = [
  {
    fields: ['cate'],
  },
];

const JobPreferences = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const {categories, getCategories, setCategories} = useInitialDataStore();
  const colorScheme = useColorScheme();
  const {isLoading, setLoading} = useLoaderStore();
  const {getAddressByPincode, address} = useJobStore();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: {errors, isSubmitting, isValid},
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'experience',
  });

  useEffect(() => {
    getCategories();
  }, []);

  const onSubmit = async data => {
    const payload = {
      ...data,
      activeforjobs: isEnabled,
    };
    console.log("🚀 ~ onSubmit ~ payload:", payload)
    
    try {
      setLoading(true);
      const result = await getCoordinates();
      const {
        coords: {longitude, latitude, altitude, altitudeAccuracy},
      } = result;
      if (longitude && latitude) {
        data.location['coordinates'] = [longitude, latitude];
      }
    } catch (error) {
      console.log(
        'JobPostingForm.jsx::onSubmit::error on fetching location',
        error,
      );
    } finally {
      await setCategories(payload);
      setLoading(false);
    }
  };

  const shouldSubmitFormDisabled = !isValid || isSubmitting;

  const pincodeWatch = watch('location.pincode');

  useEffect(() => {
    if (pincodeWatch?.length >= 6) {
      async function getPostalAddressDetails() {
        const addressInfo = await getAddressByPincode(pincodeWatch);
        if (addressInfo) {
          for (const add in addressInfo) {
            setValue(`location.${add}`, addressInfo[add]);
          }
        }
      }
      getPostalAddressDetails();
    }
  }, [pincodeWatch]);

  return (
    <SafeAreaView style={tw`w-full h-full px-5 dark:bg-gray-900`}>
      <GeneralStatusBar
        backgroundColor={colorScheme === 'dark' ? '#000' : '#1F1F1F'}
      />

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

        <Controller
          name="tags"
          control={control}
          defaultValue={[]}
          render={({field: {onChange, value}}) => (
            <View style={tw`flex-row flex-wrap`}>
              {categories?.length ? (
                categories.map(category => (
                  <JobChip
                    key={category._id}
                    item={category}
                    isSelected={value.includes(category._id)}
                    onPress={() => {
                      if (value.includes(category._id)) {
                        onChange(value.filter(c => c !== category._id));
                      } else {
                        onChange([...value, category._id]);
                      }
                    }}
                    style={{margin: 4}}>
                    {category.name}
                  </JobChip>
                ))
              ) : (
                <></>
              )}
            </View>
          )}
        />

        <Text
          style={[
            tw`text-red-600 w-full text-[10px] text-right px-2 py-1`,
            {fontFamily: 'Poppins-Regular'},
          ]}>
          {errors?.tags?.message}
        </Text>

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
          <Controller
            control={control}
            name="aboutme"
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <TextInput
                  value={value}
                  multiline={true}
                  numberOfLines={4}
                  autoCapitalize="sentences"
                  onChangeText={text => {
                    if (text.length <= 100) onChange(text);
                  }}
                  onBlur={onBlur}
                  style={[
                    {fontFamily: 'Poppins-Regular'},
                    tw`px-4 py-4 h-24 text-gray-800 dark:text-white bg-white dark:bg-gray-800 rounded-3xl ${
                      errors?.aboutme?.message
                        ? 'border-red-500'
                        : 'border-slate-300'
                    } w-full`,
                    {textAlignVertical: 'top'},
                  ]}
                  placeholder="Brief information about you."
                  placeholderTextColor={
                    colorScheme === 'dark' ? '#efefef' : 'rgb(156 163 175)'
                  }
                />
                <Text
                  style={tw`text-right mr-5 text-gray-700 dark:text-gray-400`}>
                  {value ? 100 - value.length : 0}/100
                </Text>
              </>
            )}
          />
          <Text
            style={[
              tw`text-red-600 w-full text-[10px] text-right px-2 py-1`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            {errors?.aboutme?.message}
          </Text>
        </View>
        {/* Location fetch form started */}

        <View style={tw`w-full my-5`}>
          <Text
            style={[
              tw`text-2xl text-black dark:text-white`,
              {fontFamily: 'Poppins-Bold'},
            ]}>
            Let's locate you
          </Text>
          <View style={tw`w-[35%] h-1 rounded-full bg-black dark:bg-white`} />
        </View>

        <View
          style={[
            tw`w-full gap-2 bg-white dark:bg-gray-800 px-3 pt-3 rounded-2xl shadow-md shadow-gray-400`,
          ]}>
          <View style={[tw`w-full flex-row gap-2`]}>
            <View style={tw`flex-1`}>
              <Text
                style={[
                  tw`text-gray-600 dark:text-gray-300 w-full text-[12px] text-left px-2`,
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                Pincode:
              </Text>
              <Controller
                control={control}
                name="location.pincode"
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    value={value}
                    keyboardType="decimal-pad"
                    autoCapitalize="sentences"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    style={[
                      {fontFamily: 'Poppins-Regular'},
                      tw`text-black dark:text-white text-[14px] px-4 py-2 border-[1px] ${
                        errors?.pincode?.message
                          ? 'border-red-500'
                          : 'border-slate-300'
                      } w-full rounded-lg`,
                    ]}
                    placeholder="eg. 400021"
                    placeholderTextColor={
                      colorScheme === 'dark' ? '#efefef' : 'rgb(156 163 175)'
                    }
                  />
                )}
              />
              <Text
                style={[
                  tw`text-red-600 w-full text-[10px] text-right px-2 py-1`,
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                {errors?.location?.pincode?.message}
              </Text>
            </View>

            <View style={tw`flex-1`}>
              <Text
                style={[
                  tw`text-gray-600 dark:text-gray-300 w-full text-[12px] text-left px-2`,
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                City/Town:
              </Text>
              <Controller
                control={control}
                name="location.city"
                render={({field: {onChange, onBlur, value}}) => (
                  <Dropdown
                    style={[
                      tw`text-black dark:text-white px-2 border-[1px] border-slate-300 w-full rounded-lg py-1.1`,
                    ]}
                    mode="default"
                    placeholder="Select City"
                    placeholderStyle={[
                      tw`text-[14px] px-2`,
                      {
                        fontFamily: 'Poppins-Regular',
                        color:
                          colorScheme === 'dark'
                            ? '#efefef'
                            : 'rgb(156 163 175)',
                      },
                    ]}
                    selectedTextStyle={[
                      tw`text-black dark:text-white text-[14px] px-2`,
                      {fontFamily: 'Poppins-Regular'},
                    ]}
                    data={address?.cities}
                    disable={address?.cities?.length <= 0 ? true : false}
                    labelField="label"
                    valueField="value"
                    value={value}
                    fontFamily={'Poppins-Regular'}
                    activeColor={colorScheme == 'dark' ? '#2d3649' : '#edf2f7'}
                    containerStyle={[
                      tw`bg-white dark:bg-gray-950 rounded-lg w-full overflow-hidden`,
                    ]}
                    itemContainerStyle={[tw`rounded-lg`]}
                    showsVerticalScrollIndicator={true}
                    itemTextStyle={[
                      tw`text-black text-sm dark:text-gray-300`,
                      {fontFamily: 'Poppins-Regular'},
                    ]}
                    onChange={item => {
                      onChange(item.value);
                    }}
                  />
                )}
              />
              <Text
                style={[
                  tw`text-red-500 w-full text-[10px] text-right px-2 py-1`,
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                {errors?.location?.city?.message}
              </Text>
            </View>
          </View>

          <View style={[tw`w-full flex-row gap-2 `]}>
            <View style={tw`flex-1`}>
              <Text
                style={[
                  tw`text-gray-600 dark:text-gray-300 w-full text-[12px] text-left px-2`,
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                District:
              </Text>
              <Controller
                control={control}
                name="location.district"
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    value={value}
                    keyboardType="default"
                    autoCapitalize="sentences"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    style={[
                      {fontFamily: 'Poppins-Regular'},
                      tw`text-black dark:text-white text-[14px] px-4 py-2 border-[1px] ${
                        errors?.district?.message
                          ? 'border-red-500'
                          : 'border-slate-300'
                      } w-full rounded-lg`,
                    ]}
                    placeholder="eg. Pune"
                    placeholderTextColor={
                      colorScheme === 'dark' ? '#efefef' : 'rgb(156 163 175)'
                    }
                  />
                )}
              />
              <Text
                style={[
                  tw`text-red-600 w-full text-[10px] text-right px-2 py-1`,
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                {errors?.location?.district?.message}
              </Text>
            </View>

            <View style={tw`flex-1`}>
              <Text
                style={[
                  tw`text-gray-600 dark:text-gray-300 w-full text-[12px] text-left px-2`,
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                State:
              </Text>
              <Controller
                control={control}
                name="location.state"
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    value={value}
                    keyboardType="default"
                    autoCapitalize="sentences"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    style={[
                      {fontFamily: 'Poppins-Regular'},
                      tw`text-black dark:text-white text-[14px] px-4 py-2 border-[1px] ${
                        errors?.state?.message
                          ? 'border-red-500'
                          : 'border-slate-300'
                      } w-full rounded-lg`,
                    ]}
                    placeholder="eg. Maharashtra"
                    placeholderTextColor={
                      colorScheme === 'dark' ? '#efefef' : 'rgb(156 163 175)'
                    }
                  />
                )}
              />
              <Text
                style={[
                  tw`text-red-500 w-full text-[10px] text-right px-2 py-1`,
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                {errors?.location?.state?.message}
              </Text>
            </View>
          </View>
        </View>

        {/* Location fetch form completed */}

        {isEnabled ? (
          <>
            <View style={tw`w-full my-5 flex flex-row justify-between`}>
              <View style={tw``}>
                <Text
                  style={[
                    tw`text-2xl text-black dark:text-white`,
                    {fontFamily: 'Poppins-Bold'},
                  ]}>
                  Experience
                </Text>
                <View
                  style={tw`w-[65%] h-1 rounded-full bg-black dark:bg-white`}
                />
              </View>
              <TouchableOpacity
                onPress={() => append({about: '', employer: '', year: '-'})}
                style={[
                  tw`w-10 h-10 px-2 rounded-2xl bg-emerald-600 items-center justify-center`,
                ]}>
                <Text style={tw`text-white text-3xl`}>+</Text>
              </TouchableOpacity>
            </View>

            {fields.map((item, index) => (
              <Animated.View
                entering={ZoomInLeft}
                exiting={ZoomOutRight}
                key={item.id}
                style={[
                  tw`my-2 p-3 rounded-2xl bg-white dark:bg-gray-800 relative shadow-md shadow-gray-400`,
                ]}>
                <TouchableOpacity
                  onPress={() => remove(index)}
                  style={[
                    tw`absolute z-10 right-1 -top-4 w-6 h-6 rounded-2xl bg-red-600 items-center justify-center`,
                  ]}>
                  <Text style={tw`text-white`}>—</Text>
                </TouchableOpacity>

                <View>
                  <Text
                    style={[
                      tw`text-black dark:text-white my-1 mx-2`,
                      {fontFamily: 'Regular-Poppins'},
                    ]}>
                    Your experience:
                  </Text>
                  <Controller
                    control={control}
                    name={`experience.${index}.about`}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        multiline={true}
                        numberOfLines={2}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Information about your work experience"
                        style={[
                          tw`px-4 py-3 h-15 text-gray-800 dark:text-white bg-white dark:bg-gray-800 rounded-lg border ${
                            errors?.experience?.[index]?.about
                              ? 'border-red-500'
                              : 'border-slate-300'
                          }`,
                          {textAlignVertical: 'top'},
                        ]}
                        placeholderTextColor={
                          colorScheme === 'dark'
                            ? '#efefef'
                            : 'rgb(156 163 175)'
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
                      {errors.experience[index]?.about?.message}
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
                      name={`experience.${index}.employer`}
                      render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                          multiline={true}
                          numberOfLines={1}
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          placeholder="eg. KaamPay"
                          style={[
                            tw`px-4 py-3 h-10 text-gray-800 dark:text-white bg-white dark:bg-gray-800 rounded-lg border ${
                              errors?.experience?.[index]?.employer
                                ? 'border-red-500'
                                : 'border-slate-300'
                            }`,
                            {textAlignVertical: 'top'},
                          ]}
                          placeholderTextColor={
                            colorScheme === 'dark'
                              ? '#efefef'
                              : 'rgb(156 163 175)'
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
                        {errors.experience[index]?.employer?.message}
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
                      name={`experience.${index}.year`}
                      render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                          multiline={true}
                          numberOfLines={2}
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          placeholder="eg. 2020-2023"
                          style={[
                            tw`px-4 py-3 h-10 text-gray-800 dark:text-white bg-white dark:bg-gray-800 rounded-lg border ${
                              errors?.experience?.[index]?.year
                                ? 'border-red-500'
                                : 'border-slate-300'
                            }`,
                            {textAlignVertical: 'top'},
                          ]}
                          placeholderTextColor={
                            colorScheme === 'dark'
                              ? '#efefef'
                              : 'rgb(156 163 175)'
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
                        {errors.experience[index].year.message}
                      </Text>
                    )}
                  </View>
                </View>
              </Animated.View>
            ))}
          </>
        ) : (
          ''
        )}
      </ScrollView>
      <View style={tw`py-2 flex-row justify-around `}>
        <TouchableOpacity
          disabled={shouldSubmitFormDisabled}
          style={tw`${
            shouldSubmitFormDisabled
              ? 'bg-slate-50 dark:bg-gray-800'
              : 'bg-emerald-700'
          }  w-40 p-4 rounded-full flex-row items-center justify-center`}
          onPress={handleSubmit(onSubmit)}>
          <Text
            style={[
              tw`mr-3 text-2xl ${
                shouldSubmitFormDisabled ? 'text-slate-300' : 'text-white'
              }`,
              {fontFamily: 'Poppins-SemiBold'},
            ]}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
      {isLoading && (
        <View
          style={[
            tw`absolute top-0 right-0 bottom-0 left-0 bg-transparent justify-center items-center`,
          ]}>
          <ActivityIndicator
            animating={isLoading}
            size={35}
            style={tw`text-red-400`}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default JobPreferences;

const JobChip = ({item, isSelected, onPress}) => {
  return (
    <TouchableOpacity
      style={tw`px-4 py-1.5 mx-1 flex self-start my-1 rounded-full ${
        isSelected ? 'bg-emerald-600' : 'bg-white dark:bg-transparent'
      } border border-white`}
      onPress={onPress}>
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

{
  /* <View style={tw`rounded-full bg-white dark:bg-gray-800`}>
        <TextInput
          placeholder="Search"
          onChangeText={handleSearch}
          value={searchQuery}
          style={tw`mx-1 px-6 py-2 text-gray-800 dark:text-white`}
          placeholderTextColor={colorScheme === 'dark' ? '#cbd5e1' : 'rgb(156 163 175)'}
        />
      </View> */
}
