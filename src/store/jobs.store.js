import {create} from 'zustand';
import API from '../helper/API';
import {JOBS, JOBS_APPLICATIONS} from '../helper/endpoints';
import Toast from 'react-native-toast-message';
import useLoginStore, {getToken} from './authentication/login.store';

const useJobStore = create((set, get) => ({
  nearbyjobs: {},
  recommendedJobs: {},
  featuredJobs: {},
  job: {},
  searchedJobs: {},

  getNearByJobs: async (skip = 0, limit = 5, coordinates) => {
    try {
      const userid = useLoginStore.getState().loggedInUser?._id;
      let params = {
        skip,
        limit,
        createdby: {
          $nin: [userid],
        },
        // coordinates,
        sortDesc: ['createdat'],
        type: 'nearby',
      };
      const res = await API.get(`${JOBS}`, {
        headers: {Authorization: await getToken()},
        params,
      });
      console.log("params in nearby jobs",params);
      console.log("res in the nearboy jobs",res?.data);
      if (res && res.data) {
        set({nearbyjobs: res.data});
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 5));
      // Toast.show({
      //     type: 'tomatoToast',
      //     text1: 'Failed to get jobs!',
      // });
    }
  },
  getRecommendedJobs: async (skip = 0, limit = 10) => {
    try {
      const userid = useLoginStore.getState().loggedInUser?._id;
      let params = {
        skip,
        limit,
        createdby: {
          $nin: [userid],
        },
        type: 'recommended',
      };
      const res = await API.get(`${JOBS}`, {
        headers: {Authorization: await getToken()},
        params,
      });
      if (res && res.data) {
        set({recommendedJobs: res.data});
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 5));
      // Toast.show({
      //     type: 'tomatoToast',
      //     text1: 'Failed to get jobs!',
      // });
    }
  },
  getFeaturedJobs: async (skip = 0, limit = 10) => {
    try {
      const userid = useLoginStore.getState().loggedInUser?._id;
      let params = {
        skip,
        limit,
        createdby: {
          $nin: [userid],
        },
        type: 'featured',
      };
      const res = await API.get(`${JOBS}`, {
        headers: {Authorization: await getToken()},
        params,
      });
      if (res && res.data) {
        set({featuredJobs: res.data});
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 5));
      // Toast.show({
      //     type: 'tomatoToast',
      //     text1: 'Failed to get jobs!',
      // });
    }
  },
  clearNearByJobs: () => set({nearbyjobs: {}}),
  clearRecommendedJobs: () => set({recommendedJobs: {}}),
  clearFeaturedJobs: () => set({featuredJobs: {}}),
  clearsearchedJobs: () => set({searchedJobs: {}}),
  clearJob: () => set({job: {}}),
  getSearchedJobs: async (
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
  applyForJob: async payload => {
    try {
      const res = await API.post(`${JOBS_APPLICATIONS}`, payload, {
        headers: {
          Authorization: await getToken(),
        },
      });
      if (res?.data) {
        Toast.show({
          type: 'success',
          text1: 'Applied successfully!',
        });
        return res?.data?._id;
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 4));
      Toast.show({
        type: 'tomatoToast',
        text1: 'Something went wrong!',
      });
      return false;
    }
  },
  updateUserProfileStore: async (userid, data) => {
    try {
      const res = await API.patch(`${USER}/${userid}`, data, {
        headers: {
          Authorization: await getToken(),
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res?.data) {
        useLoginStore.getState().setloggedInUser(res.data);
        Toast.show({
          type: 'success',
          text1: 'Profile Updated successfully!',
        });
        return true;
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 4));
      Toast.show({
        type: 'tomatoToast',
        text1: 'Failed to save data!',
      });
      return false;
    }
  },
  postJobs: async payload => {
    try {
      const res = await API.post(`${JOBS}`, payload, {
        headers: {
          Authorization: await getToken(),
        },
      });

      if (res?.data) {
        Toast.show({
          type: 'success',
          text1: 'Job created successfully!',
        });
        return true;
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 4));
      Toast.show({
        type: 'tomatoToast',
        text1: 'Failed to post a job!',
      });
      return false;
    }
  },
  updateJobStatus: async payload => {
    try {
      console.log("payload",payload)
      const res = await API.patch(`${JOBS}/${payload.applicationId}`,{ status: payload.status }, {
        headers: {
          Authorization: await getToken(),
        },
      });

      if (res?.data && payload.status === "Rejected") {
        Toast.show({
          type: 'success',
          text1: 'Application Rejected!',
        });
        return true;
      }
      if (res?.data && payload.status === "Approved") {
        Toast.show({
          type: 'success',
          text1: 'Application Approved!',
        });
        return true;
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 4));
      Toast.show({
        type: 'tomatoToast',
        text1: 'Application Failed!',
      });
      return false;
    }
  },
}));

export default useJobStore;
