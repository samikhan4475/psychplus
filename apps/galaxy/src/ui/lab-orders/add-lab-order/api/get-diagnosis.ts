'use server'

import * as api from '@/api'
import { DiagnosisType } from '../blocks/types'

const getDiagnosis = async (
  appointmentId: string,
  orderId: string,
): Promise<api.ActionResult<DiagnosisType[]>> => {
  const response = await api.POST<DiagnosisType[]>(
    api.GET_PATIENT_DIAGNOSIS(appointmentId, orderId),
    { orderId, resourceStatusList: ['Active'] },
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

export { getDiagnosis }
