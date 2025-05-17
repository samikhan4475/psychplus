'use server'

import * as api from '@/api'
import { AllergyDataResponse } from '../types'

const deleteAllergy = async (
  patientId: number,
  allergyId: string,
): Promise<api.ActionResult<AllergyDataResponse>> => {
  const response = await api.DELETE<AllergyDataResponse>(
    api.DELETE_ALLERGY(patientId, allergyId),
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

export { deleteAllergy }
