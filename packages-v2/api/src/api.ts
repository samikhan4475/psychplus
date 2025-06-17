import { createHeaders, createJsonHeader } from '@psychplus-v2/headers'
import { INTERNAL_ERROR_MESSAGE } from './constants'
import {
  ActionErrorState,
  ActionResult,
  ActionSuccessState,
  GetOptions,
  NetworkResult,
} from './types'
import { getResponseData } from './utils'

const GET = async <T>(
  url: string,
  options: GetOptions = {},
): Promise<NetworkResult<T>> => {
  const { headers, ...rest } = options

  // @ts-ignore Next extends the native fetch options
  const next = rest.next as NextFetchRequestConfig | undefined

  const response = await fetch(url, {
    headers: !rest.ignoreHeaders ? createHeaders({ ...headers }) : undefined,
    cache: next?.revalidate ? undefined : 'no-store',
    ...rest,
  })

  const data = getResponseData(await response.text())

  if (!response.ok) {
    return {
      state: 'error',
      error: getErrorMessage(data),
      headers: response.headers,
    }
  }

  return {
    state: 'success',
    data,
    headers: response.headers,
  }
}

interface PostOptions extends RequestInit {
  ignoreHeaders?: boolean
}

const POST = async <T>(
  url: string,
  body: object,
  options: PostOptions = {},
): Promise<NetworkResult<T>> => {
  const { headers, ...rest } = options

  const reqHeaders = rest.ignoreHeaders
    ? createJsonHeader()
    : createHeaders({ ...createJsonHeader(), ...headers })

  const response = await fetch(url, {
    method: 'POST',
    headers: reqHeaders,
    body: JSON.stringify(body),
    ...rest,
  })

  const data = getResponseData(await response.text())

  if (!response.ok) {
    return {
      state: 'error',
      error: getErrorMessage(data),
      headers: response.headers,
    }
  }

  return {
    state: 'success',
    data,
    headers: response.headers,
  }
}

const PATCH = async <T>(
  url: string,
  body: FormData | object,
  options: PostOptions = {},
): Promise<NetworkResult<T>> => {
  const { headers, ...rest } = options

  const reqHeaders = rest.ignoreHeaders
    ? createJsonHeader()
    : createHeaders({ ...createJsonHeader(), ...headers })

  const response = await fetch(url, {
    method: 'PATCH',
    headers: reqHeaders,
    body: body instanceof FormData ? body : JSON.stringify(body),
    ...rest,
  })

  const data = getResponseData(await response.text())

  if (!response.ok) {
    return {
      state: 'error',
      error: getErrorMessage(data),
      headers: response.headers,
    }
  }

  return {
    state: 'success',
    data,
    headers: response.headers,
  }
}

const PUT = async <T>(
  url: string,
  body: FormData | object,
  options: PostOptions = {},
): Promise<NetworkResult<T>> => {
  const { headers, ...rest } = options

  const reqHeaders = rest.ignoreHeaders
    ? createJsonHeader()
    : createHeaders({ ...createJsonHeader(), ...headers })

  const response = await fetch(url, {
    method: 'PUT',
    headers: reqHeaders,
    body: body instanceof FormData ? body : JSON.stringify(body),
    ...rest,
  })

  const data = getResponseData(await response.text())

  if (!response.ok) {
    return {
      state: 'error',
      error: getErrorMessage(data),
      headers: response.headers,
    }
  }

  return {
    state: 'success',
    data,
    headers: response.headers,
  }
}

type DeleteOptions = RequestInit

const DELETE = async <T>(
  url: string,
  body?: object,
  options: DeleteOptions = {},
): Promise<NetworkResult<T>> => {
  const { headers, ...rest } = options

  const reqHeaders = createHeaders({ ...createJsonHeader(), ...headers })

  const response = await fetch(url, {
    method: 'DELETE',
    headers: reqHeaders,
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  })

  const data = getResponseData(await response.text())

  if (!response.ok) {
    return {
      state: 'error',
      error: getErrorMessage(data),
      headers: response.headers,
    }
  }

  return {
    state: 'success',
    data,
    headers: response.headers,
  }
}

const getErrorMessage = (error: unknown): string => {
  let message = INTERNAL_ERROR_MESSAGE

  if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message)
  } else if (typeof error === 'string') {
    message = error
  }

  return message
}

export {
  GET,
  POST,
  PATCH,
  PUT,
  DELETE,
  type ActionResult,
  type ActionErrorState,
  type ActionSuccessState,
  type NetworkResult,
}
