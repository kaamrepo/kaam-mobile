import {create} from 'zustand';
import API from '../helper/API';
import {JOBS, USER} from '../helper/endpoints';
import Toast from 'react-native-toast-message';
import useLoginStore, {getToken} from './authentication/login.store';

const useStaffStore = create((set, get) => ({
  nearbyusers: {},
  stafflist: {},
  getNearByStaff: async (skip, limit, location) => {
    try {
      const userid = useLoginStore.getState().loggedInUser?._id;
      // console.log("useLoginStore.getState().loggedInUser",useLoginStore.getState().loggedInUser);
      const coord = {
        lat: location?.coords?.latitude || undefined,
        long: location?.coords?.longitude || undefined,
      };
      let params = {
        skip,
        limit,
        _id: {
          $nin: [userid],
        },
        coordinates: coord,
        sortDesc: ['createdat'],
        type: 'nearby',
      };
      console.log(' params in store', params);
      // const res = await API.get(`${USER}`, {
      //   headers: {Authorization: await getToken()},
      //   params,
      // });
      // console.log("res of staff",res.data);
      // if (res && res.data) {
      //   set({nearbyusers: res.data});
      // }
    } catch (error) {
      console.log('in the error', error);
    }
  },

  clearnearbyusers: () => set({nearbyusers: {}}),
  getStaff: async (skip, limit, payload) => {
    const userid = useLoginStore.getState().loggedInUser?._id;
    const params = {};
    params.skip = skip;
    params.limit = limit;
    params.createdby= {
           $nin: [userid],
       }
       if (payload?.text) {
        params.name = payload.text
       }
    try {
      // let params = {
      //   skip,
      //   limit,
      
      //   type,
      // };
      console.log('params in getSEarch staf', params);
      // if (salary === -1) params.sortDesc = ['salary'];
      // if (salary === 1) params.sortAsc = ['salary'];
      // if (searchText?.length) {
      //   params.text = searchText;
      // }
      // const res = await API.get(`${USER}`, {
      //   headers: {Authorization: await getToken()},
      //   params,
      // });
      // let currentSearchedJobs = get().searchedJobs;
      // if (res && res.data) {
      //   set({
      //     searchedJobs: currentSearchedJobs?.length
      //       ? [...currentSearchedJobs, ...res?.data?.data]
      //       : [...res?.data?.data],
      //   });
      // }
    } catch (error) {
      console.log('error ----', error);
    }
  },
  getNearByStaffById: async id => {
    try {
      let params = {};
      const res = await API.get(`${JOBS}/${id}`, {
        headers: {Authorization: await getToken()},
        params,
      });

      if (res && res.data) {
        set({job: res.data});
      }
    } catch (error) {
      console.log(error);
      console.log(JSON.stringify(error, null, 5));
      Toast.show({
        type: 'tomatoToast',
        text1: 'Failed to get a job details!',
      });
    }
  },
}));

export default useStaffStore;
