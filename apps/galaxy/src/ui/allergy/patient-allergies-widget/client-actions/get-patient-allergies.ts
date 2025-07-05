'use client'

import * as api from '@/api/api.client'
import { GET_ALLERGIES_ENDPOINT } from '@/api/endpoints'
import { Sort } from '@/types'
import { RecordStatus } from '../types'
import type { AllergiesSearchParams, AllergyDataResponse } from '../types'
interface GetPatientAllergiesParams {
  payload?: AllergiesSearchParams
  sort?: Sort
}

const getPatientAllergiesAction = async ({
  payload,
  sort,
}: GetPatientAllergiesParams): Promise<api.ActionResult<AllergyDataResponse[]>> => {
  const mergedPayload: AllergiesSearchParams = {
    ...payload,
    recordStatuses: [RecordStatus.Active, RecordStatus.Archived],
  }

  let endpoint = GET_ALLERGIES_ENDPOINT
  if (sort?.column && sort?.direction) {
      const orderByValue = `${sort.column} ${sort.direction}`
      const params = new URLSearchParams({ orderBy: orderByValue })
      endpoint += `?${params.toString()}`
  }

  const response = await api.POST<AllergyDataResponse[]>(endpoint, mergedPayload)

  if (response.state === 'error') {
    return {
      state: 'error',
      status: response.status,
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data,
  }
}

export { getPatientAllergiesAction }
