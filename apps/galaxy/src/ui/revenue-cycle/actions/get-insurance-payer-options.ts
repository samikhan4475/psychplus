'use server'

import * as api from '@/api'
import { InsurancePlan, SelectOptionType } from '@/types'
import { INSURANCE_PAYER_LIST_OPTION_SIZE } from '../constants'

const getInsurancePayerOptionsAction = async (
  search: string,
): Promise<api.ActionResult<SelectOptionType[]>> => {
  const url = new URL(api.GET_INSURANCE_PAYERS_LIST_ENDPOINT)
  url.searchParams.append('limit', String(INSURANCE_PAYER_LIST_OPTION_SIZE))
  const response = await api.POST<InsurancePlan[]>(`${url}`, {
    name: search,
  })

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

export { getInsurancePayerOptionsAction }
