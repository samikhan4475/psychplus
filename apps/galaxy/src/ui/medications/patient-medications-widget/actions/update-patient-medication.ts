'use server'

import * as api from '@/api'
import type { Prescription } from '../types'

interface GetPatientMedicationsParams {
  patientId: number
  id: string
  payload: Partial<Prescription>
}

const updatePatientMedicationsAction = async ({
  patientId,
  id,
  payload,
}: GetPatientMedicationsParams): Promise<api.ActionResult<Prescription>> => {
  const response = await api.PUT<Prescription>(
    api.UPDATE_PATIENT_MEDICATION(patientId, id),
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

export { updatePatientMedicationsAction }
