import {create} from 'zustand';
import API from '../helper/API';
import {
    APPROVAL,
} from '../helper/endpoints';
import Toast from 'react-native-toast-message';
import  {getToken} from './authentication/login.store';

const useApprovalStore = create((set, get) => ({
  approval: [],
  postApproval: async payload => {
    console.log("payload in the store",payload);
    try {
      const res = await API.post(`${APPROVAL}`, payload, {
        headers: {
          Authorization: await getToken(),
        },
      });

      if (res?.data) {
        Toast.show({
          type: 'success',
          text1: 'Request posted successfully!',
        });
        return true;
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 4));
      Toast.show({
        type: 'tomatoToast',
        text1: 'Failed to post request!',
      });
      return false;
    }
  },

}));

export default useApprovalStore;
