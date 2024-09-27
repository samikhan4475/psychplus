'use server'

import * as api from '@/api'
import { CreditCard } from '@/types'

const getPatientCreditCards = async (
  patientId: string,
): Promise<api.ActionResult<CreditCard[]>> => {
  const response = await api.GET<CreditCard[]>(
    api.GET_PATIENT_CREDIT_CARDS(patientId),
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

export { getPatientCreditCards }
