import { createCommonHeaders } from './utils'

interface ApiOptions {
  token?: string
  userAgent?: string
}

const options: ApiOptions = {}

const api = async <T>(input: RequestInfo, init?: RequestInit): Promise<T> => {
  const response = await fetch(input, {
    cache: 'no-store',
    headers: createCommonHeaders(options),
    ...init,
  })

  if (!response.ok) {
    throw new Error()
  }

  return response.json()
}

const init = (_options: ApiOptions = {}) => {
  options.token = _options.token
  options.userAgent = _options.userAgent
}

export { api, init, type ApiOptions }
