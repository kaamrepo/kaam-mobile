import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import GeneralStatusBar from '../../components/GeneralStatusBar';
import tw from 'twrnc';
import useMenuStore from '../../store/menu.store';
import {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';
export const ApplicantListScreen = ({
  route: {
    params: {job},
  },
}) => {
  return (
    <SafeAreaView style={tw`flex-1`} edges={['top']}>
      <GeneralStatusBar backgroundColor={'rgb(203 213 225)'} />
      <View style={tw`flex-1 bg-white bg-slate-200 p-5`}>
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
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const {applicantList, getApplicantsList} = useMenuStore();
  useEffect(() => {
    getApplicantsList(skip, limit, job._id);
  }, [skip, limit, setSkip, setLimit]);

  return (
    <View style={tw`flex-grow`}>
      {applicantList?.total ? (
        <FlatList
          style={tw`rounded-lg py-2`}
          data={applicantList.data}
          renderItem={({item, index}) => (
            <RenderItem item={item} index={index} />
          )}
          keyExtractor={(item, index) => item._id.toString()}
          onEndReached={() => getApplicantsList(skip, limit, job._id)}
          onEndReachedThreshold={0.1}
          // refreshing={this.state.refreshing}
        />
      ) : null}
    </View>
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
        });
      }}
      style={tw`w-full p-2 my-0.6 flex-row gap-3 items-center justify-between bg-white border-b border-gray-200 rounded`}>
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
