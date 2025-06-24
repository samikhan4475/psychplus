'use server'

import * as api from '@/api'
import { PayerPlanResponse } from '@/types'
import { SelectPayerOption } from '../../types'

const defaultPayload = {
  isIncludePayer: true,
  recordStatuses: ['Active'],
  includeTest: true,
}

const getPayerPlanAction = async (
  name: string,
): Promise<api.ActionResult<SelectPayerOption[]>> => {
  const url = new URL(api.GET_PAYER_PLANS_LIST)

  const response = await api.POST<PayerPlanResponse[]>(`${url}`, {
    name,
    ...defaultPayload,
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.map((option) => ({
    label: option.name,
    value: option.id,
    payerName: option.payerName,
    payerType: option.payerType,
    payerId: option.payerId,
    planStatus: option.isActive,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getPayerPlanAction }
