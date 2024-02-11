import {create} from 'zustand';
import API from '../helper/API';
import {JOBS, JOBS_APPLICATIONS} from '../helper/endpoints';
import useLoginStore, {getToken} from './authentication/login.store';

const useMenuStore = create((set, get) => ({
  jobapplications: undefined,
  postedJobs: undefined,
  getJobApplications: async () => {
    try {
      const userid = useLoginStore.getState().loggedInUser?._id;

      const res = await API.get(JOBS_APPLICATIONS, {
        headers: {Authorization: await getToken()},
        params: {appliedby: userid},
      });
      if (res?.data) {
        set({jobapplications: res?.data});
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 4));
    }
  },
  clearJobApplications: () => set({jobapplications: undefined}),

  getPostedJobs: async () => {
    try {
      const userid = useLoginStore.getState().loggedInUser?._id;
      console.log('AALO');
      const res = await API.get(JOBS, {
        headers: {Authorization: await getToken()},
        params: {createdby: userid},
      });
      if (res?.data) {
        set({postedJobs: res?.data});
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 4));
    }
  },
  clearPostedJobs: () => set({postedJobs: undefined}),
}));

export default useMenuStore;
