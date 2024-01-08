import { headers as nextHeaders } from 'next/headers'
import {
  APP_CODE,
  APP_ENV,
  APP_VERSION,
  BEARER_AUTHENTICATION,
  CONTENT_TYPE_APPLICATION_JSON,
  HEADER_AUTHORIZATION,
  HEADER_CONTENT_TYPE,
  HEADER_PSYCHPLUS_APP_VERSION,
  HEADER_PSYCHPLUS_APPLICATION,
  HEADER_PSYCHPLUS_DEVICE,
  HEADER_PSYCHPLUS_RUN_ENVIRONMENT,
  HEADER_USER_AGENT,
  QUERY_TOKEN,
} from '../constants'
import { getAuthToken } from '../cookies'
import { getUrl } from './url'

const createHeaders = () => {
  const headers = new Headers()

  // Set Content-Type header.
  headers.set(HEADER_CONTENT_TYPE, CONTENT_TYPE_APPLICATION_JSON)

  const url = getUrl()
  const token = getAuthToken() ?? url.searchParams.get(QUERY_TOKEN)
  if (token) {
    headers.set(HEADER_AUTHORIZATION, `${BEARER_AUTHENTICATION} ${token}`)
  }

  const userAgent = nextHeaders().get(HEADER_USER_AGENT) ?? ''

  // Set required PsychPlus headers.
  headers.set(HEADER_PSYCHPLUS_APPLICATION, APP_CODE)
  headers.set(HEADER_PSYCHPLUS_APP_VERSION, APP_VERSION)
  headers.set(HEADER_PSYCHPLUS_RUN_ENVIRONMENT, APP_ENV)
  headers.set(HEADER_PSYCHPLUS_DEVICE, userAgent)

  return headers
}

export { createHeaders }
