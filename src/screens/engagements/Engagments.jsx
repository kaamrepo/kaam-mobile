import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState} from 'react';
  import {SafeAreaView} from 'react-native-safe-area-context';
  import tw from 'twrnc';
  import { primaryBGColor } from '../../helper/utils/colors';

export const Engagments = () => {
    const [activeTab, setActiveTab] = useState(0);
      return (
      <SafeAreaView style={tw`flex-1 px-5 py-6 bg-white`} edges={['top']}>
      <View style={tw`flex flex-row bg-zinc-100 p-1.5 rounded-xl`}>
      <TouchableOpacity
            onPress={() => setActiveTab(1)}
            className={'navbarButton'}
            style={[
              tw`w-1/2 h-10.5 flex items-center justify-center rounded-lg
              ${
                activeTab === 1 ? `bg-[${primaryBGColor}] shadow-lg` : ''
              }
              `,
            ]}>
            <Text
              style={[
                tw`text-gray-500 ${activeTab === 1 ? 'text-white' : ''}`,
                
                {fontFamily: 'Poppins-SemiBold'},
              ]}>
             My Jobs
            </Text>
          </TouchableOpacity>
      <TouchableOpacity
            onPress={() => setActiveTab(0)}
            className={'navbarButton'}
            style={[
              tw`w-1/2 h-10.5 flex items-center justify-center rounded-lg
              ${
                activeTab === 0 ? `bg-[${primaryBGColor}] shadow-lg` : ''
              }
              `,
            ]}>
            <Text
              style={[
                tw`text-gray-500 ${activeTab === 0 ? 'text-white' : ''}`,
                
                {fontFamily: 'Poppins-SemiBold'},
              ]}>
               My Staffs
            </Text>
          </TouchableOpacity>
      </View>
      </SafeAreaView>
      );
    };
    const styles = StyleSheet.create({
        navbarButton: {
          marginHorizontal: 10,
        },
        activeButton: {
          backgroundColor: 'lightblue', // Highlight the active button
        },
        flatListItemContainer: {
          width: '100%',
          padding: 15,
        },
        flatListItemText: {
          fontSize: 18,
        },
      });
      