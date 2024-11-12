'use server'

import * as api from '@/api'
import { InsurancePayer, SelectOptionType } from '@/types'

const getInsurancePlanPayersOptionsAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const response = await api.GET<InsurancePayer[]>(
    api.GET_INSURANCE_PAYERS_ENDPOINT(true),
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  const transformedData = response.data?.flatMap((item: InsurancePayer) =>
    item?.plans
      ? item?.plans?.map((plan) => ({
          value: plan.id,
          label: plan.name,
        }))
      : [],
  )

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getInsurancePlanPayersOptionsAction }
