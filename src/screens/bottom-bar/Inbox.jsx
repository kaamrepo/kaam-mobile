import React, {useCallback} from 'react';
import {View, Text, TextInput, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import Icon, {Icons} from '../../components/Icons';
import {useFocusEffect} from '@react-navigation/native';
import useLoginStore from '../../store/authentication/login.store';
import useInboxStore from '../../store/inbox.store';
import useLoaderStore from '../../store/loader.store';
import dayjs from 'dayjs';

const Inbox = ({navigation}) => {
  const {loggedInUser} = useLoginStore();
  const {isLoading} = useLoaderStore();
  const {inboxList, setInboxList, clearInboxList} = useInboxStore();
  useFocusEffect(
    useCallback(() => {
      if (loggedInUser?._id) {
        setInboxList(loggedInUser?._id);
      }
      return () => {
        clearInboxList();
      };
    }, [loggedInUser?._id]),
  );

  return (
    <SafeAreaView style={tw`flex-1 px-5 bg-slate-50`}>
      <View style={[tw`my-5 mb-[75px]`]}>
        <Headers />
        <SearchComponent placeholder={'Search...'} />
        <MessageList
          inboxList={inboxList}
          isLoading={isLoading}
          loggedInUserId={loggedInUser?._id}
        />
      </View>
    </SafeAreaView>
  );
};

export default Inbox;

const MessageList = ({isLoading, inboxList, loggedInUserId}) => {
  if (isLoading) {
    return (
      <View style={[tw`my-2 w-full h-full flex justify-center items-center`]}>
        <Text>Fetching...</Text>
      </View>
    );
  }
  if (!isLoading && !inboxList) {
    return (
      <View style={[tw`my-2 w-full h-full flex justify-center items-center`]}>
        <Text>Data not found</Text>
      </View>
    );
  }
  return (
    <View style={[tw`my-2 w-full`]}>
      <FlatList
        data={inboxList?.data}
        style={[tw`py-1`]}
        renderItem={({item, index}) => (
          <MessageListItem
            item={item}
            loggedInUserId={loggedInUserId}
            isLastItem={index === inboxList?.total - 1}
          />
        )}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const MessageListItem = ({item, loggedInUserId, isLastItem}) => {
  console.log('item', JSON.stringify(item, null, 4));
  return (
    <View
      style={[
        tw`w-full px-1 py-2 flex flex-row items-center bg-white ${
          isLastItem ? '' : 'border-b border-gray-50'
        }`,
      ]}>
      <View style={[tw`flex-1 justify-center items-center`]}>
        <View style={[tw`w-10 h-10 rounded-full bg-blue-300`]}>
          {/* image */}
        </View>
      </View>
      <View style={[tw`flex-3`]}>
        <Text style={[tw`text-black`, {fontFamily: 'Poppins-SemiBold'}]}>
          {loggedInUserId === item.employerid
            ? `${item?.applicantDetails?.firstname ?? ''} ${
                item?.applicantDetails?.lastname ?? ''
              }`
            : `${item?.employerDetails?.firstname ?? ''} ${
                item?.employerDetails?.lastname ?? ''
              }`}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[tw`text-black`, {fontFamily: 'Poppins-Regular'}]}>
          {item?.chatDetails?.lastMessage?.text}
        </Text>
      </View>
      <View style={[tw`flex-1 items-center`]}>
        <Text
          style={[tw`text-black text-[10px]`, {fontFamily: 'Poppins-Regular'}]}>
          {item?.chatDetails?.lastMessage?.createdat
            ? dayjs(item?.chatDetails?.lastMessage?.createdat).format(
                'DD MMM YYYY hh:mm a',
              )
            : ''}
        </Text>

        {item?.chatDetails?.unseenMessageCount ? (
          <View
            style={tw`min-w-[18px] bg-blue-500 px-1 py-0.5 rounded-lg justify-center items-center`}>
            <Text style={tw`text-white text-[12px]`}>
              {item?.chatDetails?.unseenMessageCount}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};
const Headers = ({}) => {
  return (
    <View style={[tw`w-full flex flex-row justify-between items-center`]}>
      <Text style={[tw`text-lg text-black`, {fontFamily: 'Poppins-SemiBold'}]}>
        Messages
      </Text>
    </View>
  );
};

const SearchComponent = ({placeholder}) => {
  return (
    <View
      style={tw`flex-row items-center border border-gray-300 rounded-xl px-2 bg-white`}>
      <TextInput
        placeholder={placeholder}
        style={[
          tw`flex-1 text-base text-gray-700`,
          {fontFamily: 'Poppins-Regular'},
        ]}
        placeholderTextColor="#666"
      />
      <View style={tw`mr-2`}>
        <Icon
          style={tw`text-green-600`}
          name={'search'}
          size={26}
          type={Icons.Feather}
        />
      </View>
    </View>
  );
};