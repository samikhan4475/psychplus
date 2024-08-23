type AppEnv = 'development' | 'staging' | 'production'

// General
const APP_CODE = process.env.APP_CODE ?? 'p+ui'
const APP_VERSION = process.env.APP_VERSION ?? '1.0.0'
const APP_ENV = (process.env.APP_ENV ?? 'development') as AppEnv
const ROOT_DOMAIN = process.env.ROOT_DOMAIN ?? 'localhost'

// PsychPlus service URLs
const API_URL = process.env.API_URL ?? ''
const AUTH_URL = process.env.AUTH_URL ?? ''

// Scriptsure
const SCRIPTSURE_API_KEY = process.env.SCRIPTSURE_API_KEY ?? ''
const SCRIPTSURE_SECRET = process.env.SCRIPTSURE_SECRET ?? ''
const SCRIPTSURE_PLATFORM_URL = process.env.SCRIPTSURE_PLATFORM_URL ?? ''
const SCRIPTSURE_APP_URL = process.env.SCRIPTSURE_APP_URL ?? ''

// Cookies
const USER_COOKIE = process.env.USER_COOKIE ?? 'p+_user'
const ACCESS_TOKEN_COOKIE = process.env.ACCESS_TOKEN_COOKIE ?? 'p+_access_token'
const ACCESS_TOKEN_EXPIRY_COOKIE =
  process.env.ACCESS_TOKEN_EXPIRY_COOKIE ?? 'p+_access_token_expiry'
const REFRESH_TOKEN_COOKIE =
  process.env.REFRESH_TOKEN_COOKIE ?? 'p+_refresh_token'
const SCRIPTSURE_SESSION_COOKIE =
  process.env.SCRIPTSURE_SESSION_COOKIE ?? 'p+_scriptsure_session'
const SCRIPTSURE_SESSION_CREATED_AT_COOKIE =
  process.env.SCRIPTSURE_SESSION_CREATED_AT_COOKIE ??
  'p+_scriptsure_session_created_at'

export {
  APP_CODE,
  APP_VERSION,
  APP_ENV,
  ROOT_DOMAIN,
  API_URL,
  AUTH_URL,
  SCRIPTSURE_API_KEY,
  SCRIPTSURE_SECRET,
  SCRIPTSURE_PLATFORM_URL,
  SCRIPTSURE_APP_URL,
  USER_COOKIE,
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_EXPIRY_COOKIE,
  REFRESH_TOKEN_COOKIE,
  SCRIPTSURE_SESSION_COOKIE,
  SCRIPTSURE_SESSION_CREATED_AT_COOKIE,
}
