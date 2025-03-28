'use server'

import * as api from '@/api'
import { Metadata } from '@/types'

interface FavoriteDiagnosisDataResponse {
  description: string
  code: string
  id: string
  isFavorite: boolean
  isActive: boolean
  metadata: Metadata
}

const addfavoriteDiagnosis = async (
  diagnosisCode: string,
): Promise<api.ActionResult<FavoriteDiagnosisDataResponse[]>> => {
  const response = await api.POST<FavoriteDiagnosisDataResponse[]>(
    api.FAVOURITE_DIAGNOSIS_ENDPOINT(diagnosisCode),
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

export { addfavoriteDiagnosis }
