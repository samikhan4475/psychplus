'use server'

import * as api from '@/api'
import { InsurancePlan, SelectOptionType } from '@/types'

const getInsuranceOptionsAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const response = await api.POST<InsurancePlan[]>(
    api.SEARCH_INSURANCE_PLANS_ENDPOINT,
    {},
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

export { getInsuranceOptionsAction }
