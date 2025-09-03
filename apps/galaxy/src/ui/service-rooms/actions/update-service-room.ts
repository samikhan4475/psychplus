'use server'

import * as api from '@/api'
import type { ServiceRoom } from '../types'

const updateServiceRoomAction = async (
  payload: Partial<ServiceRoom>,
  locationId: string,
  serviceId: string,
  id: string,
): Promise<api.ActionResult<ServiceRoom>> => {
  const response = await api.PUT<ServiceRoom>(
    api.UPDATE_SERVICE_ROOMS_ENDPOINT(locationId, serviceId, id),
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

export { updateServiceRoomAction }
