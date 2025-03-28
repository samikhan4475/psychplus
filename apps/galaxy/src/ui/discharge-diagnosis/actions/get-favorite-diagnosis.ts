'use server'

import * as api from '@/api'
import { FavouriteDiagnosisData } from '@/types'
import { getAuthCookies } from '@/utils/auth'

const getFavouriteDiagnosis = async (
  codeOrDescription?: string,
): Promise<api.ActionResult<FavouriteDiagnosisData[]>> => {
  const auth = getAuthCookies()
  const payload = {
    staffId: auth?.user.userId,
    CodeOrDescription: codeOrDescription,
  }
  const response = await api.POST<FavouriteDiagnosisData[]>(
    api.SEARCH_FAVOURITE_DIAGNOSIS_ENDPOINT,
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

export { getFavouriteDiagnosis }
