'use server'

import * as api from '@/api'
import type { InsurancePlan, SelectOptionType } from '@/types'
import { INSURANCE_PAYER_LIST_OPTION_SIZE } from '@/ui/revenue-cycle/constants'

const getPayerPlanOptionsAction = async (
  name: string,
): Promise<api.ActionResult<SelectOptionType[]>> => {
  const url = new URL(api.SEARCH_INSURANCE_PLANS_ENDPOINT)
  url.searchParams.append('limit', String(INSURANCE_PAYER_LIST_OPTION_SIZE))
  const response = await api.POST<InsurancePlan[]>(`${url}`, { name })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  const transformedData = response.data.map((data) => ({
    value: data.payerId ?? '',
    label: data.name,
  }))
  return {
    state: 'success',
    data: transformedData,
  }
}

export { getPayerPlanOptionsAction }
