import { REACT_APP_DEV_MODE } from "../../env.js"
const COMMON_ENDPOINT = `${ REACT_APP_DEV_MODE }/api/`

export const USER = `${ COMMON_ENDPOINT }users`
export const LOGIN_USER = `${ COMMON_ENDPOINT }authentication`
export const GET_OTP = `${ COMMON_ENDPOINT }login`

export const JOBS = `${ COMMON_ENDPOINT }jobs`
export const JOBS_APPLICATIONS = `${ COMMON_ENDPOINT }jobapplications`
export const CHATS = `${COMMON_ENDPOINT}chats`;





