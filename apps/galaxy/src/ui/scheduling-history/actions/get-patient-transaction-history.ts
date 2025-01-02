'use server'

import * as api from '@/api'
import { PatientTransactionHistory } from '../types'

const getPatientTransactionHistoryAction = async (
  patientId: string,
  appointmentId: number,
): Promise<api.ActionResult<PatientTransactionHistory[]>> => {
  const response = await api.POST<PatientTransactionHistory[]>(
    api.GET_PATIENT_TRANSACTION_HISTORY(patientId, appointmentId),
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data,
  }
}

export { getPatientTransactionHistoryAction }
