'use server'

import * as api from '@/api'
import { AddPatientSchemaType } from '../add-patient-form'

const addPatientAction = async (
  payload: AddPatientSchemaType,
): Promise<api.ActionResult<void>> => {
  const result = await api.POST<void>(api.ADD_PATIENT_ENDPOINT, payload)

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }
  return {
    state: 'success',
    data: undefined,
  }
}

export { addPatientAction }
