'use server'

import * as api from '@/api'

const unmarkFavoriteDiagnosis = async (
  icd10CodeId: string,
): Promise<api.ActionResult<void>> => {
  const response = await api.DELETE(
    api.FAVOURITE_DIAGNOSIS_ENDPOINT(icd10CodeId),
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: undefined,
  }
}

export { unmarkFavoriteDiagnosis }
