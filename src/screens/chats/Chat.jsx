import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import GeneralStatusBar from '../../components/GeneralStatusBar';
import {useFocusEffect} from '@react-navigation/native';
import useChatStore from '../../store/chat.store';
import useLoginStore from '../../store/authentication/login.store';
import Icon, {Icons} from '../../components/Icons';
import dayjs from 'dayjs';

const Chat = ({route, navigation}) => {
  const [messageText, setMessageText] = useState('');
  const {getChatAndMessages, chat, clearChatAndMessages} = useChatStore();
  const {loggedInUser} = useLoginStore();
  const handleBackPress = () => {
    navigation.goBack();
  };
  const messages = [{id: 1, text: 'Hi Eric', sent: true}];

  console.log('🍟🍟🍟', route?.params);
  console.log('\n\n🍟🍟🍟 chat \n\n', chat);

  useFocusEffect(
    useCallback(() => {
      if (route?.params?.chatid) {
        getChatAndMessages(route?.params?.chatid);
      }
      return () => {
        clearChatAndMessages();
      };
    }, [route?.params?.chatid]),
  );

  const renderMessage = ({item}) => (
    <View style={tw`flex-row my-1`}>
      {item?.type === 'initial' ? (
        <View
          style={tw`flex flex-row gap-3 items-center justify-center mx-auto w-[80%] rounded-lg bg-white border-2 border-green-700 border-dashed text-black px-2 py-3 mb-2`}>
          <Icon
            type={Icons.Ionicons}
            size={30}
            name={'briefcase-outline'}
            style={tw`text-green-700`}
          />
          <Text
            style={[
              tw`text-green-700 text-center text-italic`,
              {fontFamily: 'Poppins-Italic'},
            ]}>
            {loggedInUser?._id !== item?.senderid
              ? item.text
              : `You have applied for this job on ${dayjs(
                  item?.createdat,
                ).format('DD-MMM-YYYY')}`}
          </Text>
        </View>
      ) : (
        <View
          style={tw`flex py-2 px-3 pr-10 max-w-[80%] relative rounded-3xl shadow ${
            loggedInUser?._id !== item?.senderid
              ? 'bg-white ml-auto'
              : 'bg-[#4A9D59]'
          }`}>
          <Text
            style={[
              tw`${
                loggedInUser?._id !== item?.senderid
                  ? 'text-[#4A9D59]'
                  : 'text-white'
              }`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            {item?.text}
          </Text>
          <View style={tw`absolute bottom-0.9 right-2`}>
            <Icon
              size={16}
              style={tw`${
                loggedInUser?._id !== item?.senderid
                  ? 'text-[#4A9D59]'
                  : 'text-white'
              }`}
              type={Icons.Ionicons}
              name={item.isseen ? 'checkmark-done' : 'checkmark'}
            />
          </View>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1`} edges={['top']}>
      <GeneralStatusBar backgroundColor={'#4A9D59'} />
      {/* Top Bar */}
      <View
        style={tw`flex-row justify-between items-center p-4 shadow shadow-[#4A9D58] bg-[#4A9D58]`}>
        {/* Left Column */}
        <View style={tw`flex-row items-center`}>
          <View>
            <TouchableOpacity onPress={handleBackPress}>
              <Ionicons
                name="chevron-back"
                size={24}
                style={tw`mr-2 text-white`}
              />
            </TouchableOpacity>
          </View>
          <View style={tw`rounded-full w-10 h-10 bg-gray-300`} />
          <Text style={tw`ml-2 text-lg font-bold text-white`}>Erik John</Text>
        </View>
        {/* Right Column */}
        <View style={tw`flex-row items-center gap-3 mx-2`}>
          <TouchableOpacity onPress={() => {}}>
            <Icon
              type={Icons.MaterialIcons}
              size={24}
              name={'call'}
              color={'white'}
              style={'text-white'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('TrackApplication');
            }}>
            <Icon
              type={Icons.MaterialCommunityIcons}
              color={'white'}
              size={24}
              name={'google-maps'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Area */}
      <View style={tw`flex-1 px-4 py-1`}>
        {/* Chat messages */}
        <FlatList
          data={[
            // ...chat?.messages,
            {
              _id: '3456789',
              text: 'Hii',
              senderid: '6536ba4b9455f4004a1cbd7d',
              type: 'later',
              createdat: '2023-10-31T18:03:33.051Z',
              isseen: false,
            },
            {
              _id: '34567839',
              text: 'Hii,  How are you doding \n waht are your foing broo \n this has been observed that you are not good enough for this company so we have decided to terminate you in coming month.',
              senderid: '6536ba4b9455f4004a1cbd7d',
              type: 'later',
              createdat: '2023-10-31T18:03:33.051Z',
              isseen: true,
            },
            {
              _id: '34567849',
              text: 'Hii, I am doing well',
              senderid: '6536ba4b9455f4004a1cbd7a',
              type: 'later',
              createdat: '2023-10-31T18:03:33.051Z',
              isseen: false,
            },
          ]}
          renderItem={renderMessage}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item._id.toString()}
        />
      </View>

      {/* Bottom Bar */}
      {/* Bottom Bar */}
      <View
        style={tw`flex-row items-center justify-between border-t border-slate-300 px-4 py-2 bg-white`}>
        <TextInput
          style={tw`border border-gray-300 w-[75%] rounded-xl max-h-15 bg-white px-4 py-2`}
          placeholder="Type a message..."
          multiline
          value={messageText}
          onChangeText={setMessageText}
        />
        <View style={tw`w-[25%] flex-row justify-around items-center`}>
          <Pressable
            disabled={messageText?.length ? false : true}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#d7dbd8' : 'transparent',
              },
              tw`w-10 h-10 items-center justify-center rounded-full`,
            ]}>
            <Ionicons
              name="send"
              size={20}
              style={tw`ml-[3px] ${
                messageText?.length ? 'text-green-600' : 'text-slate-400'
              }`}
            />
          </Pressable>
          <Pressable
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#d7dbd8' : 'transparent',
              },
              tw`w-10 h-10 items-center justify-center rounded-full`,
            ]}>
            <Ionicons name="attach" size={24} style={tw`text-green-600`} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
