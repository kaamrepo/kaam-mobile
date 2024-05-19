import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import GeneralStatusBar from '../../components/GeneralStatusBar';
import tw from 'twrnc';
import useMenuStore from '../../store/menu.store';
import {useState, useEffect} from 'react';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';
import useLoaderStore from '../../store/loader.store';
import { primaryBGColor, primaryDangerColor } from '../../helper/utils/colors';

export const ApplicantListScreen = ({
  route: {
    params: {job},
  },
}) => {
  return (
    <SafeAreaView style={tw`flex-1`} edges={['top']}>
      <GeneralStatusBar backgroundColor={'rgb(203 213 225)'} />
      <View style={tw`flex-1 bg-white bg-slate-100 p-5`}>
        <JobCard job={job} />
        <ApplicantList job={job} />
      </View>
    </SafeAreaView>
  );
};

const JobCard = ({job}) => {
  const {applicantList} = useMenuStore();
  return (
    <View style={tw`p-5 bg-white rounded-xl w-full`}>
      <View style={tw`flex-row justify-between`}>
        <Text style={[tw`text-black text-lg`, {fontFamily: 'Poppins-Bold'}]}>
          {job.jobtitle}
        </Text>
        <Text
          style={[
            tw`text-black px-2 rounded ${
              job.isactive
                ? 'bg-green-600/20 text-green-600'
                : 'bg-red-600/20 text-red-600'
            }`,
            {fontFamily: 'Poppins-SemiBold'},
          ]}>
          {job.isactive ? 'Active' : 'Inactive'}
        </Text>
      </View>
      <View style={tw`mt-3 p-3 bg-slate-100 rounded`}>
        <View style={tw`flex-row gap-2`}>
          <Text style={[tw`text-black`, {fontFamily: 'Poppins-Bold'}]}>
            Location
          </Text>
          <Text style={[tw`text-black`, {fontFamily: 'Poppins-Bold'}]}>
            {job.location.fulladdress}
          </Text>
        </View>
        <View style={tw`flex-row gap-2`}>
          <Text style={[tw`text-black`, {fontFamily: 'Poppins-Bold'}]}>
            Salary
          </Text>
          <Text style={[tw`text-black`, {fontFamily: 'Poppins-Bold'}]}>
            {`₹ ${new Intl.NumberFormat('en-IN', {
              maximumSignificantDigits: 3,
            }).format(job.salary)}/${job.salarybasis}`}
          </Text>
        </View>
        <View style={tw`flex-row gap-2`}>
          <Text style={[tw`text-black`, {fontFamily: 'Poppins-Bold'}]}>
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
      style={tw`rounded-xl bg-white mt-5 mb-3 py-3 overflow-hidden`}
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
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Chat', {
          chatid: item.chatid,
          name: `${item.applicantDetails.firstname} ${item.applicantDetails.lastname}`,
          item
        });
      }}
      style={tw`w-full p-2 flex-row gap-3 items-center justify-between bg-white border-b border-gray-200`}>
      <View style={tw`w-10 h-10 rounded-full bg-slate-300`}></View>
      <View style={tw`flex-grow`}>
        <Text style={[tw`text-black`, {fontFamily: 'Poppins-SemiBold'}]}>
          {item.applicantDetails.firstname} {item.applicantDetails.lastname}
        </Text>
        <Text style={[tw`text-black`, {fontFamily: 'Poppins-Regular'}]}>
          {item.applicantDetails.dialcode} {item.applicantDetails.phone}
        </Text>
      </View>
      <View style={tw`items-end`}>
        <Text style={[tw`text-black`, {fontFamily: 'Poppins-Regular'}]}>
          {item.status}
        </Text>
        <Text style={[tw`text-black`, {fontFamily: 'Poppins-Regular'}]}>
          Applied on: {dayjs(item.createdat).format('DD MMM YYYY')}
        </Text>
      </View>
    </TouchableOpacity>
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
          style={[tw`text-lg text-zinc-700`, {fontFamily: 'Poppins-SemiBold'}]}>
          {message}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginVertical: 10,
    borderRadius: 5,
    margin:3
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
