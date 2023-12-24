import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Icon, {Icons} from '../../components/Icons';
import useLoginStore from '../../store/authentication/login.store';
import {requestLocationPermission} from '../../helper/utils/getGeoLocation';
import Geolocation from 'react-native-geolocation-service';

let salaryBasisOptionsArray = [
  {label: 'Monthly', value: 'month'},
  {label: 'Weekly', value: 'week'},
  {label: 'Yearly', value: 'year'},
];
const createJobSchema = yup.object({
  jobTitle: yup.string().required('Job title is required!'),
  description: yup.string().required('Job description is required!'),
  // tags: yup.array().of(yup.string()).min(1).max(3),
  salary: yup
    .number()
    .typeError('Job salary in required!')
    .required('Job salary in required!'),

  tags: yup
    .array()
    .of(yup.string().required('Tag is required'))
    .unique('Tags must be unique')
    .min(3, 'Must have at least 3 tags')
    .max(3, 'Can have a maximum of 3 tags'),
});

const JobPostingForm = () => {
  const {loggedInUser} = useLoginStore();
  const [selectedBGColor, setSelectedBGColor] = useState('#3a86ff');
  const [selectedColor, setSelectedColor] = useState('#e0e1dd');
  const [tagText, setTagText] = useState('');
  const [tags, setTags] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedChip, setSelectedChip] = useState(null);
  const [location, setLocation] = useState(undefined);
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(createJobSchema),
    mode: 'onChange',
  });

  const createJob = async data => {
    if (tags?.length === 0) {
      setErrorMessage('#Tags are required!');
      return;
    }
    if (tags?.length < 3) {
      setErrorMessage('Add 3 tags to the job');
      return;
    }
    const result = await requestLocationPermission();
    console.log('result ❤️❤️❤️', result);
    result.then(async res => {
      if (res) {
        Geolocation.getCurrentPosition(
          positionData => {
            setLocation(positionData);
          },
          error => {
            console.log(error.code, error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000,
          },
        );
      }
    });

    const {latitude, longitude} = location.coords;
    console.log(location.coords);
    let payload = {
      ...data,
      tags: tags,
      salarybasis: selectedChip,
      createdby: loggedInUser?._id,
      location: {
        coordinates: [73.79129551693173, 18.54582873149234],
        name: 'Pune, Pashan',
      },
      styles: {
        bgcolor: selectedBGColor,
        color: selectedColor,
      },
    };

    // postJobs(payload);
    setTags([]);
    reset();
    setSelectedChip(null);
  };

  useEffect(() => {
    if (tags?.length === 3) setErrorMessage('');
  }, [tags]);

  return (
    <SafeAreaView style={tw`flex-1 px-5 bg-white`}>
      <ScrollView
        style={[tw`my-5 mb-[75px]`]}
        contentContainerStyle={{alignItems: 'flex-start'}}
        showsVerticalScrollIndicator={false}>
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
            name="jobTitle"
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
                placeholder="eg. Software Engineer."
                placeholderTextColor={'rgb(163 163 163)'}
              />
            )}
          />
          <Text
            style={[
              tw`text-red-600 w-full text-[10px] text-right px-2 py-1`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            {errors?.jobTitle?.message}
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
                placeholder="eg. A senior developer role that require high skills..."
                placeholderTextColor={'rgb(163 163 163)'}
              />
            )}
          />
          <Text
            style={[
              tw`text-red-600 w-full text-[10px] text-right px-2 py-1`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            {' '}
            {errors?.description?.message}
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
                placeholder="eg. ₹ 34,600"
                placeholderTextColor={'rgb(163 163 163)'}
              />
            )}
          />
          <Text
            style={[
              tw`text-red-600 w-full text-[10px] text-right px-2 py-1`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            {' '}
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
            #Tags:
          </Text>
          <View style={[tw`w-full flex-row`]}>
            <TextInput
              maxLength={100}
              value={tagText}
              keyboardType="default"
              autoCapitalize="sentences"
              onChangeText={setTagText}
              style={[
                {fontFamily: 'Poppins-Regular'},
                tw`text-black text-[14px] px-4 py-2 border-[1px] border-slate-300 w-[88%] rounded-l-lg`,
              ]}
              placeholder="Add tags here"
              placeholderTextColor={'rgb(163 163 163)'}
            />
            <Pressable
              onPress={() => {
                if (tagText) {
                  if (tags?.length === 0)
                    setErrorMessage('#Tags are required!');
                  else if (tags?.findIndex(tag => tag === tagText))
                    setErrorMessage('Tag already added');
                  else if (tags?.length < 3)
                    setErrorMessage('Add 3 tags to the job');
                  else if (!tags) {
                    setTags([tagText]);
                    setTagText('');
                  } else {
                    setTags([...tags, tagText]);
                    setTagText('');
                  }
                }
              }}
              style={({pressed}) =>
                tw`flex-row items-center justify-center rounded-r-xl w-[12%] ${
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
          <Text
            style={[
              tw`text-red-600 w-full text-[10px] text-right px-2 py-1`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            {' '}
            {errorMessage}
          </Text>

          <View style={[tw`flex flex-row flex-wrap gap-2 mb-1`]}>
            {tags?.map((tag, index) => (
              <View
                key={index}
                style={tw`bg-orange-100 border border-orange-500 py-[2px] pl-2 pr-[2px] rounded-full flex-row gap-2 justify-between items-center `}>
                <Text
                  style={[
                    tw`text-black mx-1`,
                    {fontFamily: 'Poppins-Regular'},
                  ]}>
                  {tag?.length > 30 ? tag?.slice(0, 30) + '...' : tag}
                </Text>
                <View
                  style={tw`rounded-full bg-white  h-7 w-7 items-center justify-center`}>
                  <Icon
                    type={Icons.Ionicons}
                    name={'close'}
                    style={tw``}
                    onPress={() => {
                      setTags(tags.filter((t, i) => i !== index));
                    }}
                    color={'black'}
                    size={15}
                  />
                </View>
              </View>
            ))}
          </View>
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
        tw`bg-gray-200 px-4 py-[6px] rounded-full border border-transparent`,
        selected ? tw`bg-[#282828]` : null,
      ]}>
      <Text
        style={[
          tw`text-neutral-700`,
          selected ? tw`text-white` : null,
          {fontFamily: 'Poppins-Regular'},
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
