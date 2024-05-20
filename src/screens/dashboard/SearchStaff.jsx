import React, { useEffect } from 'react';
import { NearbyStaff } from './components/staff/NearbyStaff';
import {Text,View} from 'react-native';
// import useLoginStore from '../../store/authentication/login.store';
import useLoginStore from '../../store/authentication/login.store';
import useLoaderStore from '../../store/loader.store';
import useStaffStore from '../../store/staff.store';
import { allStaffConstant } from './components/staff/constants';
import StaffFlatList from './components/staff/StaffFlatList';
export const SearchStaff = ({navigation,location}) => {
  const {isLoading} = useLoaderStore();
const {language} = useLoginStore();
const {getNearByStaff,stafflist,getStaff,nearbyusers} = useStaffStore();
useEffect(()=>{
  getNearByStaff(0,5,{location});
  getStaff(0,10);
},[])
  return (<View>
  <NearbyStaff {...{language,isLoading,navigation,location,nearbyusers}}></NearbyStaff>
  <StaffFlatList {...{language,isLoading,navigation,location,stafflist}}></StaffFlatList>
  </View>);
};
