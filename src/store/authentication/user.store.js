import { create } from 'zustand';
import API from '../../helper/API';
import { USER } from '../../helper/endpoints';
import Toast from 'react-native-toast-message';
import useLoginStore, { getToken, retrieveUserSession } from './login.store';


const useUsersStore = create((set, get) => ({
    updateAboutMeStore: async (userid, data) =>
    {
        try
        {
            const res = await API.patch(`${ USER }/${ userid }`, data, { headers: { Authorization: await getToken() } });

            if (res && res.data)
            {
                useLoginStore.getState().setloggedInUser(res.data)
                Toast.show({
                    type: 'success',
                    text1: "Profile saved successfully!",
                });
                return true;
            }

        } catch (error)
        {
            Toast.show({
                type: 'tomatoToast',
                text1: "Failed to save data!",
            });
            return false;
        }
    },
    updateDetailsStore: async (userid, data) =>
    {
        try
        {
            data = {
                ...data,
                dateofbirth: new Date(data.dateofbirth).toISOString()
            }
            const res = await API.patch(`${ USER }/${ userid }`, data, { headers: { Authorization: await getToken() } });

            if (res && res.data)
            {
                useLoginStore.getState().setloggedInUser(res.data)
                Toast.show({
                    type: 'success',
                    text1: "Profile saved successfully!",
                });
                return true;
            }

        } catch (error)
        {
            Toast.show({
                type: 'tomatoToast',
                text1: "Failed to save data!",
            });
            return false;
        }
    },
    updateAddressStore: async (userid, data) =>
    {
        try
        {
            const res = await API.patch(`${ USER }/${ userid }`, { address: data }, { headers: { Authorization: await getToken() } });

            if (res && res.data)
            {
                useLoginStore.getState().setloggedInUser(res.data)
                Toast.show({
                    type: 'success',
                    text1: "Profile saved successfully!",
                });
                return true;
            }

        } catch (error)
        {
            Toast.show({
                type: 'tomatoToast',
                text1: "Failed to save data!",
            });
            return false;
        }
    },
    updateAadharInfoStore: async (userid, data) =>
    {
        try
        {
            const res = await API.patch(`${ USER }/${ userid }`, data, { headers: { Authorization: await getToken() } });

            if (res && res.data)
            {
                useLoginStore.getState().setloggedInUser(res.data)
                Toast.show({
                    type: 'success',
                    text1: "Profile saved successfully!",
                });
                return true;
            }

        } catch (error)
        {
            Toast.show({
                type: 'tomatoToast',
                text1: "Failed to save data!",
            });
            return false;
        }
    },

    updatePANInfoStore: async (userid, data) =>
    {
        try
        {
            const res = await API.patch(`${ USER }/${ userid }`, data, { headers: { Authorization: await getToken() } });

            if (res && res.data)
            {
                useLoginStore.getState().setloggedInUser(res.data)
                Toast.show({
                    type: 'success',
                    text1: "Profile saved successfully!",
                });
                return true;
            }

        } catch (error)
        {
            Toast.show({
                type: 'tomatoToast',
                text1: "Failed to save data!",
            });
            return false;
        }
    }
}))


export default useUsersStore;