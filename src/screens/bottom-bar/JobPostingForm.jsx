import {
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
  Dimensions,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Icon, {Icons} from '../../components/Icons';
import useLoginStore from '../../store/authentication/login.store';
import {getCoordinates} from '../../helper/utils/getGeoLocation';
import {primaryBGColor, primaryBGDarkColor} from '../../helper/utils/colors';
import useJobStore from '../../store/jobs.store';
import {useFocusEffect} from '@react-navigation/native';
import wordsFilter from '../../helper/utils/profane';
import useLoaderStore from '../../store/loader.store';
import {useInitialDataStore} from '../../store/authentication/initial-data.store';
import {Dropdown} from 'react-native-element-dropdown';

let salaryBasisOptionsArray = [
  {label: 'Monthly', value: 'month'},
  {label: 'Weekly', value: 'week'},
  {label: 'Yearly', value: 'year'},
];
const createJobSchema = yup.object({
  jobtitle: yup
    .string()
    .trim()
    .required('Job title is required!')
    .test(
      'noBadWords',
      'Inappropriate language detected',
      value => !wordsFilter.isProfane(value),
    ),
  description: yup
    .string()
    .trim()
    .required('Job description is required!')
    .test(
      'noBadWords',
      'Inappropriate language detected',
      value => !wordsFilter.isProfane(value),
    ),
  salary: yup
    .number()
    .typeError('Job salary is required!')
    .min(100, 'A salary should be at least 100 rupees.')
    .required('Job salary is required!'),
  numberofopenings: yup
    .number()
    .typeError('Available Job openings is required!')
    .min(1, 'At least 1 job opening should be available')
    .default(1),
  salarybasis: yup.string().trim().required('Please select a salary basis'),
  tags: yup.string().required('Job category is required'),
  location: yup.object().shape({
    pincode: yup.string().required('Pincode is required!'),
    district: yup
      .string()
      .required('District is required!')
      .test(
        'noBadWords',
        'Inappropriate language detected',
        value => !wordsFilter.isProfane(value),
      ),
    city: yup.string().required('City is required!'),
    state: yup
      .string()
      .required('State is required!')
      .test(
        'noBadWords',
        'Inappropriate language detected',
        value => !wordsFilter.isProfane(value),
      ),
    fulladdress: yup
      .string()
      .trim()
      .required('Job location is required!')
      .test(
        'noBadWords',
        'Inappropriate language detected',
        value => !wordsFilter.isProfane(value),
      ),
  }),
});

const JobPostingForm = ({navigation}) => {
  const colorScheme = useColorScheme();
  const {isLoading, setLoading} = useLoaderStore();
  const {loggedInUser} = useLoginStore();
  const {categories, getCategories} = useInitialDataStore();
  const {postJobs, getAddressByPincode, address} = useJobStore();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(createJobSchema),
    mode: 'onChange',
  });

  const createJob = async data => {
    try {
      setLoading(true);
      const result = await getCoordinates();
      const {
        coords: {longitude, latitude, altitude, altitudeAccuracy},
      } = result;
      if (longitude && latitude) {
        data.location['coordinates'] = [longitude, latitude];
      }
      data['createdby'] = loggedInUser?._id;
      data.tags = [data.tags];
    } catch (error) {
      console.log('JobPostingForm.jsx::createJob::error', error);
    }

    const success = await postJobs(data);
    if (success) {
      reset();
      navigation.navigate('Dashboard');
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      getCategories();
      return () => reset();
    }, []),
  );

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
    <SafeAreaView style={tw`flex-1 px-5 py-2 bg-white dark:bg-gray-950`}>
      <ScrollView
        style={[tw`my-5 mb-[75px]`]}
        contentContainerStyle={{alignItems: 'flex-start'}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <Text
          style={[
            tw`w-full text-black dark:text-white text-lg my-2`,
            {fontFamily: 'Poppins-Regular'},
          ]}>
          Fill out the following details to post the job.
        </Text>
        <View style={tw`w-full`}>
          <Text
            style={[
              tw`text-gray-600 dark:text-gray-300 w-full text-[12px] text-left px-2`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            Job Title:
          </Text>
          <Controller
            control={control}
            name="jobtitle"
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
                    errors?.jobtitle?.message
                      ? 'border-red-500'
                      : 'border-slate-300'
                  } w-full rounded-lg`,
                ]}
                placeholder="eg. Maid"
                placeholderTextColor={'rgb(163 163 163)'}
              />
            )}
          />
          <Text
            style={[
              tw`text-red-600 w-full text-[10px] text-right px-2 py-1`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            {errors?.jobtitle?.message}
          </Text>
        </View>
        <View style={tw`w-full`}>
          <Text
            style={[
              tw`text-gray-600 dark:text-gray-300 w-full text-[12px] text-left px-2`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            Job Description:
          </Text>
          <Controller
            control={control}
            name="description"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                value={value}
                multiline
                keyboardType="default"
                autoCapitalize="sentences"
                onChangeText={onChange}
                onBlur={onBlur}
                style={[
                  {fontFamily: 'Poppins-Regular'},
                  tw`text-black dark:text-white text-[14px] px-4 py-2 border-[1px] ${
                    errors?.description?.message
                      ? 'border-red-500'
                      : 'border-slate-300'
                  } w-full rounded-lg`,
                ]}
                placeholder="eg. Who can cook healthy Veg Food"
                placeholderTextColor={'rgb(163 163 163)'}
              />
            )}
          />
          <Text
            style={[
              tw`text-red-600 w-full text-[10px] text-right px-2 py-1`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            {errors?.description?.message}
          </Text>
        </View>
        <View style={tw`w-full`}>
          <Text
            style={[
              tw`text-gray-600 dark:text-gray-300 w-full text-[12px] text-left px-2`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            Work Location:
          </Text>
          <Controller
            control={control}
            name="location.fulladdress"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                value={value}
                multiline
                keyboardType="default"
                autoCapitalize="sentences"
                onChangeText={onChange}
                onBlur={onBlur}
                style={[
                  {fontFamily: 'Poppins-Regular'},
                  tw`text-black dark:text-white text-[14px] px-4 py-2 border-[1px] ${
                    errors?.location?.fulladdress?.message
                      ? 'border-red-500'
                      : 'border-slate-300'
                  } w-full rounded-lg`,
                ]}
                placeholder="eg. Wing A, Ashok Deluxe Appartment, Andheri East."
                placeholderTextColor={'rgb(163 163 163)'}
              />
            )}
          />
          <Text
            style={[
              tw`text-red-600 w-full text-[10px] text-right px-2 py-1`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            {errors?.location?.fulladdress?.message}
          </Text>
        </View>

        <View style={[tw`w-full flex-row gap-2 `]}>
          <View style={tw`flex-1`}>
            <Text
              style={[
                tw`text-gray-600 dark:text-gray-300 w-full text-[12px] text-left px-2`,
                {fontFamily: 'Poppins-Regular'},
              ]}>
              Salary:
            </Text>
            <Controller
              control={control}
              name="salary"
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
                      errors?.salary?.message
                        ? 'border-red-500'
                        : 'border-slate-300'
                    } w-full rounded-lg`,
                  ]}
                  placeholder="eg. ₹ 6,600"
                  placeholderTextColor={'rgb(163 163 163)'}
                />
              )}
            />
            <Text
              style={[
                tw`text-red-600 w-full text-[10px] text-right px-2 py-1`,
                {fontFamily: 'Poppins-Regular'},
              ]}>
              {errors?.salary?.message}
            </Text>
          </View>

          <View style={tw`flex-1`}>
            <Text
              style={[
                tw`text-gray-600 dark:text-gray-300 w-full text-[12px] text-left px-2`,
                {fontFamily: 'Poppins-Regular'},
              ]}>
              Job openings available:
            </Text>
            <Controller
              control={control}
              name="numberofopenings"
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  value={value}
                  keyboardType="decimal-pad"
                  autoCapitalize="sentences"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  defaultValue="1"
                  style={[
                    {fontFamily: 'Poppins-Regular'},
                    tw`text-black dark:text-white text-[14px] px-4 py-2 border-[1px] ${
                      errors?.numberofopenings?.message
                        ? 'border-red-500'
                        : 'border-slate-300'
                    } w-full rounded-lg`,
                  ]}
                  placeholder="eg. 1"
                  placeholderTextColor={'rgb(163 163 163)'}
                />
              )}
            />
            <Text
              style={[
                tw`text-red-500 w-full text-[10px] text-right px-2 py-1`,
                {fontFamily: 'Poppins-Regular'},
              ]}>
              {errors?.numberofopenings?.message}
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
                      errors?.location?.pincode?.message
                        ? 'border-red-500'
                        : 'border-slate-300'
                    } w-full rounded-lg`,
                  ]}
                  placeholder="eg. 400021"
                  placeholderTextColor={'rgb(163 163 163)'}
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
                    tw`text-black dark:text-white px-2 border-[1px] ${
                      errors?.location?.city?.message
                        ? 'border-red-500'
                        : 'border-slate-300'
                    } w-full rounded-lg py-1.1`,
                  ]}
                  mode="default"
                  placeholder="Select City"
                  placeholderStyle={[
                    tw`text-[14px] px-2`,
                    {fontFamily: 'Poppins-Regular', color: 'rgb(163 163 163)'},
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
                      errors?.location?.district?.message
                        ? 'border-red-500'
                        : 'border-slate-300'
                    } w-full rounded-lg`,
                  ]}
                  placeholder="eg. Pune"
                  placeholderTextColor={'rgb(163 163 163)'}
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
                      errors?.location?.state?.message
                        ? 'border-red-500'
                        : 'border-slate-300'
                    } w-full rounded-lg`,
                  ]}
                  placeholder="eg. Maharashtra"
                  placeholderTextColor={'rgb(163 163 163)'}
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

        {/* chips */}
        <View style={tw`w-full`}>
          <Text
            style={[
              tw`text-gray-600 dark:text-gray-300 w-full text-[12px] text-left px-2`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            Salary basis:
          </Text>
          <Controller
            control={control}
            render={({field}) => (
              <View
                style={tw`flex flex-wrap flex-row justify-start gap-2 my-2`}>
                {salaryBasisOptionsArray?.map(salaryBasis => (
                  <Chip
                    key={salaryBasis?.label}
                    label={salaryBasis?.label}
                    selected={field.value === salaryBasis?.value}
                    onPress={() => field.onChange(salaryBasis?.value)}
                  />
                ))}
              </View>
            )}
            name="salarybasis"
          />
          <Text
            style={[
              tw`text-red-600 w-full text-[10px] text-left px-2 py-1`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            {errors?.salarybasis?.message}
          </Text>
        </View>

        <View style={tw`w-full`}>
          <Text
            style={[
              tw`text-gray-600 dark:text-gray-300 w-full text-[12px] text-left px-2`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            Select job category:
          </Text>
          <Controller
            control={control}
            render={({field}) => (
              <View
                style={tw`flex flex-wrap flex-row justify-start gap-2 my-2`}>
                {categories?.map(category => (
                  <Chip
                    key={category?.name}
                    label={category?.name}
                    selected={field.value === category?._id}
                    onPress={() => field.onChange(category?._id)}
                  />
                ))}
              </View>
            )}
            name="tags"
          />
          <Text
            style={[
              tw`text-red-600 w-full text-[10px] text-left px-2 py-1`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            {errors?.tags?.message}
          </Text>
        </View>
        {/* chips */}

        <View style={tw`w-full mt-5 items-center`}>
          <Pressable
            disabled={isSubmitting}
            onPress={handleSubmit(createJob)}
            style={({pressed}) =>
              tw`my-3 px-5 py-2 w-1/2 flex-row gap-2 items-center justify-center rounded-xl shadow shadow-zinc-800 ${
                pressed ? `bg-emerald-600` : `bg-emerald-500`
              }`
            }>
            <Icon
              type={Icons.Ionicons}
              name={'briefcase'}
              size={22}
              color={'white'}
            />
            <Text
              style={[
                tw`text-white text-[20px]`,
                {fontFamily: 'Poppins-SemiBold'},
              ]}>
              Post a Job
            </Text>
          </Pressable>
        </View>
      </ScrollView>
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

export default JobPostingForm;

const Chip = ({label, selected, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tw`bg-white  px-4 py-[6px] rounded-full border ${
          selected
            ? `bg-[${primaryBGColor}] border-[${primaryBGColor}]`
            : `border-[${primaryBGColor}] dark:bg-gray-900`
        }`,
      ]}>
      <Text
        style={[
          tw`text-neutral-700 
          ${selected ? `text-white` : `text-[${primaryBGColor}]`}`,
          {fontFamily: 'Poppins-Regular'},
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
