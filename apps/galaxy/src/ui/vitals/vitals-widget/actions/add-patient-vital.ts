'use server'

import * as api from '@/api'
import type { PatientVital } from '../types'

const addPatientVitalAction = async (
  payload: PatientVital,
): Promise<api.ActionResult<PatientVital>> => {
  const response = await api.POST<PatientVital>(
    `${api.ADD_PATIENT_VITAL_ENDPOINT(String(payload.patientId))}`,
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
    data: response.data,
  }
}

export { addPatientVitalAction }
