'use client'

import * as api from '@/api/api.client'
import { SEARCH_INSURANCE_PLANS_ENDPOINT } from '@/api/endpoints'
import type { InsurancePlan } from '@/types'

const getInsurancePlanOptionsAction = async (): Promise<
  api.ActionResult<{ label: string; value: string }[]>
> => {
  const body = {}
  const response = await api.POST<InsurancePlan[]>(
    SEARCH_INSURANCE_PLANS_ENDPOINT,
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
    value: data.id,
    label: data.name,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getInsurancePlanOptionsAction }
