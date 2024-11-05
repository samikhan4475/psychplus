'use server'

import * as api from '@/api'
import { SelectOptionType } from '@/types'
import type { ClearingHouseReceiver } from '../types'

const getReceiverListOptionsAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const response = await api.POST<ClearingHouseReceiver[]>(
    api.GET_CLEARING_HOUSE_RECEIVER_LIST_ENDPOINT,
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
    label: data.clearingHouseName,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getReceiverListOptionsAction }
