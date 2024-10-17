'use server'

import * as api from '@/api'
import { InsurancePayment } from '../../types'

const getPaymentDetail = async (
  paymentId: string,
): Promise<api.ActionResult<InsurancePayment>> => {
  const result = await api.GET<InsurancePayment>(
    api.GET_INSURANCE_PAYMENT_DETAIL_ENDPOINT(paymentId),
  )
  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }
  return {
    state: 'success',
    data: result.data,
  }
}
export { getPaymentDetail }
