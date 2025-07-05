'use server'

import * as api from '@/api'
import { InsurancePlanItemPayload } from '../types'

const addPayerPlanAction = async (
  payload: Partial<InsurancePlanItemPayload>,
): Promise<api.ActionResult<boolean>> => {
  const url = new URL(api.ADD_PRACTICE_PAYER_PLAN(payload?.practiceId ?? ''))

  const response = await api.POST<boolean>(`${url}`, payload)

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: true,
  }
}

export { addPayerPlanAction }
