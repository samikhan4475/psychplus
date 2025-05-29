'use server'

import * as api from '@/api'
import { Prescription } from '../types'

const prescribingSignInAction = async (
  id: string[],
): Promise<api.ActionResult<Prescription[]>> => {
  const response = await api.POST<Prescription[]>(
    api.PATIENT_MEDICATION_SIGN_IN,
    id,
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

export { prescribingSignInAction }
