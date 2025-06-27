'use server'

import * as api from '@/api'
import { PracticePlan } from '../types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
}

const getPracticePlanStatesAction = async (
  practicePlanId: string,
): Promise<api.ActionResult<PracticePlan[]>> => {
  const url = new URL(api.GET_PRACTICE_PLAN_STATES(practicePlanId))
  const response = await api.POST<PracticePlan[]>(`${url}`, defaultPayload)
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

export { getPracticePlanStatesAction }
