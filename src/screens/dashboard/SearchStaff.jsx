import React, { useEffect } from 'react';
import { View } from 'react-native';
import NearbyStaff from './components/staff/NearbyStaff';
import StaffFlatList from './components/staff/AvailalbeStaffs';
import useLoginStore from '../../store/authentication/login.store';
import useLoaderStore from '../../store/loader.store';
import useStaffStore from '../../store/staff.store';

export const SearchStaff = ({ navigation, location }) => {
  const { isLoading } = useLoaderStore();
  const { language } = useLoginStore();
  const { getNearByStaff, stafflist, getStaff, nearbyusers } = useStaffStore();

  useEffect(() => {
    getNearByStaff(0, 6, { location });
    getStaff(0, 10);
  }, [getNearByStaff, getStaff, location]);

  return (
    <View>
      <NearbyStaff {...{ language, isLoading, navigation, location, nearbyusers }} />
      <StaffFlatList {...{ language, isLoading, navigation, location, stafflist }} />
    </View>
  );
};
