import {create} from 'zustand';
import API from '../helper/API';
import {CATEGORIES} from '../helper/endpoints';
import useLoginStore, {getToken} from './authentication/login.store';

const useCategoriesStore = create((set, get) => ({
  categories: [],
  clearCategories: () => set({categories: []}),
  getCategories: async (payload) => {
    try {
        let params={};
        payload?.isActive ? params.isActive = payload.isActive :''
        payload?.skip ? params.skip = payload.skip : ''
        payload?.limit ? params.limit = payload.limit : ''
      const res = await API.get(CATEGORIES, {
        headers: {Authorization: await getToken()},
        params,
      });
      if (res?.data?.data) {
          set({categories: res?.data?.data});
          return{
            data:res?.data?.data,
            response:true
          }
        }
        else{
            return{
                data:res?.data?.data,
                response:false
              }
        }
      }
    catch (error) {
      console.log("Error",error);
    }
  },

}));

export default useCategoriesStore;
