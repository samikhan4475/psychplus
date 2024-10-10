'use server'

import * as api from '@/api'
import type { InsurancePlan } from '@/types'

const getInsurancePlanOptionsAction = async (): Promise<
  api.ActionResult<{ label: string; value: string }[]>
> => {
  const body = {}
  const response = await api.POST<InsurancePlan[]>(
    api.SEARCH_INSURANCE_PLANS_ENDPOINT,
    body,
    {
      next: {
        revalidate: 3600,
      },
    },
  )

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
