import React, { useState, useCallback, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { Text, Button, Dialog, Portal, Provider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import Icon, { Icons } from '../../components/Icons';
import useJobStore from '../../store/jobs.store';
import useLoginStore from '../../store/authentication/login.store';

export const EngagmentInitiation = ({ route }) => {
  const { user } = route.params;
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const { myPostedJobs, applyForJob } = useJobStore();
  const { loggedInUser } = useLoginStore();

  const handleBackPress = () => {
    navigation.goBack();
  };
  

  const renderJobs = useCallback((job) => {
    return (
      <TouchableOpacity
        style={tw`bg-white p-4 m-2 rounded-lg shadow`}
        onPress={() => {
          setSelectedJob(job);
          setVisible(true);
          handleConfirm();
        }}
        key={job?._id}
      >
        <View style={tw`flex-row justify-between`}>
          <Text style={tw`text-lg font-bold w-1/2`}>{job?.jobtitle}</Text>
          <Text style={tw`text-gray-500 w-1/2`}>Openings: {job?.numberofopenings}</Text>
        </View>
        <View style={tw`flex-row justify-between`}>
          <Text style={tw`text-gray-500 w-1/2`}>Created: {new Date(job?.createdat).toLocaleDateString()}</Text>
          <Text style={tw`text-gray-500 w-1/2`}>Location: {job?.location?.Content?.fulladdress}</Text>
        </View>
        <Text style={tw`text-lg w-full mt-2`}>{job?.description}</Text>
      </TouchableOpacity>
    );
  }, []);

  const hideDialog = () => setVisible(false);

  const handleConfirm = useCallback(async () => {
    // setVisible(false);
    // const res = await applyForJob({
    //   jobid: selectedJob?._id,
    //   employerid: selectedJob?.createdby,
    //   initiator: loggedInUser?._id,
    // });
    // console.log("res ----", res);
    // navigation.navigate('Chat', { job: selectedJob });
    console.log("pressed job", selectedJob);
  }, [selectedJob, loggedInUser, applyForJob]);

  return (
    <Provider>
      <SafeAreaView style={tw`flex-1`}>
        <Pressable
          onPress={handleBackPress}
          style={({ pressed }) => [
            tw`p-2 rounded-full ${pressed ? 'bg-black/20' : ''}`,
          ]}
        >
          <Icon
            type={Icons.Ionicons}
            name="chevron-back"
            size={25}
            color={'black'}
          />
        </Pressable>
        <View style={tw`p-4 bg-gray-100`}>
          <Text style={tw`text-xl font-bold`}>Please Select Job to Hire</Text>
        </View>
        <ScrollView contentContainerStyle={tw`p-4`}>
          {myPostedJobs.map((job) => renderJobs(job))}
        </ScrollView>
        {/* <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Confirmation!</Dialog.Title>
            <Dialog.Content>
              <Text>
                Please confirm to initiate chat with {user?.firstname} {user?.lastname}?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>No</Button>
              <Button onPress={handleConfirm}>Yes</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal> */}
      </SafeAreaView>
    </Provider>
  );
};
