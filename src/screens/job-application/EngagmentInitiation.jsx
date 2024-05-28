import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {View, ScrollView, Pressable} from 'react-native';
import {Text, Button, Dialog, Portal, Provider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import Icon, {Icons} from '../../components/Icons';
import useJobStore from '../../store/jobs.store';
import useLoginStore from '../../store/authentication/login.store';
import {primaryApplyNowButton} from '../../helper/utils/colors';

export const EngagmentInitiation = ({route, navigation}) => {
  const staffid = route.params.staffid;
  const userid = useLoginStore.getState().loggedInUser?._id;
  const [visible, setVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null); // New state for application details
  const [jobApplication, setJobApplication] = useState([]);
  const {myPostedJobs,getNearByJobById, getJobs, getJobApplication, applyForJob} = useJobStore();

  useEffect(() => {
    const fetchJobsAndApplications = async () => {
      await getJobs(0, 100, {createdby: userid, type: 'myPostedJobs'});
      const applications = await getJobApplication({
        employerid: userid,
        appliedby: staffid,
      });
      setJobApplication(applications || []);
    };

    fetchJobsAndApplications();
  }, [userid, staffid, getJobs, getJobApplication]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleConfirm = useCallback(() => {

  }, [selectedJob]);

  const isJobApplied = useCallback(
    jobId => {
      const isApplied = jobApplication?.some(application => {
        return application?.jobDetails?._id === jobId;
      });

      console.log(`Is job ${jobId} applied?`, isApplied);
      return isApplied;
    },
    [jobApplication],
  );

  const getApplicationDetails = useCallback(
    jobId => {
      return jobApplication.find(
        application => application?.jobDetails?._id === jobId,
      );
    },
    [jobApplication],
  );


  const renderJobs = useCallback(
    job => {
      const applied = isJobApplied(job?._id);
      console.log("applice",applied);
      const applicationDetails = getApplicationDetails(job?._id);

      return (
        <View style={tw`bg-white p-4 m-2 rounded-lg shadow`} key={job?._id}>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-lg font-bold w-1/2`}>{job?.jobtitle}</Text>
            <Text style={tw`text-gray-500 w-1/2`}>
              Openings: {job?.numberofopenings}
            </Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-gray-500 w-1/2`}>
              Created: {new Date(job?.createdat).toLocaleDateString()}
            </Text>
            <Text style={tw`text-gray-500 w-1/2`}>
              Location: {job?.location?.fulladdress}
            </Text>
          </View>
          <Text style={tw`text-lg w-full mt-2`}>{job?.description}</Text>
          {applied ? (
            <Text style={tw`text-sm w-full mt-2`}>
              Already active, press chat for conversation
            </Text>
          ) : (
            ''
          )}
          <View style={tw`mt-4`}>
            {applied ? (
              <Button
                mode="contained"
                style={{backgroundColor: primaryApplyNowButton}}
                onPress={() => {
                  navigation.navigate('Chat', {
                    appliedJobId: applicationDetails._id,
                    chatid: applicationDetails.chatid,
                    name: `${applicationDetails.employerDetails.firstname} ${applicationDetails.employerDetails.lastname}`,
                  });
                }}>
                Chat
              </Button>
            ) : (
              <Button
                mode="contained"
                onPress={() => {
                  setSelectedJob(job);
                  setVisible(true);
                  handleConfirm();
                }}>
                Proceed
              </Button>
            )}
          </View>
        </View>
      );
    },
    [isJobApplied, handleConfirm, navigation, getApplicationDetails],
  );

  const PostJob = useCallback(() => {
    return (
      <View>
        <Text>You don't have any Job Posted Yet!</Text>
        <Text>Let's Post Job</Text>
        <Pressable
          onPress={() => {
            navigation.navigate('JobPostingForm');
          }}
          style={({pressed}) => [
            {
              backgroundColor: primaryApplyNowButton,
            },
            tw`px-8 py-[16px] flex flex-row gap-4 justify-center items-center rounded-[16px] mx-8 mt-5 shadow-lg shadow-[${primaryApplyNowButton}]`,
          ]}>
          <Text
            style={[
              tw`text-white text-[16px]`,
              {fontFamily: 'Poppins-SemiBold'},
            ]}>
            Apply Now
          </Text>
        </Pressable>
      </View>
    );
  }, [navigation]);

  const hideDialog = useCallback(() => setVisible(false), []);

  const jobContent = useMemo(() => {
    return myPostedJobs && myPostedJobs.length !== 0 ? (
      myPostedJobs.map(job => renderJobs(job))
    ) : (
      <PostJob />
    );
  }, [myPostedJobs, renderJobs, PostJob]);

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
        <ScrollView contentContainerStyle={tw`p-4`}>{jobContent}</ScrollView>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Confirm</Dialog.Title>
            <Dialog.Content>
              <Text>Are you sure you want to proceed with this job?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button
                onPress={async () => {
                  const res = await applyForJob({
                    jobid: selectedJob?._id,
                    employerid: selectedJob?.employerDetails?._id,
                    initiator: userid,
                    appliedby:staffid
                  });

                  if (res) {
                    const application = await getJobApplication({_id:res});
                    navigation.navigate('Chat', {
                      appliedJobId: application[0]?.jobid, // Use selectedApplication here
                      chatid: application[0]?.chatid, // Use selectedApplication here
                      name: `${application[0]?.employerDetails?.firstname} ${application[0]?.employerDetails?.lastname}`,
                    });
                  }
                  hideDialog();
                }}>
                Yes
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </SafeAreaView>
    </Provider>
  );
};
