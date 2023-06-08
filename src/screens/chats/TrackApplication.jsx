import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TrackApplication = () => {
    const milestones = [
        { id: 1, heading: 'Milestone 1', date: 'June 1, 2023' },
        { id: 2, heading: 'Milestone 2', date: 'June 5, 2023' },
        { id: 3, heading: 'Milestone 3', date: 'June 10, 2023' },
        // Add more milestones here
      ];
  return (
    <SafeAreaView style={tw`flex-1`} edges={['top']}>
      {/* Header Panel */}
      <View style={tw`flex-row items-center p-4 border-b bg-green-500`}>
        {/* Left Icon */}
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} style={tw`mr-2 text-white`} />
        </TouchableOpacity>

        {/* Heading */}
        <View style={tw`flex-1`}>
          <Text style={tw`text-white text-center text-xl font-bold`}>Applied Job Details</Text>
        </View>
      </View>

      <View style={tw`flex-row`}>
      {/* Progress Line */}
      <View style={tw`bg-gray-300 w-2`} />

      {/* Milestones */}
      <View style={tw`flex-1 pl-4`}>
        {milestones.map((milestone) => (
          <View key={milestone.id} style={tw`mb-4`}>
            <Text style={tw`text-lg font-bold`}>{milestone.heading}</Text>
            <Text style={tw`text-gray-500`}>{milestone.date}</Text>
          </View>
        ))}
      </View>
    </View>
    </SafeAreaView>
  )
}

export default TrackApplication