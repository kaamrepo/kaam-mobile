import {create} from 'zustand';
import API from '../helper/API';
import useLoginStore, {getToken} from './authentication/login.store';
import {CHATS} from '../helper/endpoints';

const useChatStore = create((set, get) => ({
  chat: undefined,
  getChatAndMessages: async chatid => {
    try {
      const res = await API.get(`${CHATS}/${chatid}`, {
        headers: {Authorization: await getToken()},
      });

      if (res && res.data) {
        set({chat: res.data});
        return true;
      }
    } catch (error) {
      console.log(
        '\nchat.store/getChatAndMessages/error\n',
        JSON.stringify(error, null, 5),
      );
      return false;
    }
  },
  clearChatAndMessages: () => {
    set({chat: undefined});
  },
 
  sendChatMessage: async (applicationid, payload) => {
     try {
       const res = await API.get(`${CHATS}/${chatid}`, {
         headers: {Authorization: await getToken()},
       });

       if (res && res.data) {
         set({chat: res.data});
         return true;
       }
     } catch (error) {
       console.log(
         '\nchat.store/getChatAndMessages/error\n',
         JSON.stringify(error, null, 5),
       );
       return false;
     }
  },
}));

export default useChatStore;
