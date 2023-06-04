import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ApplyNow = ({ route }) =>
{
  console.log("route", route);
  const item = route.params;
  console.log("item in apply now page", item);
  return (
    <View>
      <Text>ApplyNow {item.id}</Text>
    </View>
  );
};

export default ApplyNow;

const styles = StyleSheet.create({});
