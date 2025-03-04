'use server'

import * as api from '@/api'
import { DiagnosisType } from '../blocks/types'

const addDiagnosis = async (
  payload: DiagnosisType[],
): Promise<api.ActionResult<DiagnosisType[]>> => {
  const response = await api.POST<DiagnosisType[]>(
    api.ADD_LAB_DIAGNOSIS,
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

export { addDiagnosis }
