import { getError } from './error'

const STATUS_CODE_UNAUTHORIZED = 401

const handleRequest = async <T>(promise: Promise<Response>): Promise<T> => {
  try {
    const response = await promise
    const text = await response.text()

    if (response.status === STATUS_CODE_UNAUTHORIZED || text === '') {
      return text ? JSON.parse(text) : undefined
    }
    if (!response.ok) {
      throw text
    }
    return text ? JSON.parse(text) : undefined
  } catch (error) {
    throw getError(error)
  }
}

export { handleRequest }
