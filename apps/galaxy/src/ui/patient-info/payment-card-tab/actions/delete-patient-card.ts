'use server'

import * as api from '@/api'
import { CreditCard } from '@/types'

interface DeletePatientCardParams {
  patientId: number
  creditCardId: number
}

const deletePatientCardAction = async ({
  patientId,
  creditCardId,
}: DeletePatientCardParams): Promise<api.ActionResult<CreditCard>> => {
  const response = await api.DELETE<CreditCard>(
    api.DELETE_PATIENT_CREDIT_CARD(patientId, creditCardId),
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

export { deletePatientCardAction }
