import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import Icon, {Icons} from '../../components/Icons';

const Messages = ({navigation}) => {
  return (
    <SafeAreaView style={tw`flex-1 px-5 bg-slate-50`}>
      {/* <ScrollView
        style={[tw`my-5 mb-[75px]`]}
        contentContainerStyle={{alignItems: 'flex-start', rowGap: 12}}
        showsVerticalScrollIndicator={false}> */}
      {/* </ScrollView> */}
      <View style={[tw`my-5 mb-[75px]`]}>
        <Headers />
        <SearchComponent placeholder={'Search...'} />
        <MessageList />
      </View>
    </SafeAreaView>
  );
};

export default Messages;
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    orgName: 'Google',
    lastMessage: 'are you available for an interview',
    count: 99,
    time: '08:10 am',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    orgName: 'Facebook',
    lastMessage: 'are you available for an interview',
    count: 201,
    time: '07:10 pm',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    orgName: 'GeeksForGeeks',
    lastMessage: 'are you available for an interview',
    count: 20,
    time: '04:10 am',
  },
  {
    id: 'bd7acbea-c1b1-a6c2-aed5-3ad53abb28ba',
    orgName: 'Google',
    lastMessage: 'are you available for an interview',
    count: 99,
    time: '08:10 am',
  },
  {
    id: '3ac68afc-c605-4fd3-a4f8-fbd91aa97f63',
    orgName: 'Facebook',
    lastMessage: 'are you available for an interview',
    count: 201,
    time: '07:10 pm',
  },
  {
    id: '58694a0f-3da1-471g-bd96-145571e29d72',
    orgName: 'GeeksForGeeks',
    lastMessage: 'are you available for an interview',
    count: 20,
    time: '04:10 am',
  },
  {
    id: 'bd7acbea-c1b1-46c1-aed5-3ad53abb28ba',
    orgName: 'Google',
    lastMessage: 'are you available for an interview',
    count: 99,
    time: '08:10 am',
  },
  {
    id: '3acq8afc-c605-48d3-a4fw-fbd91aa97f63',
    orgName: 'Facebook',
    lastMessage: 'are you available for an interview',
    count: 201,
    time: '07:10 pm',
  },
  {
    id: '586a4a0f-3da1-471f-bda6-145571e29d72',
    orgName: 'GeeksForGeeks',
    lastMessage: 'are you available for an interview',
    count: 20,
    time: '04:10 am',
  },
];
const MessageList = () => {
  return (
    <View style={[tw`my-2 w-full`]}>
      <FlatList
        data={DATA}
        style={[tw`py-1`]}
        renderItem={({item}) => <MessageListItem item={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const MessageListItem = ({item}) => {
  return (
    <View
      style={[
        tw`w-full px-1 py-2 my-1 flex flex-row gap-2 items-center bg-white rounded-lg border`,
      ]}>
      <View style={[tw`flex-1 justify-center items-center`]}>
        <View style={[tw`w-10 h-10 rounded-full bg-blue-300`]}>
          {/* image */}
        </View>
      </View>
      <View style={[tw`flex-4`]}>
        <Text style={[tw`text-black`, {fontFamily: 'Poppins-SemiBold'}]}>
          {item?.orgName}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[tw`text-black`, {fontFamily: 'Poppins-Regular'}]}>
          {item?.lastMessage}
        </Text>
      </View>
      <View style={[tw`flex-1 items-center`]}>
        <Text style={[tw`text-black`, {fontFamily: 'Poppins-Regular'}]}>
          {item?.time || '08:10 am'}
        </Text>
        <View
          style={[
            tw`flex justify-end items-center min-w-5 min-h-5 px-1 bg-blue-500 rounded-2xl`,
          ]}>
          <Text
            style={[
              tw`text-white text-[12px]`,
              {fontFamily: 'Poppins-SemiBold'},
            ]}>
            {item?.count > 99 ? `99+` : '2'}
          </Text>
        </View>
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
      {/* <View style={[tw`w-[25%] flex flex-row justify-evenly items-center`]}>
        <TouchableOpacity>
          <Icon
            style={tw`text-green-600`}
            name={'search'}
            size={26}
            type={Icons.Feather}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            style={tw`text-green-600`}
            name={'edit'}
            size={26}
            type={Icons.Feather}
          />
        </TouchableOpacity>
      </View> */}
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
