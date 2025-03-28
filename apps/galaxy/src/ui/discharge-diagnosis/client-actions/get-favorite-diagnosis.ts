'use client'

import * as api from '@/api/api.client'
import { SEARCH_FAVOURITE_DIAGNOSIS_ENDPOINT } from '@/api/endpoints'
import { FavouriteDiagnosisData, Metadata } from '@/types'

interface FavouriteDiagnosisDataResponse {
  id: number
  metadata: Metadata
  icd10Code: string
  description: string
  isFavourite: boolean
  priorityFavourite: number
  patientId: number
  priorityCheck: number
  recordStatus: string
}

const getFavouriteDiagnosisAction = async (
  staffId?: number,
): Promise<api.ActionResult<FavouriteDiagnosisData[]>> => {
  const response = await api.POST<FavouriteDiagnosisDataResponse[]>(
    SEARCH_FAVOURITE_DIAGNOSIS_ENDPOINT,
    {
      staffId,
    },
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const optionsData = response.data.map(
    (item: {
      icd10Code: string
      description: string
      id: number
      isFavourite: boolean
    }) => ({
      description: `${item.icd10Code} ${item.description}`,
      id: item.id,
      isFavourite: item.isFavourite,
      icd10Code: item.icd10Code,
    }),
  )

  return {
    state: 'success',
    data: optionsData,
  }
}

export { getFavouriteDiagnosisAction }
