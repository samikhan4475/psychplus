'use server'

import * as api from '@/api'
import { PracticePlanConfigurationRule } from '../types'

const getPracticePlanConfigurationAction = async (
  practicePlanId: string,
): Promise<api.ActionResult<PracticePlanConfigurationRule[]>> => {
  const url = new URL(api.PRACTICE_PLAN_CONFIGURATION_ENDPOINT(practicePlanId))
  const response = await api.GET<PracticePlanConfigurationRule[]>(`${url}`)
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

export { getPracticePlanConfigurationAction }
