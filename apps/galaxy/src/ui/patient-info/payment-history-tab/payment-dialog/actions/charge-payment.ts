'use server'

import * as api from '@/api'
import { ChargePaymentParams } from '../types'

const chargePaymentAction = async (
  payload: ChargePaymentParams[],
): Promise<api.ActionResult<void>> => {
  const response = await api.POST<void>(
    api.PATIENT_CHARGE_PAYMENT_ENDPOINT,
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
    data: undefined,
  }
}

export { chargePaymentAction }
