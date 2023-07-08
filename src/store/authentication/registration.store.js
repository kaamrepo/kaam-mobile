import { create } from 'zustand';
import API from '../../helper/API';
import { USER } from '../../helper/endpoints';
import Toast from 'react-native-toast-message';

const useRegistrationStore = create((set) => ({
    loginDetails: {},
    setLoginDetails: (data) =>
    {
        set({ loginDetails: data })
    },
    registerUser: async (userRegistrationFormData) =>
    {
        try
        {
            const res = await API.post(USER, userRegistrationFormData)
            if (res && res.status === 201)
            {
                const loginDetails = {
                    phone: userRegistrationFormData.phone,
                    dialcode: userRegistrationFormData.dialcode,
                }
                set({ loginDetails: loginDetails })
                return true;
            }
        } catch (error)
        {
            console.log(JSON.stringify(error, null, 4));
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