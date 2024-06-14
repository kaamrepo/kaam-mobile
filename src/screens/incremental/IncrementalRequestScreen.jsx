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
import {primaryBGColor} from '../../helper/utils/colors';
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
const requestJobPostingSchema = yup.object({
  requestnumberofopenings: yup
    .number()
    .typeError('Enter valid number!'),
  requestnumberofapplication: yup
    .number()
    .typeError('Enter valid number!')
});

export const IncrementalRequestScreen = ({navigation}) => {
  const {isLoading, setLoading} = useLoaderStore();
  const {loggedInUser} = useLoginStore();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(requestJobPostingSchema),
    mode: 'onChange',
  });

  const postRequest = async data => {
    try {
      setLoading(true);
      data['userid'] = loggedInUser?._id;
      data['prevallowedjobposting'] = data?.requestnumberofopenings || 0;
      data['prevallowedjobapplication'] = data?.requestnumberofapplication || 0;
   
        console.log("data latest",data);
    const success =undefined;
    // const success = await postJobs(data);
    if (success) {
      
    //   navigation.navigate('Dashboard');
    }
    setLoading(false)
} catch (error) {
    console.log('JobPostingForm.jsx::postRequest::error', error);
  }
  };

  const fullName = `${loggedInUser?.firstname} ${loggedInUser?.lastname}`;
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
          Looks like you have finished your initial job posting, Lets raise
          request to get some more!
        </Text>
        <View style={tw`w-full`}>
          <Text
            style={[
              tw`text-gray-600 dark:text-gray-300 w-full text-[12px] text-left px-2`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            Full Name:
          </Text>

          <TextInput
            value={fullName}
            style={[
              {fontFamily: 'Poppins-Regular'},
              tw`text-black dark:text-white text-[14px] px-4 py-2 border-[1px]  w-full rounded-lg`,
            ]}
            placeholder="Name"
            placeholderTextColor={'rgb(163 163 163)'}
          />
        </View>

        <View style={[tw`w-full flex-row gap-2 `]}>
          <View style={tw`flex-1`}>
            <Text
              style={[
                tw`text-gray-600 dark:text-gray-300 w-full text-[12px] text-left px-2`,
                {fontFamily: 'Poppins-Regular'},
              ]}>
              Current Job posting count
            </Text>

            <TextInput
              value={loggedInUser?.allowedjobposting.toString()}
              disabled={true}
              style={[
                {fontFamily: 'Poppins-Regular'},
                tw`text-black dark:text-white text-[14px] px-4 py-2 border-[1px] w-full rounded-lg`,
              ]}
              placeholder="10"
              placeholderTextColor={'rgb(163 163 163)'}
            />
          </View>

          <View style={tw`flex-1`}>
            <Text
              style={[
                tw`text-gray-600 dark:text-gray-300 w-full text-[12px] text-left px-2`,
                {fontFamily: 'Poppins-Regular'},
              ]}>
              Requested Postings:
            </Text>
            <Controller
              control={control}
              name="requestnumberofopenings"
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
                      errors?.requestnumberofopenings?.message
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
              {errors?.requestnumberofopenings?.message}
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
              Current Application count
            </Text>

            <TextInput
              value={loggedInUser?.allowedjobapplication.toString()}
              disabled={true}
              style={[
                {fontFamily: 'Poppins-Regular'},
                tw`text-black dark:text-white text-[14px] px-4 py-2 border-[1px] w-full rounded-lg`,
              ]}
              placeholder="10"
              placeholderTextColor={'rgb(163 163 163)'}
            />
          </View>

          <View style={tw`flex-1`}>
            <Text
              style={[
                tw`text-gray-600 dark:text-gray-300 w-full text-[12px] text-left px-2`,
                {fontFamily: 'Poppins-Regular'},
              ]}>
              Requested Applicaitons:
            </Text>
            <Controller
              control={control}
              name="requestnumberofapplication"
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
                      errors?.requestnumberofapplication?.message
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
              {errors?.requestnumberofapplication?.message}
            </Text>
          </View>
        </View>
        <View style={tw`w-full mt-5 items-center`}>
          <Pressable
            disabled={isSubmitting}
            onPress={handleSubmit(postRequest)}
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
              Request
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
