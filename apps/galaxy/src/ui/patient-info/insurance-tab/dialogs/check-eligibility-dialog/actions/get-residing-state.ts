'use server'

import * as api from '@/api'
import { ResidingStateResponse } from '../types'

const getResidingStateAction = async (
  patientId: string,
): Promise<api.ActionResult<ResidingStateResponse>> => {
  const url = new URL(api.GET_PATIENT_RESIDING_STATE_ENDPOINT(patientId))
  const response = await api.GET<ResidingStateResponse>(String(url))

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

export { getResidingStateAction }
