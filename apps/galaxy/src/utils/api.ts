const INTERNAL_ERROR_MESSAGE = 'Something went wrong!'

const getErrorMessage = (error: unknown): string => {
  let message = INTERNAL_ERROR_MESSAGE

  if (
    typeof error === 'string' &&
    error?.trimStart()?.startsWith('<!DOCTYPE html')
  ) {
    // Specific check for Next.js 404 HTML error page
    if (
      error.includes('404') ||
      error.includes('This page could not be found')
    ) {
      return 'Unexpected HTML response – possibly a routing issue.'
    }
  }

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

const sanitizeUrl = (url: string): string => {
  // If it's a full URL like "https://example.com/api/foo", extract only the path
  const cleaned = url.replace(/^https?:\/\/[^/]+/, '')
  return cleaned
}

export { getErrorMessage, sanitizeUrl }
