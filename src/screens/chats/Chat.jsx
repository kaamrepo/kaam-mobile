import React, {useState, useCallback, useEffect} from 'react';
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
import {feathersServices} from '../../helper/endpoints';
import client from '../../../client';

const Chat = ({route, navigation}) => {
  const [messageText, setMessageText] = useState('');
  const {getChatAndMessages, chat, clearChatAndMessages, sendChatMessage} =
    useChatStore();
  const {loggedInUser} = useLoginStore();
  const handleBackPress = () => {
    navigation.goBack();
  };
  const bgColor = route?.params?.bgColor ?? '#000000';
  // useFocusEffect(
  //   useCallback(() => {
  //     if (route?.params?.chatid) {
  //       getChatAndMessages(route?.params?.chatid);
  //     }
  //     return () => {
  //       clearChatAndMessages();
  //     };
  //   }, [route?.params?.chatid]),
  // );

  const renderMessage = ({item}) => (
    <View style={tw`flex-row my-1`}>
      {item?.messageType === 'initial' ? (
        <View
          style={tw`flex flex-row gap-3 mx-auto items-center justify-center w-[80%] rounded-lg bg-white border border-[${bgColor}] text-black px-5 py-3 mb-2`}>
          <Icon
            type={Icons.Ionicons}
            size={30}
            name={'briefcase-outline'}
            style={tw`text-[${bgColor}]`}
          />
          <Text
            style={[
              tw`text-[${bgColor}] text-center px-2`,
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
            loggedInUser?._id === item?.senderid
              ? `ml-auto bg-[${bgColor}]`
              : `bg-white`
          }`}>
          <Text
            style={[
              tw`${
                loggedInUser?._id === item?.senderid
                  ? `text-white`
                  : `text-[${bgColor}]`
              }`,
              {fontFamily: 'Poppins-Regular'},
            ]}>
            {item?.text}
          </Text>
          <View style={tw`absolute bottom-0.9 right-2`}>
            <Icon
              size={16}
              style={tw`${
                loggedInUser?._id === item?.senderid
                  ? `text-white`
                  : `text-[${bgColor}]`
              }`}
              type={Icons.Ionicons}
              name={item.isseen ? 'checkmark-done' : 'checkmark'}
            />
          </View>
        </View>
      )}
    </View>
  );

  const handleSendMessage = () => {
    let chat_message = {
      messageType: 'text',
      text: messageText,
      createdat: new Date().toISOString(),
      isseen: false,
    };
    sendChatMessage(chat?._id, chat_message);
    setMessageText('');
  };

  useEffect(() => {
    if (route?.params?.chatid) {
      getChatAndMessages(route?.params?.chatid);
      client.service(feathersServices.chats).on('patched', getChatAndMessages);
    }

    return () => {
      client
        .service(feathersServices.chats)
        .removeListener('patched', getChatAndMessages);
    };
  });

  return (
    <SafeAreaView style={tw`flex-1`} edges={['top']}>
      <GeneralStatusBar backgroundColor={bgColor} />
      {/* Top Bar */}
      <View
        style={tw`flex-row justify-between items-center p-4 shadow shadow-[#fcb603] bg-[${bgColor}]`}>
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
          <Text style={tw`ml-2 text-lg font-bold text-white`}>
            {route?.params?.employerName}
          </Text>
        </View>
        {/* Right Column */}
        <View style={tw`flex-row items-center gap-3 mx-2`}>
          <TouchableOpacity onPress={() => {}}>
            <Icon
              type={Icons.MaterialIcons}
              size={24}
              name={'call'}
              style={tw`text-white`}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('TrackApplication');
            }}>
            <Icon
              type={Icons.MaterialCommunityIcons}
              size={24}
              style={tw`text-white`}
              name={'google-maps'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (route?.params?.chatid) {
                getChatAndMessages(route?.params?.chatid);
              }
            }}>
            <Icon
              type={Icons.MaterialCommunityIcons}
              size={24}
              style={tw`text-white`}
              name={'refresh'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Area */}
      <View style={tw`flex-1 px-4 py-1`}>
        {/* Chat messages */}
        <FlatList
          data={chat?.messages}
          renderItem={renderMessage}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item._id.toString()}
        />
      </View>

      {/* Bottom Bar */}
      <View
        style={tw`flex-row items-center justify-between border-t border-slate-300 px-4 py-2 bg-white`}>
        <TextInput
          style={tw`border border-gray-300 w-[85%] rounded-xl max-h-15 bg-white px-4 py-2`}
          placeholder="Type a message..."
          multiline
          value={messageText}
          onChangeText={setMessageText}
        />
        <View style={tw`w-[15%] flex-row justify-around items-center`}>
          <Pressable
            disabled={messageText?.length ? false : true}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#d7dbd8' : 'transparent',
              },
              tw`w-10 h-10 items-center justify-center rounded-full`,
            ]}
            onPress={handleSendMessage}>
            <Ionicons
              name="send"
              size={20}
              style={tw`ml-[3px] ${
                messageText?.length ? `text-[${bgColor}]` : 'text-slate-400'
              }`}
            />
          </Pressable>
          {/* <Pressable
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#d7dbd8' : 'transparent',
              },
              tw`w-10 h-10 items-center justify-center rounded-full`,
            ]}>
            <Ionicons
              name="attach"
              size={24}
              style={tw`text-[${colors.primaryColor}]`}
            />
          </Pressable> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
