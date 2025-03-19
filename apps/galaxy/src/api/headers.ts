import { cookies, headers as nextHeaders } from 'next/headers'
import {
  ACCESS_TOKEN_COOKIE,
  APP_CODE,
  APP_ENV,
  APP_VERSION,
  PRACTICE_ID_COOKIE,
  SESSION_ID_COOKIE,
} from '@/constants'

const HEADER_PSYCHPLUS_APPLICATION = 'PsychPlus-Application'
const HEADER_PSYCHPLUS_APP_VERSION = 'PsychPlus-AppVersion'
const HEADER_PSYCHPLUS_RUN_ENVIRONMENT = 'PsychPlus-RunEnvironment'
const HEADER_PSYCHPLUS_DEVICE = 'PsychPlus-Device'
const HEADER_AUTHORIZATION = 'Authorization'
const HEADER_CONTENT_TYPE = 'Content-Type'
const HEADER_USER_AGENT = 'user-agent'
const BEARER_AUTHENTICATION = 'Bearer'
const HEADER_PSYCHPLUS_SESSION_PRACTICE_ID = 'PsychPlus-SessionPracticeId'
const HEADER_PSYCHPLUS_SESSION_ID = 'PsychPlus-SessionId'
const CONTENT_TYPE_JSON = 'application/json; charset=utf-8'

const createHeaders = (init?: HeadersInit) => {
  const headers = new Headers(init)

  const token = cookies().get(ACCESS_TOKEN_COOKIE)?.value

  const sessionId = cookies().get(SESSION_ID_COOKIE)?.value
  const practiceId = cookies().get(PRACTICE_ID_COOKIE)?.value

  if (token && !headers.get(HEADER_AUTHORIZATION)) {
    headers.set(HEADER_AUTHORIZATION, `${BEARER_AUTHENTICATION} ${token}`)
  }

  if (sessionId && !headers.get(HEADER_PSYCHPLUS_SESSION_ID)) {
    headers.set(HEADER_PSYCHPLUS_SESSION_ID, `${sessionId}`)
  }

  if (practiceId && !headers.get(HEADER_PSYCHPLUS_SESSION_PRACTICE_ID)) {
    headers.set(HEADER_PSYCHPLUS_SESSION_PRACTICE_ID, `${practiceId}`)
  }

  const userAgent = nextHeaders().get(HEADER_USER_AGENT) ?? ''

  // Set required P+ headers.
  headers.set(HEADER_PSYCHPLUS_APPLICATION, APP_CODE)
  headers.set(HEADER_PSYCHPLUS_APP_VERSION, APP_VERSION)
  headers.set(HEADER_PSYCHPLUS_RUN_ENVIRONMENT, APP_ENV)
  headers.set(HEADER_PSYCHPLUS_DEVICE, userAgent)

  return headers
}

const createAuthzHeader = (token: string) => ({
  [HEADER_AUTHORIZATION]: `${BEARER_AUTHENTICATION} ${token}`,
})

const createJsonHeader = () => ({
  [HEADER_CONTENT_TYPE]: CONTENT_TYPE_JSON,
})

export { createHeaders, createAuthzHeader, createJsonHeader }
