import { create } from 'zustand';
import API from '../../helper/API';
import { NEARBY_JOBS } from '../../helper/endpoints';
import Toast from 'react-native-toast-message';
import useLoginStore, { getToken } from './login.store';

const useDashboardStore = create((set, get) => ({
    nearbyjobs: {},
    getNearByJobs: async (skip = 0, limit = 5) =>
    {
        try
        {
            const userid = useLoginStore.getState().loggedInUser?._id;
            let params = {
                skip,
                limit,
                employerid: {
                    $nin: [userid]
                },
                sortDesc: ['createdat']
            }
            const res = await API.get(`${ NEARBY_JOBS }/`, {
                headers: { Authorization: await getToken() },
                params
            });

            if (res && res.data)
            {
                set({ nearbyjobs: res.data })
            }
        } catch (error)
        {
            console.log(JSON.stringify(error, null, 5))
            Toast.show({
                type: 'tomatoToast',
                text1: 'Failed to get jobs!',
            });
        }
    },
    updateUserProfileStore: async (userid, data) =>
    {
        try
        {
            const res = await API.patch(`${ USER }/${ userid }`, data, {
                headers: {
                    Authorization: await getToken(),
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res?.data)
            {
                useLoginStore.getState().setloggedInUser(res.data);
                Toast.show({
                    type: 'success',
                    text1: 'Profile Updated successfully!',
                });
                return true;
            }
        } catch (error)
        {
            console.log(JSON.stringify(error, null, 4));
            Toast.show({
                type: 'tomatoToast',
                text1: 'Failed to save data!',
            });
            return false;
        }
    },
}));

export default useDashboardStore;
