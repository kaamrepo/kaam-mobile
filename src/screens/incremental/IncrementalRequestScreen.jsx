import {
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
  ActivityIndicator,
  useColorScheme,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Icon, { Icons } from '../../components/Icons';
import useLoginStore from '../../store/authentication/login.store';
import useLoaderStore from '../../store/loader.store';
import useUsersStore from '../../store/authentication/user.store';

const requestJobPostingSchema = yup.object({
  requestjobpostings: yup.number().typeError('Enter valid number!').required('This field is required'),
  requestnumberofapplication: yup.number().typeError('Enter valid number!').required('This field is required'),
});

export const IncrementalRequestScreen = ({ navigation }) => {
  const { getUser } = useUsersStore();
  const { isLoading, setLoading } = useLoaderStore();
  const { loggedInUser } = useLoginStore();
  const [requestType, setRequestType] = useState('postingrequest');
  const [user, setUser] = useState({});
  const fullName = `${loggedInUser?.firstname} ${loggedInUser?.lastname}`;

  useEffect(() => {
    const getUserFunction = async () => {
      const response = await getUser();
      if (response.status) {
        setUser(response.user);
      }
    };

    getUserFunction();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(requestJobPostingSchema),
    mode: 'onChange',
  });

  const postRequest = async data => {
    console.log("int he post");
    try {
      setLoading(true);
      data['userid'] = loggedInUser?._id;
      data['type'] = requestType;

      if (requestType === 'postingrequest') {
        data['requestedjobpostingcount'] = data.requestjobpostings;
        data['prevjobpostingcount'] = user.allowedjobposting;
      } else {
        data['requestjobapplicationcount'] = data.requestnumberofapplication;
        data['prevjobapplicationcount'] = user.allowedjobapplication;
      }

      console.log('data latest after adding posts', data);
      const success = undefined;
      // const success = await postJobs(data);
      if (success) {
        // navigation.navigate('Dashboard');
      }
      setLoading(false);
    } catch (error) {
      console.log('JobPostingForm.jsx::postRequest::error', error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white dark:bg-gray-950`}>
      <ScrollView
        style={tw`my-5 mb-[75px]`}
        contentContainerStyle={{ alignItems: 'flex-start' }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={tw`flex-row w-full justify-between mb-5`}>
          <Pressable
            onPress={() => setRequestType('postingrequest')}
            style={[
              tw`flex-1 py-2 rounded-lg mr-2`,
              requestType === 'postingrequest' ? tw`bg-emerald-500` : tw`bg-gray-300`,
            ]}
          >
            <Text
              style={[
                tw`text-center text-white`,
                { fontFamily: 'Poppins-SemiBold' },
              ]}
            >
              Request Posting
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setRequestType('applicationrequest')}
            style={[
              tw`flex-1 py-2 rounded-lg ml-2`,
              requestType === 'applicationrequest' ? tw`bg-emerald-500` : tw`bg-gray-300`,
            ]}
          >
            <Text
              style={[
                tw`text-center text-white`,
                { fontFamily: 'Poppins-SemiBold' },
              ]}
            >
              Request Application
            </Text>
          </Pressable>
        </View>

        <Text
          style={[
            tw`w-full text-black dark:text-white text-lg my-2`,
            { fontFamily: 'Poppins-Regular' },
          ]}
        >
          Looks like you have finished your initial counts, Let's raise a request to get some more!
        </Text>

        <View style={tw`w-full`}>
          <Text
            style={[
              tw`text-gray-600 dark:text-gray-300 w-full text-[12px] text-left px-2`,
              { fontFamily: 'Poppins-Regular' },
            ]}
          >
            Full Name:
          </Text>

          <TextInput
            value={fullName}
            editable={false}
            style={[
              { fontFamily: 'Poppins-Regular' },
              tw`text-black dark:text-white text-[14px] px-4 py-2 border-[1px] w-full rounded-lg`,
            ]}
            placeholder="Name"
            placeholderTextColor={'rgb(163 163 163)'}
          />
        </View>

        {requestType === 'postingrequest' ? (
          <View style={tw`w-full flex-row gap-2 mt-4`}>
            <View style={tw`flex-1`}>
              <Text
                style={[
                  tw`text-gray-600 dark:text-gray-300 w-full text-[12px] text-left px-2`,
                  { fontFamily: 'Poppins-Regular' },
                ]}
              >
                Current Job Posting Count:
              </Text>

              <TextInput
                value={user?.allowedjobposting?.toString() || '0'}
                editable={false}
                style={[
                  { fontFamily: 'Poppins-Regular' },
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
                  { fontFamily: 'Poppins-Regular' },
                ]}
              >
                Requested Postings:
              </Text>
              <Controller
                control={control}
                name="requestjobpostings"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    value={value}
                    keyboardType="decimal-pad"
                    autoCapitalize="sentences"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    defaultValue="1"
                    style={[
                      { fontFamily: 'Poppins-Regular' },
                      tw`text-black dark:text-white text-[14px] px-4 py-2 border-[1px] ${
                        errors?.requestjobpostings?.message
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
                  { fontFamily: 'Poppins-Regular' },
                ]}
              >
                {errors?.requestjobpostings?.message}
              </Text>
            </View>
          </View>
        ) : (
          <View style={tw`w-full flex-row gap-2 mt-4`}>
            <View style={tw`flex-1`}>
              <Text
                style={[
                  tw`text-gray-600 dark:text-gray-300 w-full text-[12px] text-left px-2`,
                  { fontFamily: 'Poppins-Regular' },
                ]}
              >
                Current Application Count:
              </Text>

              <TextInput
                value={user?.allowedjobapplication?.toString() || '0'}
                editable={false}
                style={[
                  { fontFamily: 'Poppins-Regular' },
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
                  { fontFamily: 'Poppins-Regular' },
                ]}
              >
                Requested Applications:
              </Text>
              <Controller
                control={control}
                name="requestnumberofapplication"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    value={value}
                    keyboardType="decimal-pad"
                    autoCapitalize="sentences"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    defaultValue="1"
                    style={[
                      { fontFamily: 'Poppins-Regular' },
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
                  { fontFamily: 'Poppins-Regular' },
                ]}
              >
                {errors?.requestnumberofapplication?.message}
              </Text>
            </View>
          </View>
        )}

        <View style={tw`w-full mt-5 items-center`}>
          <Pressable
            disabled={isSubmitting}
            onPress={()=>{
              
              console.log("pressed");
              handleSubmit(postRequest)}}
            style={({ pressed }) =>
              tw`my-3 px-5 py-2 w-1/2 flex-row gap-2 items-center justify-center rounded-xl shadow shadow-zinc-800 ${
                pressed ? `bg-emerald-600` : `bg-emerald-500`
              }`
            }
          >
            <Icon
              type={Icons.Ionicons}
              name={'briefcase'}
              size={22}
              color={'white'}
            />
            <Text
              style={[
                tw`text-white text-[20px]`,
                { fontFamily: 'Poppins-SemiBold' },
              ]}
            >
              Request
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      {isLoading && (
        <View
          style={[
            tw`absolute top-0 right-0 bottom-0 left-0 bg-transparent justify-center items-center`,
          ]}
        >
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


