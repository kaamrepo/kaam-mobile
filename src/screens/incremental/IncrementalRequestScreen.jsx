import {
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import Icon, { Icons } from '../../components/Icons';
import useLoginStore from '../../store/authentication/login.store';
import useLoaderStore from '../../store/loader.store';
import useUsersStore from '../../store/authentication/user.store';
import useApprovalStore from '../../store/approval.store';

export const IncrementalRequestScreen = ({navigation }) => {
  console.log("navigation",navigation);
  const { getUser } = useUsersStore();
  const { postApproval } = useApprovalStore();
  const { isLoading, setLoading } = useLoaderStore();
  const { loggedInUser } = useLoginStore();
  const [requestType, setRequestType] = useState('jobposting');
  const [user, setUser] = useState({});
  const [requestJobPostings, setRequestJobPostings] = useState('');
  const [requestNumberOfApplication, setRequestNumberOfApplication] = useState('');
  const [errors, setErrors] = useState({});
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

  const validate = () => {
    let valid = true;
    const errors = {};

    if (requestType === 'jobposting' && !requestJobPostings) {
      errors.requestJobPostings = 'This field is required';
      valid = false;
    } else if (requestType === 'jobposting' && isNaN(requestJobPostings)) {
      errors.requestJobPostings = 'Enter a valid number';
      valid = false;
    }

    if (requestType === 'jobapplication' && !requestNumberOfApplication) {
      errors.requestNumberOfApplication = 'This field is required';
      valid = false;
    } else if (requestType === 'jobapplication' && isNaN(requestNumberOfApplication)) {
      errors.requestNumberOfApplication = 'Enter a valid number';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const postRequest = async () => {
    if (!validate()) return;

    const data = {
      requestor: loggedInUser?._id,
      requesttype: requestType,
    };

    if (requestType === 'jobposting') {
      data.requestedjobposting = Number(requestJobPostings);
    } else {
      data.requestedjobapplication = Number(requestNumberOfApplication);    }
    try {
      setLoading(true);
      const success = postApproval(data); // const success = await postJobs(data);
      if (success) {
        console.log("in the",navigation);
        navigation.navigate('Dashboard');
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
            onPress={() => setRequestType('jobposting')}
            style={[
              tw`flex-1 py-2 rounded-lg mr-2`,
              requestType === 'jobposting' ? tw`bg-emerald-500` : tw`bg-gray-300`,
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
            onPress={() => setRequestType('jobapplication')}
            style={[
              tw`flex-1 py-2 rounded-lg ml-2`,
              requestType === 'jobapplication' ? tw`bg-emerald-500` : tw`bg-gray-300`,
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

        {requestType === 'jobposting' ? (
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
              <TextInput
                value={requestJobPostings}
                onChangeText={setRequestJobPostings}
                keyboardType="decimal-pad"
                style={[
                  { fontFamily: 'Poppins-Regular' },
                  tw`text-black dark:text-white text-[14px] px-4 py-2 border-[1px] ${
                    errors?.requestJobPostings ? 'border-red-500' : 'border-slate-300'
                  } w-full rounded-lg`,
                ]}
                placeholder="e.g. 1"
                placeholderTextColor={'rgb(163 163 163)'}
              />
              <Text
                style={[
                  tw`text-red-500 w-full text-[10px] text-right px-2 py-1`,
                  { fontFamily: 'Poppins-Regular' },
                ]}
              >
                {errors?.requestJobPostings}
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
              <TextInput
                value={requestNumberOfApplication}
                onChangeText={setRequestNumberOfApplication}
                keyboardType="decimal-pad"
                style={[
                  { fontFamily: 'Poppins-Regular' },
                  tw`text-black dark:text-white text-[14px] px-4 py-2 border-[1px] ${
                    errors?.requestNumberOfApplication ? 'border-red-500' : 'border-slate-300'
                  } w-full rounded-lg`,
                ]}
                placeholder="e.g. 1"
                placeholderTextColor={'rgb(163 163 163)'}
              />
              <Text
                style={[
                  tw`text-red-500 w-full text-[10px] text-right px-2 py-1`,
                  { fontFamily: 'Poppins-Regular' },
                ]}
              >
                {errors?.requestNumberOfApplication}
              </Text>
            </View>
          </View>
        )}

        <View style={tw`w-full mt-5 items-center`}>
          <Pressable
            disabled={isLoading}
            onPress={postRequest}
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
