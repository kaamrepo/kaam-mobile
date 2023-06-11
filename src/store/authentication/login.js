import { create } from 'zustand';
import API from '../../helper/API';
import { LOGIN_USER } from '../../helper/endpoints';
import Toast from 'react-native-toast-message';
import useRegistrationStore from './registration.store';
const useLoginStore = create((set, get) => ({
    token: "",
    login: async (userLoginFormData) =>
    {
        try
        {
            const data = useRegistrationStore().get().loginDetails;
            console.log("data🍳🍳🍳", data);
            // const res = await API.post(LOGIN_USER, userLoginFormData)
            // if (res && res.status === 201)
            //     return true;
        } catch (error)
        {
            console.log(error.response.data.message);
            console.log(error.response.status);
            Toast.show({
                type: 'tomatoToast',
                text1: 'User already registered.',
            });
            return false;
        }
    }
}))


export default useLoginStore;