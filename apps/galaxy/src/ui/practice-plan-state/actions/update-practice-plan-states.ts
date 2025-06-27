'use server'

import * as api from '@/api'
import { PracticePlan } from '../types'

interface UpdatePracticePlanStateActionParams {
  payload: {
    practicePlanId: string
    stateCode: string
    recordStatus: string
  }
}

const updatePracticePlanStateAction = async ({
  payload,
}: UpdatePracticePlanStateActionParams): Promise<
  api.ActionResult<PracticePlan>
> => {
  const url = new URL(api.UPDATE_PRACTICE_PLAN_STATES(payload.practicePlanId))
  const response = await api.PUT<PracticePlan>(`${url}`, [payload])
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

export { updatePracticePlanStateAction }
