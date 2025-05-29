'use server'

import * as api from '@/api'
import { DiagnosisIcd10Code } from '@/types'

const getDiagnosisLimit = async (
  payload: {
    codeOrDescription?: string
    recordStatuses?: string[]
    diagnosisCodes?: string[]
  },
  offset= 0,
  limit = 0,
): Promise<api.ActionResult<DiagnosisIcd10Code[]>> => {
  const response = await api.POST<DiagnosisIcd10Code[]>(
    `${api.DIAGNOSIS_SEARCH_ICD10CODES_ENDPOINT}?offset=${offset}&limit=${limit}`,
    { ...payload },
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const diagnosisCodes = payload?.diagnosisCodes || []
  let data = response.data

  if (diagnosisCodes.length > 0) {
    data = response.data.toSorted((a, b) => {
      return diagnosisCodes.indexOf(a.code) - diagnosisCodes.indexOf(b.code)
    })
  }

  return {
    state: 'success',
    data,
  }
}

export { getDiagnosisLimit }
