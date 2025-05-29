'use server'

import * as api from '@/api'
import { PatientMedication } from '@/types'
import { Patient } from '@/ui/visit/types'
import { Prescription } from '../types'

interface UserCredsPayload {
  username: string
  password: string
}

const validateUserCreds = async (
  payload: UserCredsPayload,
): Promise<api.ActionResult<PatientMedication[]>> => {
  const response = await api.POST<PatientMedication[]>(
    api.VALIDATE_USER_CREDS,
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

export { validateUserCreds }
