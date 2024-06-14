import {create} from 'zustand';
import API from '../helper/API';
import {
  JOBS,
  JOBS_APPLICATIONS,
  POSTAL_ADDRESS_API_URL,
} from '../helper/endpoints';
import Toast from 'react-native-toast-message';
import useLoginStore, {getToken} from './authentication/login.store';

const useJobStore = create((set, get) => ({
  nearbyjobs: [],
  job: [],
  jobApplicationForm: [],
  address: {
    cities: [],
  },

  getJobs: async payload => {
    try {
      const {
        skip,
        limit,
        type,
        coordinates,
        wildStringForJobs,
        excludeIds,
        createdby,
        excludeIdsInJobSearch,
        exclude,
        categories
      } = payload;

      const params = Object.assign(
        {},
        skip && {skip},
        limit && {limit},
        type && {type},
        exclude && {exclude},
        coordinates?.length && {coordinates},
        wildStringForJobs && {wildStringForJobs},
        excludeIds?.length && {excludeIds},
        categories?.length && {categories},
        excludeIdsInJobSearch?.length && {excludeIdsInJobSearch},
        createdby && {createdby},
      );
      console.log("params beofre sneding for job search",params);
      const res = await API.get(`${JOBS}`, {
        headers: {Authorization: await getToken()},
        params: params,
      });
      if (res && res.data) {       
        set({job:  res.data?.data});
        return res.data?.data;
      }
    } catch (error) {
      console.log(error);
    }
  },
  clearJob: () => set({job: []}),
  getNearByJobById: async id => {
    try {
      let params = {};
      const res = await API.get(`${JOBS}/${id}`, {
        headers: {Authorization: await getToken()},
        params,
      });

      if (res && res.data) {
        set({jobApplicationForm: res.data});
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 5));
      Toast.show({
        type: 'tomatoToast',
        text1: 'Failed to get a job details!',
      });
    }
  },
  getJobApplication: async payload => {
    let params = {};
    payload._id ? (params._id = payload._id) : '';
    payload.employerid ? (params.employerid = payload.employerid) : '';
    payload.appliedby ? (params.appliedby = payload.appliedby) : '';
    try {
      const res = await API.get(`${JOBS_APPLICATIONS}`, {
        headers: {Authorization: await getToken()},
        params: params,
      });
      if (res?.data?.data?.length !== 0) {
        return res?.data?.data;
      } else {
        return false;
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
      console.log("payload",payload);
      let params = {};
      payload.status ? (params.status = payload.status) : '';
      payload.applicationId ? (params._id = payload.applicationId) : '';
      const res = await API.patch(
        `${JOBS_APPLICATIONS}/${params._id}`,
        {status: params.status},
        {
          headers: {
            Authorization: await getToken(),
          },
        },
      );
      if (res?.data && payload.status === 'Rejected') {
        Toast.show({
          type: 'success',
          text1: 'Application Rejected!',
        });
        return true;
      }
      if (res?.data && payload.status === 'Approved') {
        Toast.show({
          type: 'success',
          text1: 'Application Approved!',
        });
        return true;
      }
    } catch (error) {
      console.log("EEERRRRRR - ",JSON.stringify(error.response.data.message, null, 4));
      Toast.show({
        type: 'tomatoToast',
        text1: `${error?.response?.data?.message ?? 'something went wrong'}`,
      });
      return false;
    }
  },
  getAddressByPincode: async pincode => {
    try {
      const res = await API.get(`${POSTAL_ADDRESS_API_URL}/${pincode}`);
      if (res.data[0].Status === 'Success') {
        const allPinCodeAddress = res.data[0]?.PostOffice;
        const {District, State} = allPinCodeAddress[0] || {};

        let citiesSet = new Set();
        allPinCodeAddress?.forEach(p => {
          citiesSet.add(p?.Block);
          citiesSet.add(p?.Division);
          citiesSet.add(p?.Region);
        });

        const cities = Array.from(citiesSet).map((city, i) => ({
          label: city,
          value: city,
        }));
        set({address: {...get().address, cities}});

        return {
          district: District ?? '',
          state: State ?? '',
        };
      }
    } catch (error) {
      
      console.log('\n\n=======POSTAL ADDRESS error====>', error);
    }
  },
}));

export default useJobStore;
