import {create} from 'zustand';
import API from '../helper/API';
import {JOBS, USER} from '../helper/endpoints';
import Toast from 'react-native-toast-message';
import useLoginStore, {getToken} from './authentication/login.store';

const useStaffStore = create((set, get) => ({
  nearbyusers: [],
  stafflist: [],
  selectedstaff:[],
  getNearByStaff: async (skip, limit, location) => {
    try {
      const userid = useLoginStore.getState().loggedInUser?._id;
      // console.log("useLoginStore.getState().loggedInUser",useLoginStore.getState().loggedInUser);
      const coord = {
        lat: location?.location?.coords?.latitude || undefined,
        long: location?.location?.coords?.longitude || undefined,
      };
      let params = {
        skip,
        limit,
        excludeIds: [userid],
        nearBy: [coord.lat,coord.long],
        sortDesc: ['createdat'],
      };
      const res = await API.get(`${USER}`, {
        headers: {Authorization: await getToken()},
        params,
      });
      if (res && res.data?.data) {
        set({nearbyusers: res?.data?.data});
      }
    } catch (error) {
      console.log('in the error', error);
    }
  },

  clearUsers: () => set({nearbyusers: [],stafflist:[]}),
  getStaff: async (skip, limit, payload) => {
    try {
      const userid = useLoginStore.getState().loggedInUser?._id;
      const params = {};
      params.skip = skip || 0;
      params.limit = limit || 10;
      params.excludeIds =[userid];
      params.sortDesc=['createdat'];
      if (payload?.text) {
        params.wildString = payload.text;
      }
     

      // if (salary === -1) params.sortDesc = ['salary'];
      // if (salary === 1) params.sortAsc = ['salary'];
      // if (searchText?.length) {
      //   params.text = searchText;
      // }
      const res = await API.get(`${USER}`, {
        headers: {Authorization: await getToken()},
        params,
      });
      if (res && res.data?.data) {
        set({
          stafflist: res?.data?.data,
        });
        return res.data?.data;
      }else{
        return false;
      }
    } catch (error) {
      console.log('error ----', error);
    }
  },
  getStaffFlatlist: async (skip, limit, searchQuery) => {
    try {
      const userid = useLoginStore.getState().loggedInUser?._id;
      const params = {};
      params.skip = skip || 0;
      params.limit = limit || 10;
      params.excludeIds =[userid];
      params.sortDesc=['createdat'];
      if (payload?.text) {
        params.wildString = payload.text;
      }
    
      // if (salary === -1) params.sortDesc = ['salary'];
      // if (salary === 1) params.sortAsc = ['salary'];
      // if (searchText?.length) {
      //   params.text = searchText;
      // }
      console.log("params before call in getStaffFlatlist",params);
      const res = await API.get(`${USER}`, {
        headers: {Authorization: await getToken()},
        params,
      });
      if (res && res.data?.data) {
        return res.data?.data;
      }else{
        return false;
      }
    } catch (error) {
      console.log('error ----', error);
    }
  },
  getNearByStaffById: async id => {
    try {
      const res = await API.get(`${USER}/${id}`, {
        headers: {Authorization: await getToken()},
      });
      console.log("response in store",res.data);
      if (res && res.data) {
        return res.data
      }else{
        return false
      }
    } catch (error) {
      console.log(error);
      console.log(JSON.stringify(error, null, 5));
      Toast.show({
        type: 'tomatoToast',
        text1: 'User Details not found',
      });
    }
  },
}));

export default useStaffStore;
