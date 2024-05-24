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
  const { item } = route.params;
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const { myPostedJobs,applyForJob } = useJobStore();
  const userId = useLoginStore((state) => state.loggedInUser?._id);

  const handleBackPress = () => {
    navigation.goBack();
  };
  
  const renderItem = useCallback((item) => {
    return (
      <TouchableOpacity
        style={tw`bg-white p-4 m-2 rounded-lg shadow`}
        onPress={() => {
          setSelectedJob(item);
          setVisible(true);
        }}
        key={item?._id}
      >
        <View style={tw`flex-row justify-between`}>
          <Text style={tw`text-lg font-bold w-1/2`}>{item.jobtitle}</Text>
          <Text style={tw`text-gray-500 w-1/2`}>Openings: {item.numberofopenings}</Text>
        </View>
        <View style={tw`flex-row justify-between`}>
          <Text style={tw`text-gray-500 w-1/2`}>Created: {new Date(item.createdat).toLocaleDateString()}</Text>
          <Text style={tw`text-gray-500 w-1/2`}>Location: {item.location.fulladdress}</Text>

        </View>
        <Text style={tw`text-lg w-full mt-2`}>{item.description}</Text>
      </TouchableOpacity>
    );
  }, []); 
  const hideDialog = () => setVisible(false);

  const handleConfirm = () => {
    setVisible(false);
    console.log("item", item);
    console.log("selectedJob",selectedJob);
    navigation.navigate('Chat', { job: selectedJob });
  };

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
          {myPostedJobs.map((job) => renderItem(job))}
        </ScrollView>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Confirmation!</Dialog.Title>
            <Dialog.Content>
              <Text>Please confirm to initate chat with the {item.firstname} {item.lastname}?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>No</Button>
              <Button onPress={handleConfirm}>Yes</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </SafeAreaView>
    </Provider>
  );
};
