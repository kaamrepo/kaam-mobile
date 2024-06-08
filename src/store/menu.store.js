import {create} from 'zustand';
import API from '../helper/API';
import {JOBS, JOBS_APPLICATIONS} from '../helper/endpoints';
import useLoginStore, {getToken} from './authentication/login.store';

const useMenuStore = create((set, get) => ({
  jobapplications: undefined,
  postedJobs: undefined,
  applicantList: undefined,
  getJobApplications: async (skip = 0, limit = 10) => {
    try {
      const userid = useLoginStore.getState().loggedInUser?._id;

      const res = await API.get(JOBS_APPLICATIONS, {
        headers: {Authorization: await getToken()},
        params: {appliedby: userid, skip, limit},
      });

      if (res?.data) {
        if (skip === 0) {
          set({jobapplications: res?.data});
        } else {
          const responseData = {
            total: res.data.total,
            skip: res.data.skip,
            limit: res.data.limit,
            data: [...get().jobapplications.data, ...res.data.data],
          };
          set({jobapplications: responseData});
        }
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 4));
    }
  },
  clearJobApplications: () => set({jobapplications: undefined}),

  getPostedJobs: async (skip = 0, limit = 10) => {
    try {
      const userid = useLoginStore.getState().loggedInUser?._id;

      const res = await API.get(JOBS, {
        headers: {Authorization: await getToken()},
        params: {createdby: userid, skip, limit},
      });

      if (res?.data) {
        if (skip === 0) {
          set({postedJobs: res?.data});
        } else {
          const responseData = {
            total: res.data.total,
            skip: res.data.skip,
            limit: res.data.limit,
            data: [...get().postedJobs.data, ...res.data.data],
          };
          set({postedJobs: responseData});
        }
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
          skip,
          limit,
        },
      });

      if (skip == 0) {
        set({applicantList: res.data});
      } else {
        let responseData = {
          total: res.data.total,
          skip: res.data.skip,
          limit: res.data.limit,
          data: [...get().applicantList.data, ...res.data.data],
        };
        set({applicantList: responseData});
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 4));
    }
  },
  clearApplicantList: () => set({applicantList: undefined}),
}));

export default useMenuStore;
