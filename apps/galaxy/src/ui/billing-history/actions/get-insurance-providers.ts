'use server'

import * as api from '@/api'
import { InsurancePayer, SelectOptionType } from '@/types'

const getInsuranceProvidersAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const result = await api.GET<InsurancePayer[]>(
    api.GET_INSURANCE_PAYERS_ENDPOINT,
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }
  const transformedOptions: SelectOptionType[] = result.data?.map((item) => ({
    label: item.name,
    value: item.id,
  }))
  return {
    state: 'success',
    data: transformedOptions,
  }
}

export { getInsuranceProvidersAction }
