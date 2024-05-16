import React, { useEffect } from 'react';
import { NearbyStaff } from './components/staff/NearbyStaff';
import {Text,View} from 'react-native';
// import useLoginStore from '../../store/authentication/login.store';
import useLoginStore from '../../store/authentication/login.store';
import useLoaderStore from '../../store/loader.store';
import useStaffStore from '../../store/staff.store';
export const SearchStaff = ({navigation,location}) => {
  const {isLoading} = useLoaderStore();
const {loggedInUser, language} = useLoginStore();
const {getNearByStaff,nearbystaffs} = useStaffStore();
useEffect(()=>{
  getNearByStaff(0,5,location)
},[])

  return (<View>
  <NearbyStaff {...{language,isLoading,navigation,location,nearbystaffs}}></NearbyStaff>
  </View>);
};
