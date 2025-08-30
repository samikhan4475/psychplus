import { useMemo } from 'react'
import { TOTAL_TIME_LIMIT } from './constants'
import { SchemaType } from './schema'

interface UseTograTestStateProps {
  data?: SchemaType
  patientId: string
  startTimer?: boolean
  startedAtFormValue?: string
  submittedDateFormValue?: string
  disabled?: boolean
}

interface UseTograTestStateReturn {
  isFormDisabled: boolean
  submittedDate: string | null
  startedAt: string | null
}

export const useTograTestState = ({
  data,
  patientId,
  startedAtFormValue,
  submittedDateFormValue,
  startTimer,
  disabled,
}: UseTograTestStateProps): UseTograTestStateReturn => {
  return useMemo(() => {
    // Get form values for real-time updates
    const formStartedAt = startedAtFormValue
    const formSubmittedDate = submittedDateFormValue

    // Find data items from the data array
    const submittedDateItem = data?.TograBlueSubmittedDate
    const startedAtItem = data?.TograBlueStartedAt

    // Get values from data array (fallback to form values if not in data)
    const submittedDateValue = submittedDateItem || formSubmittedDate || null
    const startedAtValue = startedAtItem || formStartedAt || null

    if (disabled) {
      return {
        isFormDisabled: true,
        submittedDate: submittedDateValue,
        startedAt: startedAtValue,
      }
    }

    const currentTime = Date.now()

    // Case 1: Check if test is currently running (TograBlueStartedAt exists)
    if (startedAtValue) {
      const startedAtDate = new Date(startedAtValue).getTime()
      const timeElapsed = (currentTime - startedAtDate) / (1000 * 60)

      // If test is still within time limit, form is enabled
      if (timeElapsed < TOTAL_TIME_LIMIT) {
        return {
          isFormDisabled: false,
          submittedDate: submittedDateValue,
          startedAt: startedAtValue,
        }
      }

      // Test time limit exceeded, form is disabled
      return {
        isFormDisabled: true,
        submittedDate: submittedDateValue,
        startedAt: startedAtValue,
      }
    }

    // Case 2: No active test, check if last submission was recent
    if (submittedDateValue) {
      const submittedDate = new Date(submittedDateValue).getTime()
      const timeSinceSubmission = (currentTime - submittedDate) / (1000 * 60)

      // If last submission was within time limit, form is enabled
      if (timeSinceSubmission < TOTAL_TIME_LIMIT) {
        return {
          isFormDisabled: false,
          submittedDate: submittedDateValue,
          startedAt: null,
        }
      }

      // Last submission was too long ago, form is disabled
      return {
        isFormDisabled: true,
        submittedDate: submittedDateValue,
        startedAt: null,
      }
    }

    // Case 3: No test data at all, form is enabled
    // But first check if timer has stopped
    const baseResult = {
      isFormDisabled: false,
      submittedDate: null,
      startedAt: null,
    }

    // If timer has stopped (startTimer is false), disable the form
    if (!startTimer) {
      return {
        ...baseResult,
        isFormDisabled: true,
      }
    }

    return baseResult
  }, [data, patientId, startTimer, startedAtFormValue, submittedDateFormValue])
}
