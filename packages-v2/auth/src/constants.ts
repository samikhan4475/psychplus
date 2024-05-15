import { API_URL, AUTH_URL, PROVIDER_APP_URL } from '@psychplus-v2/env'

const PROVIDER_LOGIN_PAGE_URL = `${PROVIDER_APP_URL}/login`
const LOGIN_URL = `${AUTH_URL}/login`
const REFRESH_URL = `${AUTH_URL}/refresh`
const SESSION_URL = `${AUTH_URL}/session`
const USER_URL = `${API_URL}/api/users/self`

export {
  PROVIDER_LOGIN_PAGE_URL,
  LOGIN_URL,
  SESSION_URL,
  REFRESH_URL,
  USER_URL,
}
