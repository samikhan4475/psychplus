'use server'

import * as api from '@/api'
import type { InsurancePlan, SelectOptionType } from '@/types'
import { INSURANCE_PLAN_LIST_OPTION_SIZE } from '../constants'

interface InsurancePlanOptionType extends SelectOptionType {
  insurancePlanId: string
}

const getInsurancePlanOptionsAction = async (
  name: string,
): Promise<api.ActionResult<InsurancePlanOptionType[]>> => {
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
    insurancePlanId: data.id,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getInsurancePlanOptionsAction, type InsurancePlanOptionType }
