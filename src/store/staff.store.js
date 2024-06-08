import {create} from 'zustand';
import API from '../helper/API';
import {JOBS, USER} from '../helper/endpoints';
import Toast from 'react-native-toast-message';
import useLoginStore, {getToken} from './authentication/login.store';

const useStaffStore = create((set, get) => ({
  nearbyusers: [],
  stafflist: [],
  selectedstaff:[],
  clearUsers: () => set({nearbyusers: [],stafflist:[]}),
  getStaff: async (payload) => {
    try {
      console.log("payload in getStaff *************",payload);
      const params = {};
     payload.skip? params.skip = payload.skip : '';
     payload.limit? params.limit = payload.limit : '';
     payload.limit? params.limit = payload.limit : '';
     payload?.excludeIds?.length !== 0 ? params.excludeIds = payload?.excludeIds:'';
     payload?.categories?.length !== 0 ? params.categories = payload?.categories:'';
     payload?.exclude ? params.exclude = payload?.exclude:'';
     payload?.text ? params.wildString = payload?.text:'';
     params.sortDesc=['createdat'];
      if (payload?.text) {
        params.wildString = payload.text;
      }
      console.log("params before sending===================",params);
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

  getNearByStaffById: async id => {
    try {
      const res = await API.get(`${USER}/${id}`, {
        headers: {Authorization: await getToken()},
      });
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