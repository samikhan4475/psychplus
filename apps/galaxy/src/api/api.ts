import { createHeaders, createJsonHeader } from './headers'

const INTERNAL_ERROR_MESSAGE = 'Something went wrong!'

interface ActionSuccessState<T = undefined> {
  state: 'success'
  data: T
}

interface ActionErrorState {
  state: 'error'
  error: string
}

type ActionResult<T> = ActionSuccessState<T> | ActionErrorState

interface NetworkSuccessState<T> {
  state: 'success'
  data: T
  headers: Headers
}

interface NetworkErrorState {
  state: 'error'
  error: string
  headers: Headers
}

type NetworkResult<T> = NetworkSuccessState<T> | NetworkErrorState

interface GetOptions extends RequestInit {
  ignoreHeaders?: boolean
}

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
  body?: FormData | object,
  options: PostOptions = {},
): Promise<NetworkResult<T>> => {
  const { headers, ...rest } = options

  const isBodyFormData = body instanceof FormData
  const reqHeaders = rest.ignoreHeaders
    ? createJsonHeader()
    : createHeaders({
        ...(isBodyFormData ? {} : createJsonHeader()),
        ...headers,
      })

  const response = await fetch(url, {
    method: 'POST',
    headers: reqHeaders,
    body: isBodyFormData ? body : JSON.stringify(body),
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

  const isBodyFormData = body instanceof FormData
  const reqHeaders = rest.ignoreHeaders
    ? createJsonHeader()
    : createHeaders({
        ...(isBodyFormData ? {} : createJsonHeader()),
        ...headers,
      })

  const response = await fetch(url, {
    method: 'PATCH',
    headers: reqHeaders,
    body: isBodyFormData ? body : JSON.stringify(body),
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

  const isBodyFormData = body instanceof FormData
  const reqHeaders = rest.ignoreHeaders
    ? createJsonHeader()
    : createHeaders({
        ...(isBodyFormData ? {} : createJsonHeader()),
        ...headers,
      })

  const response = await fetch(url, {
    method: 'PUT',
    headers: reqHeaders,
    body: isBodyFormData ? body : JSON.stringify(body),
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

const getResponseData = (text: string) => {
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

const getErrorMessage = (error: unknown): string => {
  let message = INTERNAL_ERROR_MESSAGE

  if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === 'object') {
    if ('message' in error) {
      message = String(error.message)
    } else if ('errors' in error) {
      const errorObj = error as { errors: Record<string, string[]> }
      const firstErrorMessages = Object.values(errorObj.errors)[0]
      if (Array.isArray(firstErrorMessages) && firstErrorMessages.length > 0) {
        message = firstErrorMessages[0]
      }
    }
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
