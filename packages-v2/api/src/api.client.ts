import {
  ActionErrorState,
  ActionResult,
  ActionSuccessState,
  GetOptions,
  NetworkResult,
} from './types'
import { getErrorMessage, getResponseData, sanitizeBaseUrl } from './utils'

const PATCH = async <T>(
  url: string,
  body: FormData | object,
  options: PostOptions = {},
): Promise<NetworkResult<T>> => {
  const { ...rest } = options

  const isFormData = body instanceof FormData

  const response = await fetch(url, {
    method: 'PATCH',
    body: isFormData ? body : JSON.stringify(body),
    ...rest,
    headers: { 'Content-Type': 'application/json' },
  })

  const data = getResponseData(await response.text())

  if (!response.ok) {
    return {
      state: 'error',
      error: getErrorMessage(data),
      headers: response.headers,
      status: response.status,
    }
  }

  return {
    headers: response.headers,
    data,

    state: 'success',
  }
}

interface PostOptions extends RequestInit {
  ignoreHeaders?: boolean
   signal?: AbortSignal
}

const PUT = async <T>(
  url: string,
  body: FormData | object,
  options: PostOptions = {},
): Promise<NetworkResult<T>> => {
  const { signal,...rest } = options
  const isFormData = body instanceof FormData
  const response = await fetch('/ehr' + url, {
    method: 'PUT',
    body: isFormData ? body : JSON.stringify(body),
    signal,
    ...rest,
    headers: { 'Content-Type': 'application/json' },
  })

  const data = getResponseData(await response.text())

  if (!response.ok) {
    return {
      error: getErrorMessage(data),
      state: 'error',

      headers: response.headers,
      status: response.status,
    }
  }

  return {
    state: 'success',
    data,
    headers: response.headers,
  }
}

const POST = async <T>(
  url: string,
  body?: FormData | object,
  options: PostOptions = {},
): Promise<NetworkResult<T>> => {
  const { signal,...rest } = options

  const isFormData = body instanceof FormData

  const response = await fetch(sanitizeBaseUrl(url), {
    method: 'POST',
    body: isFormData ? body : JSON.stringify(body),
    signal,
    ...rest,
    headers: { 'Content-Type': 'application/json' },
  })

  const data = getResponseData(await response.text())

  if (!response.ok) {
    return {
      error: getErrorMessage(data),
      state: 'error',

      headers: response.headers,
      status: response.status,
    }
  }

  return {
    data,
    state: 'success',

    headers: response.headers,
  }
}

type DeleteOptions = RequestInit

const DELETE = async <T>(
  url: string,
  body?: object,
  options: DeleteOptions = {},
): Promise<NetworkResult<T>> => {
  const { ...rest } = options

  const deleteResponse = await fetch(url, {
    method: 'DELETE',
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  })

  const data = getResponseData(await deleteResponse.text())

  if (!deleteResponse.ok) {
    return {
      state: 'error',

      headers: deleteResponse.headers,
      error: getErrorMessage(data),
    }
  }

  return {
    state: 'success',
    data,
    headers: deleteResponse.headers,
  }
}

const GET = async <T>(
  url: string,
  options: GetOptions = {},
): Promise<NetworkResult<T>> => {
  const { ...rest } = options
  // @ts-ignore Next extends the native fetch options
  const next = rest.next as NextFetchRequestConfig | undefined
  const getResponse = await fetch(url, {
    cache: next?.revalidate ? undefined : 'no-store',
    ...rest,
  })
  const data = getResponseData(await getResponse.text())

  if (!getResponse.ok) {
    return {
      state: 'error',
      error: getErrorMessage(data),
      headers: getResponse.headers,
    }
  }

  return {
    data,
    state: 'success',
    headers: getResponse.headers,
  }
}

export {
  PUT,
  DELETE,
  GET,
  POST,
  PATCH,
  type NetworkResult,
  type ActionResult,
  type ActionErrorState,
  type ActionSuccessState,
}
