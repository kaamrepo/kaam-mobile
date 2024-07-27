import {create} from 'zustand';
import API from '../../helper/API';
import {USER} from '../../helper/endpoints';
import Toast from 'react-native-toast-message';
import useLoginStore, {getToken} from './login.store';

const useUsersStore = create((set, get) => ({
  user: undefined,
  getUser: async () => {
    try {
      const userid = useLoginStore.getState().loggedInUser?._id;
      const response = await API.get(`${USER}/${userid}`, {
        headers: {Authorization: await getToken()},
      });
      set({user: response?.data});
      return {
        status: true,
        user: response?.data,
      };
    } catch (error) {
      console.log(JSON.stringify(error, null, 4));
      console.log(`Error getting user location ${JSON.stringify(error)}`);
      return {
        status: true,
        user: {},
      };
    }
  },
  updateUserCoordinates: async data => {
    try {
      const userid = useLoginStore.getState().loggedInUser?._id;
      console.log();
      await API.patch(`${USER}/${userid}`, data, {
        headers: {Authorization: await getToken()},
      });
    } catch (error) {
      console.log(`Error updating user location ${JSON.stringify(error)}`);
      return false;
    }
  },
  updateFcmDeviceToken: async data => {
    try {
      const userid = useLoginStore.getState().loggedInUser?._id;
      await API.patch(`${USER}/${userid}`, data, {
        headers: {Authorization: await getToken()},
      });
    } catch (error) {
      console.log(`updateFcmDeviceToken ${JSON.stringify(error)}`);
      return false;
    }
  },
  updateAboutMeStore: async (userid, data) => {
    try {
      const res = await API.patch(`${USER}/${userid}`, data, {
        headers: {Authorization: await getToken()},
      });

      if (res && res.data) {
        useLoginStore.getState().setloggedInUser(res.data);
        Toast.show({
          type: 'success',
          text1: 'Profile saved successfully!',
        });
        return true;
      }
    } catch (error) {
      Toast.show({
        type: 'tomatoToast',
        text1: 'Failed to save data!',
      });
      return false;
    }
  },
  updateDetailsStore: async (userid, data) => {
    try {
      data = {
        ...data,
        dateofbirth: new Date(data.dateofbirth).toISOString(),
      };

      const res = await API.patch(`${USER}/${userid}`, data, {
        headers: {
          Authorization: await getToken(),
        },
      });

      if (res && res.data) {
        useLoginStore.getState().setloggedInUser(res.data);
        Toast.show({
          type: 'success',
          text1: 'Profile saved successfully!',
        });
        return true;
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 5));
      Toast.show({
        type: 'tomatoToast',
        text1: 'Failed to save data!',
      });
      return false;
    }
  },
  updateAddressStore: async (userid, data) => {
    try {
      const res = await API.patch(
        `${USER}/${userid}`,
        {address: data},
        {headers: {Authorization: await getToken()}},
      );

      if (res && res.data) {
        useLoginStore.getState().setloggedInUser(res.data);
        Toast.show({
          type: 'success',
          text1: 'Profile saved successfully!',
        });
        return true;
      }
    } catch (error) {
      Toast.show({
        type: 'tomatoToast',
        text1: 'Failed to save data!',
      });
      return false;
    }
  },
  updateAadharInfoStore: async (userid, data) => {
    try {
      const res = await API.patch(`${USER}/${userid}`, data, {
        headers: {Authorization: await getToken()},
      });

      if (res && res.data) {
        useLoginStore.getState().setloggedInUser(res.data);
        Toast.show({
          type: 'success',
          text1: 'Profile saved successfully!',
        });
        return true;
      }
    } catch (error) {
      Toast.show({
        type: 'tomatoToast',
        text1: 'Failed to save data!',
      });
      return false;
    }
  },
  updatePANInfoStore: async (userid, data) => {
    try {
      const res = await API.patch(`${USER}/${userid}`, data, {
        headers: {Authorization: await getToken()},
      });

      if (res?.data) {
        useLoginStore.getState().setloggedInUser(res.data);
        Toast.show({
          type: 'success',
          text1: 'Profile saved successfully!',
        });
        return true;
      }
    } catch (error) {
      Toast.show({
        type: 'tomatoToast',
        text1: 'Failed to save data!',
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
  updateActiveForJobsStatus: async (userid, status) => {
    const data = {activeforjobs: status};
    try {
      console.log('STATUS CALLED TO UPDATE', status);
      console.log('STATUS CALLED TO DATAaaaaaaaa', data);
      const res = await API.patch(`${USER}/${userid}`, data, {
        headers: {
          Authorization: await getToken(),
        },
      });

      if (res?.data) {
        useLoginStore.getState().setloggedInUser(res.data);

        return true;
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 4));

      return false;
    }
  },
}));

export default useUsersStore;
