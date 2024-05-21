import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { View, FlatList, TouchableOpacity,Pressable } from 'react-native';
import { Text, Button, Dialog, Portal, Provider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import Icon,{Icons} from '../../components/Icons';
import useJobStore from '../../store/jobs.store';
import useLoginStore from '../../store/authentication/login.store';
export const EngagmentInitiation = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const {getMyPostedJobs,myPostedJobs} = useJobStore()
  const handleBackPress = () => {
    navigation.goBack();
  };
  useEffect(()=>{
    const userid = useLoginStore.getState().loggedInUser?._id;
    getMyPostedJobs({createdby:userid});
    console.log("myPostedJobs",myPostedJobs);
  },[])

  // Constant array of job objects
  const jobs = useMemo(() => [
    {
      _id: { $oid: "664b2d841f4f0f3bed56908" },
      salarybasis: "month",
      salary: 1234,
      description: "First job by First user",
      jobtitle: "First Job First",
      location: {
        fulladdress: "pune",
        coordinates: [-122.084, 37.4219983],
        type: "Point"
      },
      numberofopenings: 1,
      isactive: true,
      createdby: { $oid: "664b2bcb1f4f0f3bed569084" },
      createdat: { $date: "2024-05-20T11:01:24.629Z" }
    },
    {
      _id: { $oid: "664b2d841f40f3bed569086" },
      salarybasis: "month",
      salary: 1234,
      description: "First job by First user",
      jobtitle: "First Job First",
      location: {
        fulladdress: "pune",
        coordinates: [-122.084, 37.4219983],
        type: "Point"
      },
      numberofopenings: 1,
      isactive: true,
      createdby: { $oid: "664b2bcb1f4f0f3bed569084" },
      createdat: { $date: "2024-05-20T11:01:24.629Z" }
    },
    {
      _id: { $oid: "664b2d841f0f3bed569086" },
      salarybasis: "month",
      salary: 1234,
      description: "First job by First user",
      jobtitle: "First Job First",
      location: {
        fulladdress: "pune",
        coordinates: [-122.084, 37.4219983],
        type: "Point"
      },
      numberofopenings: 1,
      isactive: true,
      createdby: { $oid: "664b2bcb1f4f0f3bed569084" },
      createdat: { $date: "2024-05-20T11:01:24.629Z" }
    },
    {
      _id: { $oid: "664b2d841f4f0f3bed9086" },
      salarybasis: "month",
      salary: 1234,
      description: "First job by First user",
      jobtitle: "First Job First",
      location: {
        fulladdress: "pune",
        coordinates: [-122.084, 37.4219983],
        type: "Point"
      },
      numberofopenings: 1,
      isactive: true,
      createdby: { $oid: "664b2bcb1f4f0f3bed569084" },
      createdat: { $date: "2024-05-20T11:01:24.629Z" }
    },
    {
      _id: { $oid: "664b2df4f0f3bed569086" },
      salarybasis: "month",
      salary: 1234,
      description: "First job by First user",
      jobtitle: "First Job First",
      location: {
        fulladdress: "pune",
        coordinates: [-122.084, 37.4219983],
        type: "Point"
      },
      numberofopenings: 1,
      isactive: true,
      createdby: { $oid: "664b2bcb1f4f0fd569084" },
      createdat: { $date: "2024-05-20T11:01:24.629Z" }
    },
    {
      _id: { $oid: "664b2d841f4f0f3bed569086" },
      salarybasis: "month",
      salary: 1234,
      description: "First job by First user",
      jobtitle: "First Job First",
      location: {
        fulladdress: "pune",
        coordinates: [-122.084, 37.4219983],
        type: "Point"
      },
      numberofopenings: 1,
      isactive: true,
      createdby: { $oid: "66b2bcb1f4f0fd569084" },
      createdat: { $date: "2024-05-20T11:01:24.629Z" }
    },
    // Add more objects as needed
    {
      _id: { $oid: "664d841f4f0f3bed569087" },
      salarybasis: "month",
      salary: 1500,
      description: "Second job by Second user",
      jobtitle: "Second Job Second",
      location: {
        fulladdress: "mumbai",
        coordinates: [-122.084, 37.4219983],
        type: "Point"
      },
      numberofopenings: 2,
      isactive: true,
      createdby: { $oid: "664b2bcb1f4f0f3bed569085" },
      createdat: { $date: "2024-05-21T11:01:24.629Z" }
    },
    {
      _id: { $oid: "664b2d841f4f0f3bed569088" },
      salarybasis: "month",
      salary: 2000,
      description: "Third job by Third user",
      jobtitle: "Third Job Third",
      location: {
        fulladdress: "delhi",
        coordinates: [-122.084, 37.4219983],
        type: "Point"
      },
      numberofopenings: 3,
      isactive: true,
      createdby: { $oid: "664b2bcb1f4f0f3bed569086" },
      createdat: { $date: "2024-05-22T11:01:24.629Z" }
    },
    {
      _id: { $oid: "664b2d841f4f0f3bed569089" },
      salarybasis: "month",
      salary: 2500,
      description: "Fourth job by Fourth user",
      jobtitle: "Fourth Job Fourth",
      location: {
        fulladdress: "bangalore",
        coordinates: [-122.084, 37.4219983],
        type: "Point"
      },
      numberofopenings: 4,
      isactive: true,
      createdby: { $oid: "664b2bcb1f4f0f3bed569087" },
      createdat: { $date: "2024-05-23T11:01:24.629Z" }
    },
    {
      _id: { $oid: "664b2d841f4f0f3bed569090" },
      salarybasis: "month",
      salary: 3000,
      description: "Fifth job by Fifth user",
      jobtitle: "Fifth Job Fifth",
      location: {
        fulladdress: "chennai",
        coordinates: [-122.084, 37.4219983],
        type: "Point"
      },
      numberofopenings: 5,
      isactive: true,
      createdby: { $oid: "664b2bcb1f4f0f3bed569088" },
      createdat: { $date: "2024-05-24T11:01:24.629Z" }
    }
  ], []);

  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity 
      style={tw`bg-white p-4 m-2 rounded-lg shadow`} 
      onPress={() => {
        setSelectedJob(item);
        setVisible(true);
      }}
    >
      <Text style={tw`text-lg font-bold`}>{item.jobtitle}</Text>
      <Text style={tw`text-gray-500`}>Created: {new Date(item.createdat.$date).toLocaleDateString()}</Text>
      <Text style={tw`text-gray-500`}>Openings: {item.numberofopenings}</Text>
      <Text style={tw`text-gray-500`}>Location: {item.location.fulladdress}</Text>
    </TouchableOpacity>
  ), []);

  const hideDialog = () => setVisible(false);

  const handleConfirm = () => {
    setVisible(false);
    navigation.navigate('Chat', { job: selectedJob });
  };

  return (
    <Provider>
      <SafeAreaView style={tw`flex-1`}>
      <Pressable
          onPress={handleBackPress}
          style={({pressed}) => [
            tw`p-2 rounded-full ${pressed ? 'bg-black/20' : ''}`,
          ]}>
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
        <FlatList
          data={jobs}
          keyExtractor={(item) => item._id.$oid}
          renderItem={renderItem}
          contentContainerStyle={tw`p-4`}
        />
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Confirmation</Dialog.Title>
            <Dialog.Content>
              <Text>Do you want to navigate to chat for this job?</Text>
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
