import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import Image1 from '../../assets/images/browse-jobs.png';

import useStaffStore from '../../store/staff.store';

const EmployeeDetails = async ({ route, navigation }) => {
  
  const { getNearByStaffById } = useStaffStore();
const staff = await getNearByStaffById(route.params.id);


  const handleBookmarkPress = () => {
    console.log('Bookmark button pressed!');
  };


  return (
   <View>
<Text>In the employeedetals</Text>
<Text>In the employeedetals</Text>
<Text>In the employeedetals</Text>
<Text>In the employeedetals</Text>
<Text>In the employeedetals</Text>
<Text>In the employeedetals</Text>
<Text>In the employeedetals</Text>
<Text>In the employeedetals</Text>
<Text>In the employeedetals</Text>

   </View>
  );
};

export default EmployeeDetails;
