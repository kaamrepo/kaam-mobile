import { create } from 'zustand';
import API from '../../helper/API';
import { LOGIN_USER, GET_OTP } from '../../helper/endpoints';
import Toast from 'react-native-toast-message';
import useRegistrationStore from './registration.store.js';
import EncryptedStorage from 'react-native-encrypted-storage';

const useLoginStore = create((set, get) => ({
    loggedInUser: undefined,
    isLoggedIn: false,
    setLoggedInUserDetails: async (user, isLoggedIn) =>
    {
        set({ isLoggedIn: isLoggedIn, loggedInUser: user })
    },
    setloggedInUser: async (data) =>
    {

        let userSession = await retrieveUserSession();
        userSession = JSON.parse(userSession);
        userSession['user'] = data;
        await storeUserSession(userSession)
        set({ loggedInUser: data })
    },
    login: async (userLoginFormData) =>
    {
        try
        {
            const data = await useRegistrationStore.getState().loginDetails;
            let payload = { phone: data.phone, date: new Date().toISOString(), otp: userLoginFormData, strategy: "local" };
            const res = await API.post(LOGIN_USER, payload);

            if (res && res.status === 201)
            {
                await storeUserSession(res.data)
                set({ loggedInUser: res.data.user, isLoggedIn: true })
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
    },
    getOTP: async (data) =>
    {
        try
        {
            const res = await API.patch(GET_OTP, data);
            if (res && res.status === 200)
            {
                useRegistrationStore.getState().setLoginDetails({ phone: res.data.phone, dialcode: res.data.dialcode })
                return true;
            }
        } catch (error)
        {
            Toast.show({
                type: 'tomatoToast',
                text1: error.response.data.message,
            });
            return false;
        }
    },
    logout: async () =>
    {
        try
        {
            await removeUserSession();
            set({ loggedInUser: undefined, isLoggedIn: false })
        } catch (error)
        {

        }
    },
}))


export default useLoginStore;




export const getToken = async () =>
{
    try
    {
        let token = await retrieveUserSession();
        token = JSON.parse(token);
        return token.accessToken;
    } catch (error)
    {

    }
}


export const storeUserSession = async (data) =>
{
    try
    {
        await EncryptedStorage.setItem(
            "user_session",
            JSON.stringify(data)
        );
        await EncryptedStorage.setItem(
            "isLoggedIn",
            JSON.stringify({ isLoggedIn: true })
        );
    } catch (error)
    {
    }
}

export const retrieveUserSession = async () =>
{
    try
    {
        const session = await EncryptedStorage.getItem("user_session");

        if (session !== undefined)
        {
            return session;
        }
    } catch (error)
    {
    }
}
export const retrieveLoggedInState = async () =>
{
    try
    {
        const isLoggedIn = await EncryptedStorage.getItem("isLoggedIn");

        if (isLoggedIn !== undefined)
        {
            return isLoggedIn ? JSON.parse(isLoggedIn) : false;
        }
    } catch (error)
    {
    }
}

export const removeUserSession = async () =>
{
    try
    {
        await EncryptedStorage.removeItem("user_session");
        await EncryptedStorage.removeItem("isLoggedIn");

    } catch (error)
    {
    }
}

const clearStorage = async () =>
{
    try
    {
        await EncryptedStorage.clear();
        // Congrats! You've just cleared the device storage!
    } catch (error)
    {
        // There was an error on the native side
    }
}
