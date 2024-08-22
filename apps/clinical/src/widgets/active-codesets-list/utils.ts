import { ActiveCodestesRequestParams } from './types'

interface ErrorWithStatus {
  status?: number
}

interface ErrorWithMessage {
  message?: string
}

interface ToastData {
  type: 'success' | 'error'
  title: string
}

interface HandleErrorResult {
  errorMessage: string
  status?: number
}

function handleError(
  err: unknown,
  fallbackMessage: string,
  toast: (data: ToastData) => void,
): HandleErrorResult {
  let errorMessage: string | null = null
  let status: number | undefined

  // Check if the error has a status property
  if (typeof err === 'object' && err !== null) {
    const errorWithStatus = err as ErrorWithStatus
    status = errorWithStatus.status
    if (status === 409) {
      errorMessage = 'Duplicate codes found!'
    }
  }

  // If the error is an instance of Error, use its message
  if (err instanceof Error) {
    errorMessage = errorMessage ?? err.message
  } else if (typeof err === 'object' && err !== null) {
    // If the error object has a message property
    const errorWithMessage = err as ErrorWithMessage
    if (errorWithMessage.message) {
      errorMessage = errorMessage ?? errorWithMessage.message
    }
  }

  // Fallback message if no specific error message is determined
  errorMessage = errorMessage ?? fallbackMessage

  // Display the error message using your toast or notification system
  toast({ type: 'error', title: errorMessage })

  return { errorMessage, status } // Return both errorMessage and status
}

const activeCodestesRequestParams: ActiveCodestesRequestParams = {
  isIncludeCodesets: true,
  isIncludeCodes: true,
  isIncludeCodeAttributes: false,
  recordStatuses: ['Active'],
}

function createActiveCodeRequestParams(
  customParams?: Partial<ActiveCodestesRequestParams>,
) {
  return {
    ...customParams,
    ...activeCodestesRequestParams,
  }
}

export { handleError, createActiveCodeRequestParams }
