'use server'

import * as api from '@/api'
import { Prescription } from '../types'

const addPatientPrescriptions = async ({
  ...payload
}: Partial<Prescription>): Promise<api.ActionResult<Prescription>> => {
  const response = await api.POST<Prescription>(
    api.SAVE_PATIENT_PRESCRIPTIONS(Number(payload?.patientId)),
    { ...payload },
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

export { addPatientPrescriptions }
