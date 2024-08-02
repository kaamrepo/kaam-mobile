import {create} from 'zustand';
import API from '../helper/API';
import {
    APPROVAL,
} from '../helper/endpoints';
import  {getToken} from './authentication/login.store';
import useLoginStore from './authentication/login.store';
const useApprovalStore = create((set, get) => ({
  approval: [],
  postApproval: async payload => {
    try {
      const res = await API.post(`${APPROVAL}`, payload, {
        headers: {
          Authorization: await getToken(),
        },
      });

      if (res?.data) {
        return true;
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 4));
      return false;
    }
  },
  clearApproval: () => set({approval: []}),
  getRequests: async (skip = 0, limit = 10) => {
    try {
      const userid = useLoginStore.getState().loggedInUser?._id;

      const res = await API.get(`${APPROVAL}`, {
        headers: {
          Authorization: await getToken(),
        },
        params: {requestor: userid, skip, limit,sortDesc:['createdat']},
      });

      if (res?.data) {
        return true;
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 4));
      return false;
    }
  },

}));

export default useApprovalStore;
