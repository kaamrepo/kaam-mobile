import {create} from 'zustand';
import API from '../helper/API';
import useLoginStore, {getToken} from './authentication/login.store';

const useChatStore = create((set, get) => ({
  chat: undefined,
  getChat: async jobid => {},
}));

export default useChatStore;
