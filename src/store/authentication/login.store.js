import {create} from 'zustand';
import API from '../../helper/API';
import {LOGIN_USER, GET_OTP} from '../../helper/endpoints';
import Toast from 'react-native-toast-message';
import useRegistrationStore from './registration.store.js';
import EncryptedStorage from 'react-native-encrypted-storage';
import client from '../../../client';

const useLoginStore = create((set, get) => ({
  loggedInUser: undefined,
  isLoggedIn: false,
  language: 'English',
  getLanguage: async () => {
    (async () => {
      let response = await retrieveLanguage();
      if (response) set({language: response});
    })();
  },
  setLoggedInUserDetails: async (user, isLoggedIn) => {
    set({isLoggedIn: isLoggedIn, loggedInUser: user});
  },
  setloggedInUser: async data => {
    let userSession = await retrieveUserSession();
    userSession = JSON.parse(userSession);
    userSession['user'] = data;
    await storeUserSession(userSession);
    set({loggedInUser: data});
  },
  login: async userLoginFormData => {
    try {
      const data = await useRegistrationStore.getState().loginDetails;
      let payload = {
        phone: data.phone,
        date: new Date().toISOString(),
        otp: userLoginFormData,
        strategy: 'local',
      };
      const res = await API.post(LOGIN_USER, payload);

      if (res && res.status === 201) {
        await storeUserSession(res.data);
        set({loggedInUser: res.data.user, isLoggedIn: true});
      }
      return true;
    } catch (error) {
      Toast.show({
        type: 'tomatoToast',
        text1: error.response.data.message ?? 'ERROR::login',
      });
      return false;
    }
  },
  getOTP: async data => {
    try {
      const res = await API.patch(GET_OTP, data);
      if (res && res.status === 200) {
        useRegistrationStore.getState().setLoginDetails({
          phone: res.data.phone,
          dialcode: res.data.dialcode,
        });
        return true;
      }
    } catch (error) {
      Toast.show({
        type: 'tomatoToast',
        text1: error.response.data.message ?? 'ERROR::getOTP',
      });
      return false;
    }
  },
  logout: async () => {
    try {
      await removeUserSession();
      set({loggedInUser: undefined, isLoggedIn: false});
    } catch (error) {}
  },
  selectLanguage: async data => {
    try {
      set({language: data});
      await storeUserlanguage(data);
    } catch (error) {
      console.log(JSON.stringify(error, null, 5));
    }
  },
}));

export default useLoginStore;

export const getToken = async () => {
  try {
    let token = await retrieveUserSession();
    token = JSON.parse(token);
    return token.accessToken;
  } catch (error) {  console.log("error::getToken", error)}
};

export const storeUserSession = async data => {
  try {
    await EncryptedStorage.setItem('user_session', JSON.stringify(data));
    await EncryptedStorage.setItem('accessToken', data.accessToken);
    await EncryptedStorage.setItem(
      'isLoggedIn',
      JSON.stringify({isLoggedIn: true}),
    );
    try {
      await client.reAuthenticate();
    } catch (error) {
      console.log('client error', error);
    }
  } catch (error) {
    console.log("error::storeUserSession", error)
  }
};
export const storeUserlanguage = async data => {
  try {
    const input = {selectedLanguage: data};
    try {
      const dataAsString = JSON.stringify(input);
      await EncryptedStorage.setItem('setLanguage', dataAsString);
      console.log('Data stored successfully.');
    } catch (error) {
      console.error('Error storing data:', error);
    }
  } catch (error) {  console.log("error::storeUserlanguage ", error)}
};

export const retrieveUserSession = async () => {
  try {
    const session = await EncryptedStorage.getItem('user_session');

    if (session !== undefined) {
      return session;
    }
  } catch (error) {}
};
export const retrieveLoggedInState = async () => {
  try {
    const isLoggedIn = await EncryptedStorage.getItem('isLoggedIn');

    if (isLoggedIn !== undefined) {
      return isLoggedIn ? JSON.parse(isLoggedIn) : false;
    }
  } catch (error) {}
};
export const retrieveLanguage = async () => {
  try {
    const storedData = await EncryptedStorage.getItem('setLanguage');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const language = parsedData.selectedLanguage;
      return language;
    } else {
      console.log('No language data found in storage.');
    }
  } catch (error) {
    console.error('Error retrieving language data:', error);
  }
};

export const removeUserSession = async () => {
  try {
    await EncryptedStorage.removeItem('user_session');
    await EncryptedStorage.removeItem('isLoggedIn');
    await EncryptedStorage.removeItem('accessToken');
  } catch (error) {}
};

const clearStorage = async () => {
  try {
    await EncryptedStorage.clear();
    // Congrats! You've just cleared the device storage!
  } catch (error) {
    // There was an error on the native side
  }
};
