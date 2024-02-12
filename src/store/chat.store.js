import {create} from 'zustand';
import {feathersServices} from '../helper/endpoints';
import client from '../../client';

const useChatStore = create((set, get) => ({
  chat: undefined,
  clearChat: () => set({chat: undefined}),
  chatUpdatedEvent: () => {
    client.service(feathersServices.chats).on('patched', data => {
      set({chat: data});
    });
  },
  sendChatMessage: async (chatid, payload) => {
    try {
      const res = await client
        .service(feathersServices.chats)
        .patch(chatid, payload);
    } catch (error) {
      console.log(error);
    }
  },
  getChatMessages: async chatid => {
    try {
      const res = await client.service(feathersServices.chats).get(chatid);
      set({chat: res});
    } catch (error) {
      console.log('ERROR', error);
    }
  },
}));

export default useChatStore;
