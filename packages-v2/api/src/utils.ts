import { INTERNAL_ERROR_MESSAGE } from './constants'

const getErrorMessage = (error: unknown): string => {
  let message = INTERNAL_ERROR_MESSAGE

  if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === 'object') {
    if ('message' in error) {
      message = String(error.message)
    } else if ('errors' in error) {
      const errorObject = error as { errors: Record<string, string[]> }
      const initialErrorMessages = Object.values(errorObject.errors)[0]
      if (
        Array.isArray(initialErrorMessages) &&
        initialErrorMessages.length > 0
      ) {
        message = initialErrorMessages[0]
      }
    }
  } else if (typeof error === 'string') {
    message = error
  }

  return message
}

const getResponseData = (text: string) => {
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

const sanitizeBaseUrl = (url: string): string => {
  if (!url) return ''

  // Always keep from `/api` onwards
  const apiIndex = url.indexOf('/api')
  if (apiIndex !== -1) {
    return url.slice(apiIndex)
  }

  return url.replace(/^https?:\/\/[^/]+/, '')
}
export { getErrorMessage, getResponseData, sanitizeBaseUrl }
