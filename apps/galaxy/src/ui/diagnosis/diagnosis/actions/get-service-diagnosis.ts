'use server'

import * as api from '@/api'
import { DiagnosisIcd10Code } from '@/types'

const getIcd10Diagnosis = async (payload: {
  CodeOrDescription?: string
  DiagnosisCodes?: string[]
}): Promise<api.ActionResult<DiagnosisIcd10Code[]>> => {
  const response = await api.POST<DiagnosisIcd10Code[]>(
    api.DIAGNOSIS_SEARCH_ICD10CODES_ENDPOINT,
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

export { getIcd10Diagnosis }
