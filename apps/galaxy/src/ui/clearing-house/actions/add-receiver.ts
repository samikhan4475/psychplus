'use server'

import * as api from '@/api'
import type { ClearingHouseReceiver } from '../types'

const addReceiverAction = async (
  payload: Partial<ClearingHouseReceiver>,
): Promise<api.ActionResult<ClearingHouseReceiver>> => {
  const response = await api.POST<ClearingHouseReceiver>(
    api.ADD_CLEARING_HOUSE_RECEIVER_ENDPOINT,
    payload,
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data,
  }
}

export { addReceiverAction }
