'use server'

import * as api from '@/api'

const deletePayerPlanRecord = async (
  payerId: string,
  insurancePlanId: string,
): Promise<api.ActionResult<void>> => {
  const result = await api.DELETE(
    api.DELETE_PAYER_PLAN(payerId, insurancePlanId),
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

export { deletePayerPlanRecord }
