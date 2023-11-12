import { cookies } from 'next/headers'
import { AUTH_TOKEN_COOKIE_NAME } from '../constants'
import { type SearchParams } from './types'

const createUrlParams = (values?: SearchParams) => {
  const params = new URLSearchParams()

  const token = cookies().get(AUTH_TOKEN_COOKIE_NAME)?.value
  if (token) {
    params.append('token', token)
  }

  if (values) {
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        params.append(key, value)
      }
    })
  }

  return params
}

export { createUrlParams }
