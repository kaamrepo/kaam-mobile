import {create} from 'zustand';
import API from '../helper/API';
import {JOBS, USER} from '../helper/endpoints';
import Toast from 'react-native-toast-message';
import useLoginStore, {getToken} from './authentication/login.store';

const useStaffStore = create((set, get) => ({
  nearbyusers: [],
  stafflist: [],
  selectedstaff: [],
  clearUsers: () => set({nearbyusers: [], stafflist: []}),
  getStaff: async payload => {
    try {
      console.log("loggedInUser in store get staff",useLoginStore.getState().loggedInUser?.location);
      const params = {
        skip: payload.skip || undefined,
        limit: payload.limit || undefined,
        excludeIds: payload.excludeIds?.length ? payload.excludeIds : undefined,
        categories: payload.categories?.length ? payload.categories : undefined,
        exclude: payload.exclude || undefined,
        wildString: payload.text || undefined,
        activeforjobs: payload.activeforjobs || true,
        sortDesc: ['createdat'],
        location:useLoginStore.getState().loggedInUser?.location
      };
  
      const res = await API.get(`${USER}`, {
        headers: {Authorization: await getToken()},
        params,
      });
      if (res && res.data?.data) {
        set({
          stafflist: res?.data?.data,
        });
        return res.data?.data;
      } else {
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
        return res.data;
      } else {
        return false;
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
