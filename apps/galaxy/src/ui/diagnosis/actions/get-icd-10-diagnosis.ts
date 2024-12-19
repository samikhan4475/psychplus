'use server'

import * as api from '@/api'
import { DiagnosisIcd10Code } from '@/types'

const getIcd10DiagnosisAction = async (payload: {
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

  const DiagnosisCodes = payload?.DiagnosisCodes || []
  let data = response.data

  if (DiagnosisCodes.length > 0) {
    data = response.data.toSorted((a, b) => {
      return DiagnosisCodes.indexOf(a.code) - DiagnosisCodes.indexOf(b.code)
    })
  }

  return {
    state: 'success',
    data: data,
  }
}

export { getIcd10DiagnosisAction }
