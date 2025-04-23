'use server'

import * as api from '@/api'
import type { Prescription } from '../types'

const getPatientPrescriptionAction = async (
  patientId: number,
  id: string,
): Promise<api.ActionResult<Prescription>> => {
  const response = await api.GET<Prescription>(
    api.GET_PATIENT_MEDICATION_ENDPOINT(patientId, id),
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response?.data,
  }
}

export { getPatientPrescriptionAction }
