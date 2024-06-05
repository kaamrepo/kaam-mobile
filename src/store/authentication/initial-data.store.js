import {create} from 'zustand';
import {CATEGORIES, USER} from '../../helper/endpoints';
import useLoginStore, {getToken} from './login.store';
import API from '../../helper/API';

export const useInitialDataStore = create((set, get) => ({
  categories: undefined,
  getCategories: async () => {
    try {
      const res = await API.get(`${CATEGORIES}`, {
        headers: {Authorization: await getToken()},
        params: {
          isActive: true,
          paginate:false
        },
      });

      if (res && res.data) {
        console.log(res.data);
        set({categories: res.data});
        return true;
      }
    } catch (error) {
      console.log(error);
      console.log(
        'useInitialDataStore:getCategories',
        JSON.stringify(error, null, 4),
      );
      return false;
    }
  },
  setCategories: async data => {
    try {
      const userid = useLoginStore.getState().loggedInUser?._id;
      const res = await API.patch(`${USER}/${userid}`, data, {
        headers: {Authorization: await getToken()},
      });
      if (res?.data) {
       
        useLoginStore.getState().setloggedInUser(res.data)
        return true;
      } else return false;
    } catch (error) {
      console.log(
        'useInitialDataStore:setCategories:',
        JSON.stringify(error, null, 4),
      );
      return false;
    }
  },
}));
