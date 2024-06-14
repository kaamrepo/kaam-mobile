import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  Alert,
  Modal,
  Pressable,
  
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import GeneralStatusBar from '../../components/GeneralStatusBar';
import tw from 'twrnc';
import useMenuStore from '../../store/menu.store';
import {useState, useEffect} from 'react';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';
import useLoaderStore from '../../store/loader.store';
import { Portal, Dialog,Provider,Button } from 'react-native-paper';
export const ApplicantListScreen = ({
  route: {
    params: {job},
  },
}) => {
  useColorScheme();
  return (
    <Provider>
    <SafeAreaView style={tw`flex-1`} edges={['top']}>
      <GeneralStatusBar />
      <View style={tw`flex-1 bg-slate-100 dark:bg-gray-950 p-5`}>
        <JobCard job={job} />
        <ApplicantList job={job} />
      </View>
    </SafeAreaView>
    </Provider>
  );
};

const JobCard = ({job}) => {
  const {applicantList} = useMenuStore();
  return (
    <View style={tw`p-5 bg-white dark:bg-gray-800 rounded-xl w-full`}>
      <View style={tw`flex-row justify-between`}>
        <Text
          style={[
            tw`text-black dark:text-white text-lg`,
            {fontFamily: 'Poppins-Bold'},
          ]}>
          {job.jobtitle}
        </Text>
        <Text
          style={[
            tw`text-black dark:text-white px-2 rounded ${
              job.isactive ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`,
            {fontFamily: 'Poppins-SemiBold'},
          ]}>
          {job.isactive ? 'Active' : 'Inactive'}
        </Text>
      </View>
      <View style={tw`mt-3 p-3 bg-slate-100 dark:bg-gray-900 rounded`}>
        <View style={tw`flex-row gap-2`}>
          <Text
            style={[
              tw`text-black dark:text-gray-300`,
              {fontFamily: 'Poppins-Bold'},
            ]}>
            Location
          </Text>
          <Text
            style={[
              tw`text-black dark:text-gray-300`,
              {fontFamily: 'Poppins-Bold'},
            ]}>
            {job.location.fulladdress}
          </Text>
        </View>
        <View style={tw`flex-row gap-2`}>
          <Text
            style={[
              tw`text-black dark:text-gray-300`,
              {fontFamily: 'Poppins-Bold'},
            ]}>
            Salary
          </Text>
          <Text
            style={[
              tw`text-black dark:text-gray-300`,
              {fontFamily: 'Poppins-Bold'},
            ]}>
            {`₹ ${new Intl.NumberFormat('en-IN', {
              maximumSignificantDigits: 3,
            }).format(job.salary)}/${job.salarybasis}`}
          </Text>
        </View>
        <View style={tw`flex-row gap-2`}>
          <Text
            style={[
              tw`text-black dark:text-gray-300`,
              {fontFamily: 'Poppins-Bold'},
            ]}>
            Total {applicantList?.total ?? 0} Application(s)
          </Text>
        </View>
      </View>
    </View>
  );
};

const ApplicantList = ({job}) => {
  const {applicantList, getApplicantsList, clearApplicantList} = useMenuStore();
  const [refreshing, setRefreshing] = useState(false);
  const {isLoading} = useLoaderStore();

  useEffect(() => {
    if (job?._id) {
      getApplicantsList(0, 10, job._id);
      return () => {
        clearApplicantList();
      };
    }
  }, [job?._id]);

  const refreshApplicantsData = async () => {
    setRefreshing(true);
    await getApplicantsList(0, 10, job._id);
    setRefreshing(false);
  };

  const fetchMoreApplicantsData = async () => {
    if (applicantList) {
      let {skip, total, limit} = applicantList;
      if (applicantList && skip < total) {
        skip = skip + limit;
        await getApplicantsList(skip, limit, job._id);
      }
    }
  };


  return (
    <FlatList
      style={tw`rounded-xl bg-white dark:bg-gray-800 mt-5 mb-3 py-3 overflow-hidden`}
      data={applicantList?.data}
      renderItem={({item, index}) => <RenderItem item={item} index={index} />}
      keyExtractor={item => item._id.toString()}
      onEndReachedThreshold={0.2}
      onEndReached={fetchMoreApplicantsData}
      ListEmptyComponent={
        <NoDataMenuComponent message={'Applicant not found'} />
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refreshApplicantsData}
        />
      }
      ListFooterComponent={
        <FooterComponent isLoading={isLoading} refreshing={refreshing} />
      }
    />
  );
};

const RenderItem = ({item, index}) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const handleCompletePress = () => {
    setVisible(true);
  };

  const handleConfirmComplete = () => {
    setVisible(false);
    // Handle the complete action here
  };

  const handleCancelComplete = () => {
    setVisible(false);
  };

  return (
    <>
    <View style={tw`shadow-2xl mb-2 border-dotted border-2 border-sky-500 bg-white`}>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Chat', {
            chatid: item.chatid,
            name: `${item.applicantDetails.firstname} ${item.applicantDetails.lastname}`,
            item,
          });
        }}
        style={tw`w-full p-2 flex-row gap-3 items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-950`}>
        <View style={tw`w-10 h-10 rounded-full items-center justify-center bg-slate-300 dark:bg-gray-900`}>
          <Text style={[tw`text-black dark:text-white text-xl`, {fontFamily: 'Poppins-SemiBold'}]}>
            {item?.applicantDetails?.firstname?.charAt(0)}
            {item?.applicantDetails?.lastname?.charAt(0)}
          </Text>
        </View>
        <View style={tw`flex-grow`}>
          <Text style={[tw`text-black dark:text-white`, {fontFamily: 'Poppins-SemiBold'}]}>
            {item.applicantDetails.firstname} {item.applicantDetails.lastname}
          </Text>
        </View>
        <View style={tw`items-end`}>
          <Text style={[tw`text-black dark:text-white`, {fontFamily: 'Poppins-Regular'}]}>
            {item.status}
          </Text>
          <Text style={[tw`text-black dark:text-white`, {fontFamily: 'Poppins-Regular'}]}>
            Applied on: {dayjs(item.createdat).format('DD MMM YYYY')}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`px-8 py-2 my-2 rounded-full mx-3 bg-emerald-500 text-center`}
        onPress={handleCompletePress}>
        <Text style={[tw`text-lg text-white text-center`, {fontFamily: 'Poppins-SemiBold'}]}>
          Mark Complete
        </Text>
      </TouchableOpacity>
      
     
    </View>
    <Portal>
        <Dialog visible={visible} onDismiss={handleCancelComplete}>
          <Dialog.Title>Confirmation</Dialog.Title>
          <Dialog.Content>
            <Text style={tw`text-lg mb-4`}>
              Are you sure you want to mark the work complete with {item?.applicantDetails?.firstname} {item?.applicantDetails?.lastname}?
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={tw`flex`}>
            <Button onPress={handleConfirmComplete}>Yes</Button>
            <Button onPress={handleCancelComplete}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const FooterComponent = ({isLoading, refreshing}) => {
  return (
    <View style={tw``}>
      <ActivityIndicator
        size={30}
        animating={!refreshing && isLoading}
        color={'#000000'}
      />
    </View>
  );
};

const NoDataMenuComponent = ({message}) => {
  return (
    <View style={tw`w-full h-full gap-4`}>
      <View style={tw`flex-1 justify-center items-center`}>
        <Text
          style={[
            tw`text-lg text-zinc-700 dark:text-zinc-300`,
            {fontFamily: 'Poppins-SemiBold'},
          ]}>
          {message}
        </Text>
      </View>
    </View>
  );
};
