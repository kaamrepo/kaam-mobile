import { create } from 'zustand';
import API from '../../helper/API';
import { LOGIN_USER } from '../../helper/endpoints';
import Toast from 'react-native-toast-message';
import useRegistrationStore from './registration.store.js';

const useLoginStore = create((set, get) => ({
    token: undefined,
    loggedInUser: {},
    login: async (userLoginFormData) =>
    {
        try
        {
            const data = await useRegistrationStore.getState().loginDetails;
            let payload = { phone: data.phone, date: new Date().toISOString(), otp: userLoginFormData, strategy: "local" };
            console.log(payload);
            const res = await API.post(LOGIN_USER, payload);
            if (res && res.status === 201)
            {
                console.log("🍟🍟🍟 inside res condition \n\n\n");
                console.log(res.data);
                set({ token: res.data.accessToken, loggedInUser: res.data.user })
            }
            return true;
        } catch (error)
        {
            Toast.show({
                type: 'tomatoToast',
                text1: error.response.data.message,
            });
            return false;
        }
    }
}))


export default useLoginStore;