import {
  REACT_APP_DEV_MODE,
  REACT_APP_ENV,
  REACT_APP_LOCAL_MODE,
  REACT_APP_TEST_MODE,
  REACT_APP_PRODUCTION_MODE,
} from '../../env.js';
let COMMON_ENDPOINT = '';

switch (REACT_APP_ENV) {
  case 'dev':
    COMMON_ENDPOINT = `${REACT_APP_DEV_MODE}/api/`;
    break;
  case 'local':
    COMMON_ENDPOINT = `${REACT_APP_LOCAL_MODE}/api/`;
    break;
  case 'production':
    COMMON_ENDPOINT = `${REACT_APP_PRODUCTION_MODE}/api/`;
    break;
  case 'test':
    COMMON_ENDPOINT = `${REACT_APP_TEST_MODE}/api/`;
    break;

  default:
    COMMON_ENDPOINT = `${REACT_APP_LOCAL_MODE}/api/`;
    break;
}

export const USER = `${COMMON_ENDPOINT}users`;
export const LOGIN_USER = `${COMMON_ENDPOINT}authentication`;
export const GET_OTP = `${COMMON_ENDPOINT}login`;

export const JOBS = `${COMMON_ENDPOINT}jobs`;
export const JOBS_APPLICATIONS = `${COMMON_ENDPOINT}jobapplications`;
export const CHATS = `${COMMON_ENDPOINT}chats`;

export const feathersServices = {
  chats: 'chats',
};
