'use server'

import * as api from '@/api'
import { ClearingHouseReceiver, SelectOptionType } from '@/types'

const getReceiverListOptionsAction = async (
  search?: string,
): Promise<api.ActionResult<SelectOptionType[]>> => {
  const payload = search
    ? {
        receiverName: search,
      }
    : {}
  const response = await api.POST<ClearingHouseReceiver[]>(
    api.GET_CLEARING_HOUSE_RECEIVER_LIST_ENDPOINT,
    payload,
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.map((data) => ({
    value: data.id,
    label: search ? data.receiverName : data.clearingHouseName,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getReceiverListOptionsAction }
