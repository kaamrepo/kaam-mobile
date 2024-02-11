import {create} from 'zustand';
import API from '../helper/API';
import {JOBS, JOBS_APPLICATIONS} from '../helper/endpoints';
import useLoginStore, {getToken} from './authentication/login.store';

const useMenuStore = create((set, get) => ({
  jobapplications: undefined,
  postedJobs: undefined,
  applicantList: undefined,
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

  getApplicantsList: async (skip = 0, limit = 10, jobid) => {
    try {
      const userid = useLoginStore.getState().loggedInUser?._id;
      const res = await API.get(JOBS_APPLICATIONS, {
        headers: {Authorization: await getToken()},
        params: {
          jobid,
          employerid: userid,
          $skip: skip,
          $limit: limit,
        },
      });
      if (skip == 0) {
        set({applicantList: res.data});
      } else {
        let responseData = {
          total: get().applicantList.total,
          skip,
          limit,
          data: [...get().applicantList.data, ...res.data.data],
        };
        set({applicantList: responseData});
      }
    } catch (error) {}
  },
}));

export default useMenuStore;
