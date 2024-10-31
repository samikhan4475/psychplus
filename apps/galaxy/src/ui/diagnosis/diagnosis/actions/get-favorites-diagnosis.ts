'use server'

import * as api from '@/api'
import { Metadata } from '@/types'
import { getAuthCookies } from '@/utils/auth'

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

const getFavouriteDiagnosis = async (
  value?: string,
): Promise<api.ActionResult<FavouriteDiagnosisDataResponse[]>> => {
  const auth = getAuthCookies()
  const response = await api.POST<FavouriteDiagnosisDataResponse[]>(
    api.SEARCH_FAVOURITE_DIAGNOSIS_ENDPOINT,
    {
      staffId: auth?.user.userId,
      CodeOrDescription: value,
    },
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

export { getFavouriteDiagnosis }
