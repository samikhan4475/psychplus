'use server'

import * as api from '@/api'
import { CustomChargePayload } from '../types'

const updatePatientCustomChargeAction = async (
  patientId: number,
  transactionId: number,
  payload: CustomChargePayload,
): Promise<api.ActionResult<void>> => {
  const response = await api.POST<CustomChargePayload>(
    api.PATIENT_CUSTOM_CHARGE_ENDPOINT(patientId, transactionId),
    payload,
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

export { updatePatientCustomChargeAction }
