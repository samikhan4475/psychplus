'use server'

import * as api from '@/api'
import type { ServiceRoom } from '../types'

const deleteServiceRoomAction = async (
  locationId: string,
  serviceId: string,
  id: string,
): Promise<api.ActionResult<ServiceRoom>> => {
  const response = await api.DELETE<ServiceRoom>(
    api.UPDATE_SERVICE_ROOMS_ENDPOINT(locationId, serviceId, id),
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

export { deleteServiceRoomAction }
