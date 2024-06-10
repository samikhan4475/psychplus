import {
  BEARER_AUTHENTICATION,
  CONTENT_TYPE_APPLICATION_JSON,
  HEADER_AUTHORIZATION,
  HEADER_CONTENT_TYPE,
  HEADER_PSYCHPLUS_DEVICE,
  QUERY_TOKEN,
} from '../constants'
import { getUrl } from './url'

const createHeaders = () => {
  const headers = new Headers()

  // Set Content-Type header.
  headers.set(HEADER_CONTENT_TYPE, CONTENT_TYPE_APPLICATION_JSON)

  const token = getUrl().searchParams.get(QUERY_TOKEN)
  if (token) {
    headers.set(HEADER_AUTHORIZATION, `${BEARER_AUTHENTICATION} ${token}`)
  }

  // Set required PsychPlus headers.
  headers.set(HEADER_PSYCHPLUS_DEVICE, `${navigator.userAgent ?? ''}`)

  return headers
}

const createFileHeaders = () => {
  const headers = new Headers()

  // Set Content-Type header.

  const token = getUrl().searchParams.get(QUERY_TOKEN)
  if (token) {
    headers.set(HEADER_AUTHORIZATION, `${BEARER_AUTHENTICATION} ${token}`)
  }

  // Set required PsychPlus headers.
  headers.set(HEADER_PSYCHPLUS_DEVICE, `${navigator.userAgent ?? ''}`)

  return headers
}

export { createHeaders, createFileHeaders }
