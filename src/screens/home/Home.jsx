import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import tw from 'twrnc';
const Home = () =>
{
  return (
    <SafeAreaView style={tw`flex-1 px-4 pt-4 bg-white`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >

      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})