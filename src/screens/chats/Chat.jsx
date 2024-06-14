import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Pressable,
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

//requried parameters:  chatid, bgColor,appliedJobId,name

const Chat = ({route, navigation}) => {
  const colorTheme = useColorScheme();
  const applicationId = route?.params?.item?._id;
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
  const bgColor = route?.params?.bgColor ?? '#374151';

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
  const {loggedInUser} = useLoginStore();
  return (
    <SafeAreaView style={tw`flex-1 bg-white dark:bg-gray-950`} edges={['top']}>
      <GeneralStatusBar />
      {/* Top Bar */}
      <View
        style={tw`flex-row justify-between items-center p-4 shadow bg-gray-900`}>
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
          <View
            style={tw`rounded-full w-10 h-10 bg-gray-800 justify-center items-center`}>
            <Text
              style={[
                tw`text-white text-xl`,
                {fontFamily: 'Poppins-SemiBold'},
              ]}>
              {route?.params?.name?.charAt(0)}
            </Text>
          </View>
          <Text
            style={[
              tw`ml-2 text-lg text-white`,
              {fontFamily: 'Poppins-SemiBold'},
            ]}>
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
            tw`px-8 py-2 my-2 rounded-full mx-3`,
            {
              backgroundColor: primaryBGColor,
              opacity: approvalStatus === 'Approved' ? 0.5 : 1,
            },
          ]}
          onPress={() => {
            handlePress('Approved');
          }}
          disabled={approvalStatus === 'Approved'}>
          {approvalStatus === 'Approved'?
          <Text
            style={[tw`text-white text-lg`, {fontFamily: 'Poppins-SemiBold'}]}>
            Approved
          </Text>:
          <Text
            style={[tw`text-white text-lg`, {fontFamily: 'Poppins-SemiBold'}]}>
            Approve
          </Text>
          }
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tw`px-8 py-2 my-2 rounded-full mx-3`,
            {
              backgroundColor: primaryBGDangerColor,
              opacity: approvalStatus === 'Rejected' ? 0.5 : 1,
            },
          ]}
          onPress={() => {
            handlePress('Rejected');
          }}
          disabled={approvalStatus === 'Rejected'}>
          <Text
            style={[tw`text-white text-lg`, {fontFamily: 'Poppins-SemiBold'}]}>
            Reject
          </Text>
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
          tw`flex-row items-center justify-between gap-x-3 px-2 py-3 bg-gray-200 dark:bg-gray-900`,
          {
            opacity: approvalStatus === 'Rejected' ? 0.5 : 1,
            pointerEvents: approvalStatus === 'Rejected' ? 'none' : 'auto',
          },
        ]}>
        <Pressable
          style={({pressed}) => [
            tw`w-10 h-10 border border-gray-300 dark:border-gray-600 items-center justify-center rounded-full ${
              pressed
                ? 'bg-gray-300 dark:bg-gray-800'
                : 'bg-white dark:bg-gray-900'
            }`,
          ]}>
          <Ionicons
            name="attach"
            size={24}
            style={tw`text-gray-900 dark:text-white`}
          />
        </Pressable>
        <TextInput
          style={tw`flex-grow border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-full max-h-15 bg-white dark:bg-gray-900 px-4 py-1.5`}
          placeholder="Type a message..."
          placeholderTextColor={
            colorTheme == 'dark' ? 'rgb(209 213 219)' : 'rgb(75 85 99)'
          }
          multiline
          value={messageText}
          onChangeText={setMessageText}
        />
        <View style={tw`flex-row justify-around items-center`}>
          <Pressable
            disabled={messageText.length ? false : true}
            style={({pressed}) => [
              tw`w-14 h-10 items-center justify-center rounded-full ${
                pressed
                  ? 'bg-emerald-600'
                  : messageText.length
                  ? 'bg-emerald-500'
                  : 'bg-gray-500/50 dark:bg-gray-600'
              }`,
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
  const colorScheme = useColorScheme();
  const {loggedInUser} = useLoginStore();
  switch (item?.messageType) {
    case 'initial':
      return useMemo(
        () => (
          <View
            style={tw`flex flex-row gap-3 mx-auto items-center justify-center w-[80%] rounded-lg bg-white dark:bg-gray-800 border border-[${bgColor}] text-black px-5 py-3 mb-2`}>
            <Icon
              type={Icons.Ionicons}
              size={30}
              name={'briefcase-outline'}
              style={tw`text-black dark:text-white`}
            />
            <Text
              style={[
                tw`text-black dark:text-white text-center px-2`,
                {fontFamily: 'Poppins-Italic'},
              ]}>
              {loggedInUser?._id !== item?.senderid
                ? item.text
                : `You have applied for this job on ${dayjs(
                    item?.createdat,
                  ).format('DD-MMM-YYYY')}`}
            </Text>
          </View>
        ),
        [colorScheme],
      );

    case 'text':
      return useMemo(
        () => (
          <View
            style={tw`flex flex-row justify-between items-end gap-2 py-2 pl-5 pr-3 max-w-[80%] rounded-3xl shadow ${
              loggedInUser?._id === item?.senderid
                ? `ml-auto bg-gray-900`
                : `bg-gray-100 dark:bg-gray-800`
            }`}>
            <Text
              style={[
                tw`${
                  loggedInUser?._id === item?.senderid
                    ? 'text-white'
                    : 'text-black dark:text-white'
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
                  : `text-black dark:text-white`
              }`}
              type={Icons.Ionicons}
              name={item.isseen ? 'checkmark-done' : 'checkmark'}
            />
          </View>
        ),
        [colorScheme],
      );

    // case 'image':
    //   return (
    //     <View
    //       style={tw`px-2 py-2 items-end rounded-3xl shadow ${
    //         loggedInUser?._id === item?.senderid
    //           ? `ml-auto bg-[${bgColor}]`
    //           : `bg-white`
    //       }`}>
    //       <Image
    //         style={[tw`h-32 w-56 rounded-2xl`]}
    //         source={{
    //           uri: item?.url,
    //         }}
    //       />

    //       <Icon
    //         size={14}
    //         style={tw`${
    //           loggedInUser?._id === item?.senderid
    //             ? `text-white`
    //             : `text-[${bgColor}]`
    //         }`}
    //         type={Icons.Ionicons}
    //         name={item.isseen ? 'checkmark-done' : 'checkmark'}
    //       />
    //     </View>
    //   );
    default:
      return (
        <>
          <Text>No chat found</Text>
        </>
      );
  }
};
