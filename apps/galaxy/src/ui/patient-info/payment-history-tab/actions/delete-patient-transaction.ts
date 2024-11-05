'use server'

import * as api from '@/api'

const deletePatientTransactionAction = async (
  patientId: number,
  transactionId: number,
): Promise<api.ActionResult<void>> => {
  const response = await api.DELETE<void>(
    api.PATIENT_CUSTOM_CHARGE_ENDPOINT(patientId, transactionId),
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: undefined,
  }
}

export { deletePatientTransactionAction }
