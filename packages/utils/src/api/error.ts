const GENERIC_ERROR_MESSAGE = 'Something went wrong.'

interface APIError {
  message: string
  status?: number
  raw?: unknown
}

const getError = (error: unknown): APIError => {
  const text = error instanceof Error ? error.message : String(error)

  try {
    const response = JSON.parse(text)

    return {
      message: response.message ?? GENERIC_ERROR_MESSAGE,
      status: response.status,
    }
  } catch {
    return {
      message: GENERIC_ERROR_MESSAGE,
      raw: text,
    }
  }
}

export { getError, type APIError }
