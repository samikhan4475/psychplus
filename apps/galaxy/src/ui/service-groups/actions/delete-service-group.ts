'use server'

import * as api from '@/api'
import type { ServiceGroup } from '../types'

const deleteServiceGroupAction = async (
  locationId: string,
  serviceId: string,
  id: string,
): Promise<api.ActionResult<ServiceGroup>> => {
  const response = await api.DELETE<ServiceGroup>(
    api.UPDATE_SERVICE_GROUPS_ENDPOINT(locationId, serviceId, id),
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

export { deleteServiceGroupAction }
