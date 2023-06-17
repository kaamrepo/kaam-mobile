import { REACT_APP_DEV_MODE } from "../../env.js"
const COMMON_ENDPOINT = `${ REACT_APP_DEV_MODE }/api/`

export const REGISTER_USER = `${ COMMON_ENDPOINT }users`
export const LOGIN_USER = `${ COMMON_ENDPOINT }authentication`

