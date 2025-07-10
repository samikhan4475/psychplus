'use server'

import * as api from '@/api'
import type { PracticePlanAddress } from '../types'

const deletePracticePlanAddressAction = async (
  payload: Partial<PracticePlanAddress>,
  practicePlanId: string,
): Promise<api.ActionResult<PracticePlanAddress>> => {
  const response = await api.DELETE<PracticePlanAddress>(
    api.UPDATE_PRACTICE_PLAN_ADDRESS(practicePlanId, payload.id as string),
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

export { deletePracticePlanAddressAction }
