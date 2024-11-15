'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import type { AllergiesSearchParams, AllergyDataResponse } from '../types'

interface GetPatientAllergiesParams {
  payload?: AllergiesSearchParams
  sort?: Sort
}

const getPatientAllergiesAction = async ({
  payload,
}: GetPatientAllergiesParams): Promise<
  api.ActionResult<AllergyDataResponse[]>
> => {
  const response = await api.POST<AllergyDataResponse[]>(
    api.GET_ALLERGIES_ENDPOINT,
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

export { getPatientAllergiesAction }
