import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Image,
  useColorScheme,
} from 'react-native';
import tw from 'twrnc';
import {primaryBGColor} from '../../helper/utils/colors';
import {primaryBGDangerColor} from '../../helper/utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import GeneralStatusBar from '../../components/GeneralStatusBar';
import useChatStore from '../../store/chat.store';
import useLoginStore from '../../store/authentication/login.store';
import Icon, {Icons} from '../../components/Icons';
import useJobStore from '../../store/jobs.store';
import dayjs from 'dayjs';

const Chat = ({route, navigation}) => {
  useColorScheme();
  const applicationId = route?.params?.appliedJobId;
  const [messageText, setMessageText] = useState('');
  const [jobApplication, setJobApplication] = useState({});
  const [approvalStatus, setApprovalStatus] = useState(null);
  const lastMessageRef = useRef(null);
  const {
    chat: chat1,
    sendChatMessage,
    chatUpdatedEvent,
    getChatMessages,
    clearChat,
  } = useChatStore();
  const handleBackPress = () => {
    navigation.goBack();
  };

  const chat = useMemo(() => chat1, [chat1]);
  const bgColor = route?.params?.bgColor ?? '#000000';

  const handleSendMessage = useCallback(() => {
    let chat_message = {
      messageType: 'text',
      text: messageText,
      createdat: new Date().toISOString(),
      isseen: false,
    };
    sendChatMessage(route.params.chatid, chat_message);
    setMessageText('');
  }, [messageText, route.params.chatid, sendChatMessage]);

  useEffect(() => {
    if (route.params.chatid) getChatMessages(route.params.chatid);
    chatUpdatedEvent();
    return () => {
      clearChat();
    };
  }, [route.params.chatid]);
  const {updateJobStatus, getJobApplication} = useJobStore();
  const handlePress = async status => {
    try {
      const payload = {
        status,
        applicationId,
      };
      const updateResult = await updateJobStatus(payload);
      if (updateResult) {
        const application = await getJobApplication({_id: applicationId});
        setJobApplication(...application);
        setApprovalStatus(application?.status); // Update approval status
      }
    } catch (error) {
      console.error('Error updating job status:', error);
    }
  };

  useEffect(() => {
    // Fetch application details and update approval status
    if (applicationId) {
      const getApplication = async () => {
        const application = await getJobApplication({_id: applicationId});
        setJobApplication(...application);
        setApprovalStatus(jobApplication?.status); // Update approval status
      };
      getApplication();
    }
  }, [applicationId, approvalStatus]);
  console.log('Applciaiton . status', approvalStatus);
  const {loggedInUser} = useLoginStore();
  return (
    <SafeAreaView style={tw`flex-1`} edges={['top']}>
      <GeneralStatusBar />
      {/* Top Bar */}
      <View
        style={tw`flex-row justify-between items-center p-4 shadow shadow-[#fcb603] bg-gray-900`}>
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
          <View style={tw`rounded-full w-10 h-10 bg-gray-800 justify-center items-center`}>
            <Text
              style={[
                tw`text-white text-xl`,
                {fontFamily: 'Poppins-SemiBold'},
              ]}>
              {route?.params?.name?.charAt(0)}
            </Text>
          </View>
          <Text style={tw`ml-2 text-lg font-bold text-white`}>
            {route?.params?.name}
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
        </View>
      </View>
      {loggedInUser?._id !== chat?.messages?.at(0)?.senderid ? <View style={tw`flex-row justify-center items-center`}>
        <TouchableOpacity
          style={[
            tw`bg-blue-500 px-8 py-2 my-2 rounded mx-3`,
            {
              backgroundColor: primaryBGColor,
              opacity: approvalStatus === 'Approved' ? 0.5 : 1,
            },
          ]}
          onPress={() => {
            handlePress('Approved');
          }}
          disabled={approvalStatus === 'Approved'}>
          <Text style={tw`text-white text-lg font-bold`}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tw`bg-blue-500 px-8 py-2 my-2 rounded mx-3`,
            {
              backgroundColor: primaryBGDangerColor,
              opacity: approvalStatus === 'Rejected' ? 0.5 : 1,
            },
          ]}
          onPress={() => {
            handlePress('Rejected');
          }}
          disabled={approvalStatus === 'Rejected'}>
          <Text style={tw`text-white text-lg font-bold`}>Reject</Text>
        </TouchableOpacity>
      </View>:''}
      <View style={tw`flex-1 px-4 py-1`}>
        <FlatList
          ref={lastMessageRef}
          data={chat?.messages}
          renderItem={({item, index}) => (
            <MemoizedChat item={item} index={index} bgColor={bgColor} />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item._id.toString()}
          onContentSizeChange={() => {
            if (chat?.messages?.length) {
              lastMessageRef.current.scrollToEnd({animated: true});
            }
          }}
        />
      </View>

      <View
        style={[
          tw`flex-row items-center justify-between gap-x-3 border-t border-slate-300 px-2 py-2 bg-white`,
          {
            opacity: approvalStatus === 'Rejected' ? 0.5 : 1,
            pointerEvents: approvalStatus === 'Rejected' ? 'none' : 'auto',
          },
        ]}>
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgb(226 232 240)' : 'white',
            },
            tw`w-10 h-10 border border-slate-300 items-center justify-center rounded-full`,
          ]}>
          <Ionicons name="attach" size={24} style={tw`text-[#143449]`} />
        </Pressable>
        <TextInput
          style={tw`flex-grow border border-gray-300 text-black rounded-full max-h-15 bg-white px-4 py-1.5`}
          placeholder="Type a message..."
          multiline
          value={messageText}
          onChangeText={setMessageText}
        />
        <View style={tw`flex-row justify-around items-center`}>
          <Pressable
            disabled={messageText.length ? false : true}
            style={({pressed}) => [
              {
                backgroundColor: pressed
                  ? '#d7dbd8'
                  : messageText.length
                  ? 'green'
                  : 'gray',
              },
              tw`w-14 h-10 items-center justify-center rounded-full`,
            ]}
            onPress={handleSendMessage}>
            <Ionicons name="send" size={20} style={tw`ml-[3px] text-white`} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Chat;

export const MemoizedChat = React.memo(({item, index, bgColor}) => (
  <View style={tw`flex-row my-1`}>
    <RenderChatMessage item={item} index={index} bgColor={bgColor} />
  </View>
));

const RenderChatMessage = ({item, index, bgColor}) => {
  const {loggedInUser} = useLoginStore();
  switch (item?.messageType) {
    case 'initial':
      return (
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
      );

    case 'text':
      return (
        <View
          style={tw`flex flex-row justify-between items-end gap-2 py-2 pl-5 pr-3 max-w-[80%] rounded-3xl shadow ${
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

          <Icon
            size={14}
            style={tw`${
              loggedInUser?._id === item?.senderid
                ? `text-white`
                : `text-[${bgColor}]`
            }`}
            type={Icons.Ionicons}
            name={item.isseen ? 'checkmark-done' : 'checkmark'}
          />
        </View>
      );

    case 'image':
      return (
        <View
          style={tw`px-2 py-2 items-end rounded-3xl shadow ${
            loggedInUser?._id === item?.senderid
              ? `ml-auto bg-[${bgColor}]`
              : `bg-white`
          }`}>
          <Image
            style={[tw`h-32 w-56 rounded-2xl`]}
            source={{
              uri: item?.url,
            }}
          />

          <Icon
            size={14}
            style={tw`${
              loggedInUser?._id === item?.senderid
                ? `text-white`
                : `text-[${bgColor}]`
            }`}
            type={Icons.Ionicons}
            name={item.isseen ? 'checkmark-done' : 'checkmark'}
          />
        </View>
      );
    default:
      return (
        <>
          <Text>Null</Text>
        </>
      );
  }
};
