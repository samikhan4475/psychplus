'use server'

import * as api from '@/api'
import { AllergyDataResponse, CreateAllergyPayload } from '../types'

const createAllergy = async (
  patientId: string,
  patientAllergies: CreateAllergyPayload[],
): Promise<api.ActionResult<AllergyDataResponse[]>> => {
  const response = await api.POST<AllergyDataResponse[]>(
    api.CREATE_ALLERGY(patientId),
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

export { createAllergy }
