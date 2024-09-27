'use server'

import * as api from '@/api'
import { CreditCard } from '@/types'

interface SetPrimaryPatientCardParams {
  patientId: number
  creditCardId: number
}

const setPrimaryPatientCard = async ({
  patientId,
  creditCardId,
}: SetPrimaryPatientCardParams): Promise<api.ActionResult<CreditCard>> => {
  const response = await api.POST<CreditCard>(
    api.SET_PRIMARY_PATIENT_CREDIT_CARD(patientId, creditCardId),
    {},
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

export { setPrimaryPatientCard }
