'use server'

import * as api from '@/api'
import { InsurancePayer, SelectOptionType } from '@/types'

const getInsurancePayersOptionsAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const response = await api.GET<InsurancePayer[]>(
    api.GET_INSURANCE_PAYERS_ENDPOINT,
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
