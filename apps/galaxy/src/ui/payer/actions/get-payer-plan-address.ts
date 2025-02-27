'use server'

import * as api from '@/api'
import { PayerPlanAddressResponse, SharedCode } from '@/types'

const getPayersPlanAddressesListAction = async (
  payerId: string,
  states: SharedCode[],
): Promise<api.ActionResult<PayerPlanAddressResponse[]>> => {
  const response = await api.GET<PayerPlanAddressResponse[]>(
    api.GET_PAYER_PLAN_ADDRESS(payerId),
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const stateMap = Object.fromEntries(
    states.map((state) => [state.value, state.display]),
  )

  const transformedData = response.data.map((record) => ({
    ...record,
    address: {
      ...record.address,
      state: stateMap[record.address.state as string],
    },
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getPayersPlanAddressesListAction }
