'use server'

import * as api from '@/api'
import { AllergyDataResponse, AllergyPayload } from '../types'

const updateAllergy = async (
  patientId: string,
  allergyId: string,
  patientAllergies: AllergyPayload,
): Promise<api.ActionResult<AllergyDataResponse>> => {
  const response = await api.PUT<AllergyDataResponse>(
    api.UPDATE_ALLERGY(patientId, allergyId),
    patientAllergies,
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

export { updateAllergy }
