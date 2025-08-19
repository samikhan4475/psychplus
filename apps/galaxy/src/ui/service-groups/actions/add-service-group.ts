'use server'

import * as api from '@/api'
import type { ServiceGroup } from '../types'

const addServiceGroupAction = async (
  payload: Partial<ServiceGroup>,
  locationId: string,
  serviceId: string,
): Promise<api.ActionResult<ServiceGroup>> => {
  const response = await api.POST<ServiceGroup>(
    api.ADD_SERVICE_GROUP_ENDPOINT(locationId, serviceId),
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

export { addServiceGroupAction }
