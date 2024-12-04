'use server'

import * as api from '@/api'
import { AddPayerPlan } from '@/types'

const addPayerPlanAction = async (
  payload: Partial<AddPayerPlan>,
  id: string,
): Promise<api.ActionResult<AddPayerPlan>> => {
  const response = await api.POST<AddPayerPlan>(api.ADD_PAYER_PLAN(id), payload)

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

export { addPayerPlanAction }
