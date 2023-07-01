import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Pressable } from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import GeneralStatusBar from '../../components/GeneralStatusBar';
import dayjs from 'dayjs';

const Chat = ({ navigation }) =>
{


  const [messageText, setMessageText] = useState("")

  const handleBackPress = () =>
  {
    navigation.goBack();
  };
  const messages = [
    { id: 1, content: 'Hi Eric', sent: true },
    { id: 2, content: 'Hi', sent: false },
    { id: 3, content: 'How are you doing?', sent: true },
    { id: 4, content: 'I am doing well, Thank you for asking.', sent: false },
    { id: 5, content: 'I want to apply for this job. I think that I am perfect for this opprtunity', sent: true },
    { id: 6, content: 'What are you doing?', sent: false },
    { id: 7, content: 'Sir, I am looking at the Quotation file.', sent: true },
    { id: 8, content: 'Hurry up! I am getting late to my Meeting.', sent: false },
    { id: 9, content: 'Sir wait a little....', sent: true },
    { id: 10, content: 'Received Message 1', sent: false },
    { id: 11, content: 'Sent Message 2', sent: true },
    { id: 12, content: 'Received Message 2', sent: false },
    { id: 13, content: ' O.K. you may go.', sent: true },
    { id: 14, content: 'Received Message 1', sent: false },
    { id: 15, content: 'Sent Message 2', sent: true },
    { id: 16, content: 'Received Message 2', sent: false },
    { id: 17, content: ' You may take your salary this month in advance.', sent: true },
    { id: 18, content: 'Received Message 1', sent: false },
    { id: 19, content: 'Sent Message 2', sent: true },
    { id: 20, content: 'Received Message 2', sent: false },
    // Add more messages here
  ];

  const renderMessage = ({ item }) => (
    <View style={tw`flex-row my-1`}>
      <View
        style={tw`${ item.sent ? 'bg-[#4A9D58] ml-auto rounded-br-0 ' : 'bg-white rounded-tl-0 '
          } rounded-lg px-2 py-1 mb-2 shadow-sm`}>
        <Text style={item.sent ? tw`text-white` : null}>{item.content}</Text>
        <Text style={tw`mt-1 text-[10px] ${ item.sent ? "text-white" : "text-black" } text-right`}>{new Date().toLocaleTimeString()}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1`} edges={['top']}>
      <GeneralStatusBar backgroundColor={"#4A9D58"} />
      {/* Top Bar */}
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
        <View style={tw`flex-row items-center`}>
          <Ionicons name="call" size={24} style={tw`mr-2 text-white`} />
          <TouchableOpacity onPress={() => navigation.navigate('TrackApplication')}>
            <Ionicons name="location" size={24} style={tw`text-white`} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Area */}
      <View style={tw`flex-1 px-4 py-1`}>
        {/* Chat messages */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
        />
      </View>

      {/* Bottom Bar */}
      {/* Bottom Bar */}
      <View style={tw`flex-row items-center justify-between border-t border-slate-300 px-4 py-2 bg-white`}>

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
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#d7dbd8' : 'transparent',
              },
              tw`w-10 h-10 items-center justify-center rounded-full`
            ]}
          >
            <Ionicons name="send" size={20} style={tw`ml-[3px] ${ messageText?.length ? 'text-green-600' : 'text-slate-400' }`} />
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#d7dbd8' : 'transparent',
              },
              tw`w-10 h-10 items-center justify-center rounded-full`
            ]}
          >
            <Ionicons name="attach" size={24} style={tw`text-green-600`} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
