import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Icon, {Icons} from '../../components/Icons';
import useLoginStore from '../../store/authentication/login.store';
import {requestLocationPermission} from '../../helper/utils/getGeoLocation';
import Geolocation from 'react-native-geolocation-service';
import {primaryBGColor} from '../../helper/utils/colors';
import useJobStore from '../../store/dashboard.store';

let salaryBasisOptionsArray = [
  {label: 'Monthly', value: 'month'},
  {label: 'Weekly', value: 'week'},
  {label: 'Yearly', value: 'year'},
];
const createJobSchema = yup.object({
  jobtitle: yup.string().required('Job title is required!'),
  description: yup.string().required('Job description is required!'),
  fulladdress: yup.string().required('Job location is required!'),
  salary: yup
    .number()
    .typeError('Job salary in required!')
    .required('Job salary in required!'),
  tags: yup
    .array('Tags are required!')
    .of(yup.string().required('Tag is required'))
    .required('Tags are required!')
    .typeError('Tags are required!'),
});

const JobPostingForm = () => {
  const {loggedInUser} = useLoginStore();
  const [selectedChip, setSelectedChip] = useState(null);
  const {postJobs} = useJobStore();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
    resetField,
    setError,
    clearErrors,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(createJobSchema),
    mode: 'onChange',
    defaultValues: {
      tags: [],
    },
  });

  let tags = watch('tags');

  const createJob = async data => {
    const result =  requestLocationPermission();

    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          async position => {
            let payload = {
              ...data,
              salarybasis: selectedChip,
              createdby: loggedInUser?._id,
              location: {
                fulladdress: data?.fulladdress,
                coordinates: [
                  position?.coords?.longitude,
                  position?.coords?.latitude,
                ],
              },
            };
            delete payload.fulladdress;
            delete payload.tagtext;
            const success = await postJobs(payload);
            if (success) {
              reset();
              setSelectedChip(null);
            }
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      }
    });
  };

  const handleAddTag = value => {
    if (value) {
      if (tags?.findIndex(d => d === value) !== -1) {
        setError('tags', {
          type: 'custom',
          message: 'A unique tag is expected.',
        });
        return;
      }
      if (tags?.length < 3) {
        setValue('tags', [...getValues('tags'), value]);
      } else if (tags?.length === 0) {
        setValue('tags', [value]);
      } else {
        setError('tags', {type: 'custom', message: 'Maximum 3 tags allowed'});
      }
      resetField('tagtext');
      clearErrors('tags');
    } else {
      setError('tags', {type: 'custom', message: 'Please add a tag'});
    }
  };

  const handleRemoveTag = index => {
    setValue(
      'tags',
      tags.filter((tag, i) => i !== index),
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 px-5 bg-white`}>
      <ScrollView
        style={[tw`my-5 mb-[75px]`]}
        contentContainerStyle={{alignItems: 'flex-start'}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <Text
          style={[
            tw`w-auto rounded border-b-4 border-black text-black text-[20px]`,
            {fontFamily: 'Poppins-Bold'},
          ]}>
          Be a Job Provider
        </Text>
        <Text
          style={[
            tw`w-full text-black text-sm my-2 mt-10`,
            {fontFamily: 'Poppins-Regular'},
          ]}>
          Fill out the following details to post the job.
        </Text>

        <View style={tw`w-full`}>
          <Text
            style={[
              tw`text-gray-600 w-full text-[12px] text-left px-2`,
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
                  tw`text-black text-[14px] px-4 py-2 border-[1px] border-slate-300 w-full rounded-lg`,
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
              tw`text-gray-600 w-full text-[12px] text-left px-2`,
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
                  tw`text-black text-[14px] px-4 py-2 border-[1px] border-slate-300 w-full rounded-lg`,
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
              tw`text-gray-600 w-full text-[12px] text-left px-2`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            Job Location:
          </Text>
          <Controller
            control={control}
            name="fulladdress"
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
                  tw`text-black text-[14px] px-4 py-2 border-[1px] border-slate-300 w-full rounded-lg`,
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
            {errors?.fulladdress?.message}
          </Text>
        </View>

        <View style={tw`w-full`}>
          <Text
            style={[
              tw`text-gray-600 w-full text-[12px] text-left px-2`,
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
                  tw`text-black text-[14px] px-4 py-2 border-[1px] border-slate-300 w-full rounded-lg`,
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

        <View style={tw`w-full mb-3`}>
          <Text
            style={[
              tw`text-gray-600 w-full text-[12px] text-left px-2`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            Salary basis:
          </Text>

          <View style={tw`flex flex-row justify-start gap-2 my-2`}>
            {salaryBasisOptionsArray?.map(salaryBasis => (
              <Chip
                key={salaryBasis?.label}
                label={salaryBasis?.label}
                selected={selectedChip === salaryBasis?.value}
                onPress={() => setSelectedChip(salaryBasis?.value)}
              />
            ))}
          </View>
        </View>
        <View style={[tw`w-full`]}>
          <Text
            style={[
              tw`text-gray-600 w-full text-[12px] text-left px-2`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            Tags:
          </Text>
          <View style={[tw`w-full flex-row justify-between items-start`]}>
            <View style={[tw`w-[85%]`]}>
              <Controller
                control={control}
                name="tagtext"
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
                      tw`text-black text-[14px] px-4 py-2 border-[1px] border-slate-300 w-full rounded-lg`,
                    ]}
                    placeholder="eg. Add tags here"
                    placeholderTextColor={'rgb(163 163 163)'}
                  />
                )}
              />
              <Text
                style={[
                  tw`text-red-600 w-full text-[10px] text-right px-2 py-1`,
                  {fontFamily: 'Poppins-Regular'},
                ]}>
                {errors?.tags?.message}
              </Text>
            </View>
            <Pressable
              onPress={() => {
                handleAddTag(watch('tagtext'));
              }}
              style={({pressed}) =>
                tw`flex-row items-center justify-center rounded-lg py-2.5 w-[12%] ${
                  pressed ? 'bg-[#3F3D56]' : 'bg-black'
                }`
              }>
              <Icon
                type={Icons.FontAwesome5}
                name={'plus'}
                size={22}
                color={'white'}
              />
            </Pressable>
          </View>
          <TagsChips tags={tags} handleRemoveTag={handleRemoveTag} />
        </View>

        <View style={tw`w-full mt-5 items-center`}>
          <Pressable
            onPress={handleSubmit(createJob)}
            style={({pressed}) =>
              tw`my-3 px-5 py-2 w-1/2 flex-row gap-2 items-baseline justify-center rounded-xl shadow shadow-zinc-800 ${
                pressed ? 'bg-black' : 'bg-[#0D0D0D]'
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
    </SafeAreaView>
  );
};

export default JobPostingForm;

const styles = StyleSheet.create({});

const Chip = ({label, selected, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tw`bg-white px-4 py-[6px] rounded-full border ${
          selected
            ? `bg-[${primaryBGColor}] border-[${primaryBGColor}]`
            : `border-[${primaryBGColor}]`
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

const TagsChips = ({tags, handleRemoveTag}) => {
  return (
    <View style={[tw`flex flex-row flex-wrap gap-2 mb-1`]}>
      {tags?.map((tag, index) => (
        <View
          key={index}
          style={tw`bg-orange-100 border border-orange-500 py-[2px] pl-2 pr-[2px] rounded-full flex-row gap-2 justify-between items-center `}>
          <Text style={[tw`text-black mx-1`, {fontFamily: 'Poppins-Regular'}]}>
            {tag?.length > 30 ? tag?.slice(0, 30) + '...' : tag}
          </Text>
          <View
            style={tw`rounded-full bg-white  h-7 w-7 items-center justify-center`}>
            <Icon
              type={Icons.Ionicons}
              name={'close'}
              style={tw``}
              onPress={() => {
                handleRemoveTag(index);
              }}
              color={'black'}
              size={15}
            />
          </View>
        </View>
      ))}
    </View>
  );
};