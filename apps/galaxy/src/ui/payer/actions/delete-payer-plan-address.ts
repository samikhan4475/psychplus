'use server'

import * as api from '@/api'

const deletePayerPlanAddressRecord = async (
  payerId: string,
  payerAddressId: string,
): Promise<api.ActionResult<void>> => {
  const result = await api.DELETE(
    api.DELETE_PAYER_PLAN_ADDRESS(payerId, payerAddressId),
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

export { deletePayerPlanAddressRecord }
