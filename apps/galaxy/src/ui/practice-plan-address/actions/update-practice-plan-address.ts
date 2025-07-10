'use server'

import * as api from '@/api'
import type { PracticePlanAddress } from '../types'

const updatePracticePlanAddressAction = async (
  payload: Partial<PracticePlanAddress>,
  practicePlanId: string,
): Promise<api.ActionResult<PracticePlanAddress>> => {
  const response = await api.PUT<PracticePlanAddress>(
    api.UPDATE_PRACTICE_PLAN_ADDRESS(practicePlanId, payload.id as string),
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

export { updatePracticePlanAddressAction }
