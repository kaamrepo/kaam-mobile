import {create} from 'zustand';
import API from '../helper/API';
import {CHATS} from '../helper/endpoints';
import {getToken} from './authentication/login.store';

const useInboxStore = create<useInboxStoreType>((set, get) => ({
  inboxList: undefined,
  setInboxList: async userid => {
    try {
      const res = await API.get(`${CHATS}`, {
        headers: {Authorization: await getToken()},
      });

      if (res && res.data) {
        set({inboxList: res.data});
        return true;
      }
    } catch (error) {
      return false;
    }
  },
  clearInboxList: () => set({inboxList: undefined}),
}));
export default useInboxStore;

type useInboxStoreType = {
  inboxList: undefined;
  setInboxList: (userid: string) => Promise<boolean | undefined>;
  clearInboxList: () => void;
};
