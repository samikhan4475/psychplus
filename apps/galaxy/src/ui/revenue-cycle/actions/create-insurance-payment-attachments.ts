'use server'

import * as api from '@/api'
import type { PaymentAttachments } from '../types'

const createInsurancePaymentAttachmentsAction = async (
  payload: FormData,
  id: string,
): Promise<api.ActionResult<PaymentAttachments>> => {
  const response = await api.POST<PaymentAttachments>(
    api.INSURANCE_PAYMENT_ATTACHMENTS_ENDPOINT(id),
    payload,
    {
      ignoreHeaders: false,
    },
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

export { createInsurancePaymentAttachmentsAction }
