import { useState } from 'react'
import { AlertState, TransformedAppointment } from '../types'
import { sanitizeFormData, updateVisit } from '../utils'
import { useRefetchAppointments } from './use-refetch-appointments'

interface VisitUpdateParams {
  isConfirmed: boolean
  body: TransformedAppointment
  resetValue: () => void
  status?: number
  successMessage?: string
}

const useConfirmVisitUpdate = () => {
  const [alertState, setAlertState] = useState<AlertState>({
    message: '',
    open: false,
  })
  const refetch = useRefetchAppointments()

  const onUpdateVisitError = (message: string, status?: number) => {
    setAlertState({ message, open: true, status })
  }

  const onUpdateVisitConfirm = ({
    isConfirmed,
    body,
    resetValue,
    successMessage,
  }: VisitUpdateParams) => {
    if (!isConfirmed) {
      resetValue()
      return setAlertState((prev) => ({ ...prev, open: false }))
    }
    const sanitizedBody = sanitizeFormData(body)
    updateVisit({
      body: sanitizedBody,
      onSuccess: refetch,
      onError: onUpdateVisitError,
      successMessage,
    })
    setAlertState((prev) => ({ ...prev, open: false }))
  }

  return {
    alertState,
    onUpdateVisitConfirm,
    onUpdateVisitError,
  }
}

export { useConfirmVisitUpdate }
