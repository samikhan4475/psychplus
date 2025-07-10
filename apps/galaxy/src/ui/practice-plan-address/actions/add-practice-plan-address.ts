'use server'

import * as api from '@/api'
import type { PracticePlanAddress } from '../types'

const addPracticePlanAddressAction = async (
  payload: Partial<PracticePlanAddress>,
  practicePlanId: string,
): Promise<api.ActionResult<PracticePlanAddress>> => {
  const response = await api.POST<PracticePlanAddress>(
    api.ADD_PRACTICE_PLAN_ADDRESS(practicePlanId),
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

export { addPracticePlanAddressAction }
