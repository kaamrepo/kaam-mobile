import {create} from 'zustand';
import API from '../helper/API';
import {CHATS, JOBS_APPLICATIONS} from '../helper/endpoints';
import {getToken} from './authentication/login.store';

const useInboxStore = create<useInboxStoreType>((set, get) => ({
  inboxList: undefined,
  setInboxList: async userid => {
    try {
      console.log('ILAY');
      const res = await API.get(`${JOBS_APPLICATIONS}`, {
        headers: {Authorization: await getToken()},
        params: {
          $or: [{employerid: userid}, {appliedby: userid}],
        },
      });
      if (res && res.data) {
        set({inboxList: res.data});
        return true;
      }
    } catch (error) {
      console.log('error', error);
      return false;
    }
  },
  clearInboxList: () => set({inboxList: undefined}),
}));
export default useInboxStore;

type useInboxStoreType = {
  inboxList: undefined | inboxListType;
  setInboxList: (userid: string) => Promise<boolean | undefined>;
  clearInboxList: () => void;
};

type inboxListType = {
  total: number;
  skip: number;
  limit: number;
  data: inboxListItemType[];
};
export interface inboxListItemType {
  _id: string;
  applicationid: string;
  messages: Message[];
  createdat: Date;
  isactive: boolean;
  updatedat: Date;
  applicationDetails: ApplicationDetails;
}

export interface ApplicationDetails {
  _id: string;
  jobid: string;
  employerid: string;
  createdat: Date;
  status: string;
  appliedby: string;
  chatid: string;
  updatedat: Date;
  applicantDetails: ApplicantDetails;
  jobDetails: JobDetails;
}

export interface ApplicantDetails {
  _id: string;
  phone: string;
  lastname: string;
  firstname: string;
  dialcode: string;
  isactive: boolean;
  createdat: Date;
  updatedat: Date;
  profilepic: string;
  aboutme: string;
}

export interface JobDetails {
  _id: string;
  tags: string[];
  salary: number;
  description: string;
  jobtitle: string;
  salarybasis: string;
  location: Location;
  createdby: string;
  createdat: Date;
  employerDetails: EmployerDetails;
}

export interface EmployerDetails {
  firstname: string;
  lastname: string;
  _id: string;
}

export interface Location {
  fulladdress: string;
  coordinates: number[];
  type: string;
}

export interface Message {
  _id: string;
  messageType: MessageType;
  senderid: string;
  text: string;
  createdat: Date;
  isseen: boolean;
}

export enum MessageType {
  Initial = 'initial',
  Text = 'text',
}
