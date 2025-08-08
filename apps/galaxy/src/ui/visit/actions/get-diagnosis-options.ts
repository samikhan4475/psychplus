'use server'

import * as api from '@/api'
import { DiagnosisIcd10Code } from '@/types'
import { SearchItem } from '../add-visit/components/search-popover-input'

const getDiagnosisOptions = async (
  value: string,
): Promise<api.ActionResult<SearchItem[]>> => {
  const response = await api.POST<DiagnosisIcd10Code[]>(
    api.DIAGNOSIS_SEARCH_ICD10CODES_ENDPOINT,
    { CodeOrDescription: value },
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const mappedResult: SearchItem[] = response.data?.map((code) => ({
    value: code.code,
    label: code.description,
    code: code.code,
    description: code.description,
  })) ?? []
  return {
    state: 'success',
    data: mappedResult,
  }
}

export { getDiagnosisOptions }
