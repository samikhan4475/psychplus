'use server'

import * as api from '@/api'
import type { InsurancePlan } from '@/types'
import { INSURANCE_PLAN_LIST_OPTION_SIZE } from '../constants'

const getInsurancePlanOptionsAction = async (
  name: string,
): Promise<api.ActionResult<{ label: string; value: string }[]>> => {
  const url = new URL(api.SEARCH_INSURANCE_PLANS_ENDPOINT)
  url.searchParams.append('limit', String(INSURANCE_PLAN_LIST_OPTION_SIZE))
  const response = await api.POST<InsurancePlan[]>(`${url}`, { name })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.map((data) => ({
    value: data.name,
    label: data.name,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getInsurancePlanOptionsAction }
