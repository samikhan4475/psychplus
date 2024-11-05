'use server'

import * as api from '@/api'
import { CustomChargePayload } from '../types'

const createPatientCustomChargeAction = async (
  patientId: string,
  payload: CustomChargePayload,
): Promise<api.ActionResult<void>> => {
  const response = await api.POST<CustomChargePayload>(
    api.CREATE_PATIENT_CUSTOM_CHARGE_ENDPOINT(patientId),
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

export { createPatientCustomChargeAction }
