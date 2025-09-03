'use server'

import * as api from '@/api'
import type { ServiceRoom } from '../types'

const getAllServiceRoomHistoryAction = async (
  locationId: string,
  groupId: string,
): Promise<api.ActionResult<ServiceRoom[]>> => {
  const response = await api.POST<ServiceRoom[]>(
    api.SERVICE_ROOM_HISTORY_ENDPOINT(locationId, groupId),
    {},
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

export { getAllServiceRoomHistoryAction }
