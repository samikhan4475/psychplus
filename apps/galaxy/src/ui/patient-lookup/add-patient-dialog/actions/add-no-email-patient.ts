'use server'

import * as api from '@/api'
import { AddPatientSchemaType } from '../add-patient-form'

const addNoEmailPatienAction = async (
  payload: AddPatientSchemaType,
): Promise<api.ActionResult<void>> => {
  const result = await api.POST<void>(
    api.ADD_NO_EMAIL_PATIENT_ENDPOINT,
    payload,
  )

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

export { addNoEmailPatienAction }
