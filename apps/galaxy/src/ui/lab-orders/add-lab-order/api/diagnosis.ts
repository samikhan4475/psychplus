'use server'

import * as api from '@/api'

const getDiagnosisLimit = async (
  payload: any,
  offset: number = 0,
  limit: number = 10,
): Promise<api.ActionResult<any>> => {
  const response = await api.POST<any>(
    `${api.DIAGNOSIS_SEARCH_ICD10CODES_ENDPOINT}?offset=${offset}&limit=${limit}`,
    { ...payload },
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

const addDiagnosis = async (payload: any): Promise<api.ActionResult<any>> => {
  const response = await api.POST<any>(api.ADD_LAB_DIAGNOSIS, payload)
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

export { getDiagnosisLimit, addDiagnosis }
