'use server'

import * as api from '@/api'
import { InsurancePlanItemPayload } from '../types'

const updatePayerPlanAction = async (
  payload: Partial<InsurancePlanItemPayload>,
): Promise<api.ActionResult<boolean>> => {
  const url = new URL(
    api.UPDATE_PRACTICE_PAYER_PLAN(
      payload?.practiceId ?? '',
      payload.id ?? '',
    ),
  )

  const response = await api.PUT<boolean>(`${url}`, payload)

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

export { updatePayerPlanAction }
