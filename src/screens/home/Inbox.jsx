import {
  StyleSheet,
  Text,
  View,
  FlatList,
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

import WhiteTickSMSVG from '../../assets/svgs/WhiteTickSM.svg';
import useLoginStore from '../../store/authentication/login.store';
import useJobStore from '../../store/dashboard.store';

const colors = [
  '#ffffff',
  '#000000',
  '#264653',
  '#bc6c25',
  '#f4acb7',
  '#2a9d8f',
  '#e76f51',
  '#fca311',
  '#023e8a',
  '#588157',
  '#48cae4',
  '#ffd6ff',
  '#ae2012',
  '#1b263b',
  '#e0e1dd',
  '#333333',
  '#e63946',
  '#3a86ff',
  '#ffc300',
  '#a8dadc',
  '#ffd60a',
  '#38b000',
];

const createJobSchema = yup.object({
  position: yup.string().required('Job position is required!'),
  description: yup.string().required('Job description is required!'),
  requirements: yup.string().required('Job requirements is required!'),
  tags: yup.array().of(yup.string()).min(1).max(3),
  about: yup.string().required('Mention about the job!'),
  salary: yup.number().required('Job salary in required!'),
});

const Inbox = () => {
  const {loggedInUser} = useLoginStore();
  const {postJobs} = useJobStore();
  const [selectedBGColor, setSelectedBGColor] = useState('#3a86ff');
  const [selectedColor, setSelectedColor] = useState('#e0e1dd');
  const [tagText, setTagText] = useState('');
  const [tags, setTags] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedChip, setSelectedChip] = useState(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(createJobSchema),
    mode: 'onChange',
  });

  const Item = ({color, setColor, c}) => (
    <Pressable
      key={color}
      style={({pressed}) => [
        tw` h-10 w-10 mr-2 shadow-lg rounded-2 overflow-hidden`,
      ]}
      onPress={() => setColor(color)}>
      <View style={[tw`h-10 w-10`, {backgroundColor: color}]}>
        {color === c ? <WhiteTickSMSVG /> : null}
      </View>
    </Pressable>
  );

  const createJob = data => {
    if (tags?.length === 0) {
      setErrorMessage('#Tags are required!');
      return;
    }
    if (tags?.length < 3) {
      setErrorMessage('Add 3 tags to the job');
      return;
    }

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

    postJobs(payload);
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
        style={[tw`my-5 mt-9`]}
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
              tw`text-gray-600 w-full text-[11px] text-left px-2`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            position:
          </Text>
          <Controller
            control={control}
            name="position"
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
            {' '}
            {errors?.position?.message}
          </Text>
        </View>

        <View style={tw`w-full`}>
          <Text
            style={[
              tw`text-gray-600 w-full text-[11px] text-left px-2`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            Description:
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
              tw`text-gray-600 w-full text-[11px] text-left px-2`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            Requirements:
          </Text>
          <Controller
            control={control}
            name="requirements"
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
                placeholder={`eg. 1. Highly skilled in Javascript programming...`}
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
            {errors?.requirements?.message}
          </Text>
        </View>

        <View style={tw`w-full`}>
          <Text
            style={[
              tw`text-gray-600 w-full text-[11px] text-left px-2`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            About:
          </Text>
          <Controller
            control={control}
            name="about"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                value={value}
                keyboardType="default"
                multiline
                autoCapitalize="sentences"
                onChangeText={onChange}
                onBlur={onBlur}
                style={[
                  {fontFamily: 'Poppins-Regular'},
                  tw`text-black text-[14px] px-4 py-2 border-[1px] border-slate-300 w-full rounded-lg`,
                ]}
                placeholder="eg. Related to web development..."
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
            {errors?.about?.message}
          </Text>
        </View>

        <View style={tw`w-full`}>
          <Text
            style={[
              tw`text-gray-600 w-full text-[11px] text-left px-2`,
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
              tw`text-gray-600 w-full text-[11px] text-left px-2`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            Salary basis:
          </Text>

          <View style={tw`flex flex-row justify-start gap-2 my-2`}>
            <Chip
              label="Monthly"
              selected={selectedChip === 'month'}
              onPress={() => setSelectedChip('month')}
            />
            <Chip
              label="Weekly"
              selected={selectedChip === 'week'}
              onPress={() => setSelectedChip('week')}
            />
            <Chip
              label="Yearly"
              selected={selectedChip === 'year'}
              onPress={() => setSelectedChip('year')}
            />
          </View>
        </View>

        <View style={[tw`w-full`]}>
          <Text
            style={[
              tw`text-gray-600 w-full text-[11px] text-left px-2`,
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
                  if (tags?.length < 3)
                    setErrorMessage('Add 3 tags to the job');
                  if (!tags) {
                    setTags([tagText]);
                  } else {
                    setTags([...tags, tagText]);
                  }
                  setTagText('');
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

        <View>
          <Text
            style={[
              tw`text-gray-600 w-full text-[11px] text-left px-2`,
              {fontFamily: 'Poppins-Medium'},
            ]}>
            Theme:
          </Text>
          <Text
            style={[
              tw`text-gray-600 w-full text-[11px] text-left px-2 mb-1`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            Background Color:
          </Text>

          <View style={tw`h-10 mb-2 rounded-2`}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              scrollEnabled
              horizontal={true}
              data={colors}
              renderItem={({item}) => (
                <Item
                  color={item}
                  c={selectedBGColor}
                  setColor={setSelectedBGColor}
                />
              )}
              keyExtractor={item => item}
            />
          </View>
          <Text
            style={[
              tw`text-gray-600 w-full text-[11px] text-left px-2  mb-1`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            Text Color:
          </Text>

          <View style={tw`h-10 mb-2`}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              scrollEnabled
              horizontal={true}
              data={colors}
              renderItem={({item}) => (
                <Item
                  color={item}
                  c={selectedColor}
                  setColor={setSelectedColor}
                />
              )}
              keyExtractor={item => item}
            />
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

export default Inbox;

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
