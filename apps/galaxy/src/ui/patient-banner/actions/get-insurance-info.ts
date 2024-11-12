'use server'

import * as api from '@/api'
import { Patientinsurance } from '../types'

const getInsuranceInfoAction = async (
  patientId: string,
): Promise<api.ActionResult<Patientinsurance[]>> => {
  const payload = {
    isIncludeInsurance: true,
    isIncludeInsuranceVerification: true,
    patientIds: [patientId],
  }
  const response = await api.POST<Patientinsurance[]>(
    api.SEARCH_PATIENTS_ENDPOINT,
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

export { getInsuranceInfoAction }
