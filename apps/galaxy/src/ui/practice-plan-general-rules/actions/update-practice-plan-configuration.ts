'use server'

import * as api from '@/api'
import { PracticePlanConfigurationRule } from '../types'

interface PracticePlanConfigurationRuleParams {
  id: string
  ruleValue: string
  code: string
  practicePlanId: string
}

const updatePracticePlanConfigurationAction = async (
  payload: PracticePlanConfigurationRuleParams,
): Promise<api.ActionResult<PracticePlanConfigurationRule[]>> => {
  const url = new URL(
    api.PRACTICE_PLAN_CONFIGURATION_ENDPOINT(payload.practicePlanId),
  )
  const response = await api.PUT<PracticePlanConfigurationRule[]>(`${url}`, [
    payload,
  ])
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

export { updatePracticePlanConfigurationAction }
