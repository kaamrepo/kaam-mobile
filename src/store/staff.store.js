import {create} from 'zustand';
import API from '../helper/API';
import {JOBS, USER} from '../helper/endpoints';
import Toast from 'react-native-toast-message';
import useLoginStore, {getToken} from './authentication/login.store';

const useStaffStore = create((set, get) => ({
  nearbyusers: {},
  stafflist:{},
  getNearByStaff: async (skip, limit, location) => {
    try {
      const userid = useLoginStore.getState().loggedInUser?._id;
      let params = {
        skip,
        limit,
        _id: {
          $nin: [userid],
        },
        coordinates:location,
        sortDesc: ['createdat'],
        type: 'nearby',
      };
      const res = await API.get(`${USER}`, {
        headers: {Authorization: await getToken()},
        params,
      });
      console.log("res of staff",res.data);
      if (res && res.data) {
        set({nearbyusers: res.data});
      }
    } catch (error) {
        console.log("in the error",error);
    }
  },

  clearnearbyusers: () => set({nearbyusers: {}}),
  getSearchStaff: async (
    skip = 0,
    limit = 10,
    {type, coordinates, searchText, salary},
  ) => {
    try {
      const userid = useLoginStore.getState().loggedInUser?._id;
      let params = {
        skip,
        limit,
        createdby: {
          $nin: [userid],
        },
        type,
      };
      if (salary === -1) params.sortDesc = ['salary'];
      if (salary === 1) params.sortAsc = ['salary'];
      if (coordinates?.length) {
        params.coordinates = coordinates;
      }
      if (searchText?.length) {
        params.text = searchText;
      }
      const res = await API.get(`${JOBS}`, {
        headers: {Authorization: await getToken()},
        params,
      });
      let currentSearchedJobs = get().searchedJobs;
      console.log(
        'this ++++++++++++++',
        get().searchedJobs?.length,
        '+++++++++++++++++++++',
      );
      console.log(
        'res.data---------------------',
        res?.data?.data?.length,
        '-------------------',
      );
      if (res && res.data) {
        set({
          searchedJobs: currentSearchedJobs?.length
            ? [...currentSearchedJobs, ...res?.data?.data]
            : [...res?.data?.data],
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  },
  getNearByJobById: async id => {
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
