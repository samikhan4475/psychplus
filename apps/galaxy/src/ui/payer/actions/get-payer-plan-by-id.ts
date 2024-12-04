'use server'

import * as api from '@/api'
import { UpdatePayerPlan } from '@/types'

const getPayerPlanByIdAction = async (
  id: string,
): Promise<api.ActionResult<UpdatePayerPlan>> => {
  const response = await api.GET<UpdatePayerPlan>(api.PAYER_PLAN_BY_ID(id))

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

export { getPayerPlanByIdAction }
