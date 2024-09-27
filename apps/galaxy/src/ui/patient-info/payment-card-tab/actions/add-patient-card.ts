'use server'

import * as api from '@/api'
import { CreditCard } from '@/types'
import { AddCardRequestBody } from '../types'

const addPatientCardAction = async (
  patientId: string,
  payload: AddCardRequestBody,
): Promise<api.ActionResult<CreditCard>> => {
  const response = await api.POST<CreditCard>(
    api.ADD_PATIENT_CREDIT_CARD(patientId),
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

export { addPatientCardAction }
