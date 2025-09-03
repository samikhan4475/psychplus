'use server'

import * as api from '@/api'
import type { ServiceRoom } from '../types'

const addServiceRoomAction = async (
  payload: Partial<ServiceRoom>,
  locationId: string,
  serviceId: string,
): Promise<api.ActionResult<ServiceRoom>> => {
  const response = await api.POST<ServiceRoom>(
    api.ADD_SERVICE_ROOM_ENDPOINT(locationId, serviceId),
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

export { addServiceRoomAction }
