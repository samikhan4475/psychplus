import { getError } from './error'

const handleRequest = async <T>(promise: Promise<Response>): Promise<T> => {
  try {
    const response = await promise
    const text = await response.text()

    if (!response.ok) {
      throw text
    }
    return text ? JSON.parse(text) : undefined
  } catch (error) {
    throw getError(error)
  }
}

export { handleRequest }
