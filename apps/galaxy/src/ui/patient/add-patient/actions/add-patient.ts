'use server'

import * as api from '@/api'
import { PatientBody, PatientResponse } from '../types'

const addPatient = async (
  body: PatientBody,
): Promise<api.ActionResult<PatientResponse>> => {
  const response = await api.POST<PatientResponse>(
    `${api.ADD_PATIENT_ENDPOINT}?`,
    body,
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return { state: 'success', data: response.data }
}

export { addPatient }
