'use server'

import * as api from '@/api'
import type { ClearingHouseReceiver } from '../types'

const updateReceiverAction = async (
  payload: Partial<ClearingHouseReceiver>,
  id: string,
): Promise<api.ActionResult<ClearingHouseReceiver>> => {
  const response = await api.PUT<ClearingHouseReceiver>(
    api.UPDATE_CLEARING_HOUSE_RECEIVER_ENDPOINT(id),
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

export { updateReceiverAction }
