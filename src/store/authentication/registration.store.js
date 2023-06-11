import { create } from 'zustand';
import API from '../../helper/API';
import { REGISTER_USER } from '../../helper/endpoints';
import Toast from 'react-native-toast-message';

const useRegistrationStore = create((set) => ({
    loginDetails: {},
    registerUser: async (userRegistrationFormData) =>
    {
        try
        {
            console.log(userRegistrationFormData);
            console.log(REGISTER_USER);
            const res = await API.post(REGISTER_USER, userRegistrationFormData)
            console.log("🥗🥗🥗🥗🥗", res);
            if (res && res.status === 201)
            {
                const loginDetails = {
                    phone: userRegistrationFormData.phone,
                    dialcode: userRegistrationFormData.dialcode,
                    strategy: "local"
                }
                set({ loginDetails: loginDetails })
                return true;
            }
        } catch (error)
        {
            console.log(error.response.data);
            console.log(error.response.status);
            Toast.show({
                type: 'tomatoToast',
                text1: error.response.data.message,
                // text1: 'User already registered.',
            });
            return false;
        }
    }
}))


export default useRegistrationStore;