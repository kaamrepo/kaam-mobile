import React from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';

const Chat = ({navigation}) => {
  const handleBackPress = () => {
    navigation.goBack();
  };
  const messages = [
    {id: 1, content: 'Sent Message 1', sent: true},
    {id: 2, content: 'Received Message 1', sent: false},
    {id: 3, content: 'Sent Message 2', sent: true},
    {id: 4, content: 'Received Message 2', sent: false},
    {id: 5, content: 'Sent Message 1', sent: true},
    {id: 6, content: 'Received Message 1', sent: false},
    {id: 7, content: 'Sent Message 2', sent: true},
    {id: 8, content: 'Received Message 2', sent: false},
    {id: 9, content: 'Sent Message 1', sent: true},
    {id: 10, content: 'Received Message 1', sent: false},
    {id: 11, content: 'Sent Message 2', sent: true},
    {id: 12, content: 'Received Message 2', sent: false},
    {id: 13, content: 'Sent Message 1', sent: true},
    {id: 14, content: 'Received Message 1', sent: false},
    {id: 15, content: 'Sent Message 2', sent: true},
    {id: 16, content: 'Received Message 2', sent: false},
    {id: 17, content: 'Sent Message 1', sent: true},
    {id: 18, content: 'Received Message 1', sent: false},
    {id: 19, content: 'Sent Message 2', sent: true},
    {id: 20, content: 'Received Message 2', sent: false},
    // Add more messages here
  ];

  const renderMessage = ({item}) => (
    <View style={tw`flex-row`}>
      <View
        style={tw`${
          item.sent ? 'bg-blue-500 ml-auto' : 'bg-gray-300'
        } rounded-lg p-2 mb-2`}>
        <Text style={item.sent ? tw`text-white` : null}>{item.content}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1`} edges={['top']}>
      {/* Top Bar */}
      {/* Top Bar */}
      <View
        style={tw`flex-row justify-between items-center p-4 border-b bg-green-500`}>
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
          <Text style={tw`ml-2 text-lg font-bold text-white`}>User Name</Text>
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
      <View style={tw`flex-1 p-4`}>
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
      <View style={tw`flex-row items-center p-4 border-t`}>
        <View style={tw`flex-row items-center flex-1 mr-5`}>
          <TextInput
            style={tw`border border-gray-300 rounded-full px-4 py-2 flex-1`}
            placeholder="Type a message..."
            multiline
          />
          <Ionicons name="send" size={24} style={tw`ml-4 text-green-500`} />
        </View>
        <Ionicons name="attach" size={24} style={tw`text-green-500`} />
      </View>
    </SafeAreaView>
  );
};

export default Chat;
