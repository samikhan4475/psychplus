'use client'

import * as api from '@/api/api.client'
import { GET_INSURANCE_PAYERS_ENDPOINT } from '@/api/endpoints'
import { InsurancePayer, SelectOptionType } from '@/types'

const getInsurancePayersOptionsAction = async (
  signal: AbortSignal,
): Promise<api.ActionResult<SelectOptionType[]>> => {
  const response = await api.GET<InsurancePayer[]>(
    GET_INSURANCE_PAYERS_ENDPOINT(false),
    {
      signal,
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

export { getInsurancePayersOptionsAction }
