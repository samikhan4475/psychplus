'use server'

import * as api from '@/api'
import type { ServiceGroup } from '../types'

const updateServiceGroupAction = async (
  payload: Partial<ServiceGroup>,
  locationId: string,
  serviceId: string,
  id: string,
): Promise<api.ActionResult<ServiceGroup>> => {
  const response = await api.PUT<ServiceGroup>(
    api.UPDATE_SERVICE_GROUPS_ENDPOINT(locationId, serviceId, id),
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

export { updateServiceGroupAction }
