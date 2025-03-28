'use server'

import * as api from '@/api'

const deleteFavoriteDiagnosis = async (
  diagnosisCode: string,
): Promise<api.ActionResult<void>> => {
  const response = await api.DELETE(
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
    data: undefined,
  }
}

export { deleteFavoriteDiagnosis }
