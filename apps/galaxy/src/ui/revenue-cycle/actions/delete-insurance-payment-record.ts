'use server'

import * as api from '@/api'

const deleteInsurancePaymentRecord = async (
  recordId: string,
): Promise<api.ActionResult<void>> => {
  const result = await api.DELETE(
    api.DELETE_INSURANCE_PAYMENT_ENDPOINT(recordId),
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: undefined,
  }
}

export { deleteInsurancePaymentRecord }
