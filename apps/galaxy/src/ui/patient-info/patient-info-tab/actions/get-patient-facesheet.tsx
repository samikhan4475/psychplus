'use server'

import * as api from '@/api'
import { Facesheet } from '@/types'

const getPatientFacesheet = async (
  patientId: string,
): Promise<api.ActionResult<Facesheet[]>> => {
  const response = await api.POST<Facesheet[]>(
    api.GET_PATIENT_FACESHEET(patientId),
    {},
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

export { getPatientFacesheet }
