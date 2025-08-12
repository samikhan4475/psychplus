'use server'

import * as api from '@/api'
import { NewPatient } from '@/types'
import { PatientBody } from '@/ui/patient/add-patient/types'

const createUser = async (
  body: PatientBody,
): Promise<api.ActionResult<NewPatient>> => {
  const response = await api.POST<NewPatient>(api.ADD_PATIENT_ENDPOINT, body)

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return { state: 'success', data: response.data }
}

export { createUser }
