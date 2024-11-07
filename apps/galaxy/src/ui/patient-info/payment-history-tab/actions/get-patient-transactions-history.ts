'use server'

import * as api from '@/api'
import type { PatientTransaction } from '../types'

interface GetPatientTransactionsHistoryParams {
  patientId: number
  transactionId: number
}

const getPatientTransactionsHistoryAction = async ({
  patientId,
  transactionId,
}: GetPatientTransactionsHistoryParams): Promise<
  api.ActionResult<PatientTransaction[]>
> => {
  const response = await api.POST<PatientTransaction[]>(
    api.GET_PATIENT_TRANSACTIONS_HISTORY(patientId, transactionId),
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

export { getPatientTransactionsHistoryAction }
