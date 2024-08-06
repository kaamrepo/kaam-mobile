import {create} from 'zustand';
import API from '../../helper/API';
import {TERMS_AND_CONDITIONS, USER} from '../../helper/endpoints';
import Toast from 'react-native-toast-message';

const useRegistrationStore = create(set => ({
  loginDetails: {},
  termAndConditions: undefined,
  setLoginDetails: data => {
    set({loginDetails: data});
  },
  registerUser: async userRegistrationFormData => {
    try {
      const res = await API.post(USER, userRegistrationFormData);
      if (res && res.status === 201) {
        const loginDetails = {
          phone: userRegistrationFormData.phone,
          dialcode: userRegistrationFormData.dialcode,
        };
        set({loginDetails: loginDetails});
        return true;
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 4));
      Toast.show({
        type: 'tomatoToast',
        text1: error?.response?.data?.message ?? 'ERROR::registerUser',
        // text1: 'User already registered.',
      });
      return false;
    }
  },

  getTermsAndConditions: async () => {
    try {
      const res = await API.get(TERMS_AND_CONDITIONS, {
        params: {
          sortDesc: 1,
          limit: 1,
          isActive: true,
        },
      });
      set({termAndConditions: res?.data?.data?.at(0) ?? undefined});
    } catch (error) {
      console.log(JSON.stringify(error, null, 4));
    }
  },
}));

export default useRegistrationStore;
