'use server'

import * as api from '@/api'
import { UpdatePayerPlan } from '@/types'

const updatePayerPlanAction = async (
  payload: Partial<UpdatePayerPlan>,
  payerid: string,
  insuranceid: string,
): Promise<api.ActionResult<UpdatePayerPlan>> => {
  const response = await api.PUT<UpdatePayerPlan>(
    api.UPDATE_PAYER_PLAN(payerid, insuranceid),
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

export { updatePayerPlanAction }
