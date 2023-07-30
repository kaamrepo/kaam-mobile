import { REACT_APP_DEV_MODE } from "../../env.js"
const COMMON_ENDPOINT = `${ REACT_APP_DEV_MODE }/api/`

export const USER = `${ COMMON_ENDPOINT }users`
export const LOGIN_USER = `${ COMMON_ENDPOINT }authentication`
export const GET_OTP = `${ COMMON_ENDPOINT }login`

export const NEARBY_JOBS = `${ COMMON_ENDPOINT }nearby-jobs`
export const JOBS = `${ COMMON_ENDPOINT }jobs`





