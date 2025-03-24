'use server'

import * as api from '@/api'
import { Service } from '@/types'

const deleteServiceAction = async (
  locationId: string,
  serviceId: string,
): Promise<api.ActionResult<Service[]>> => {
  const result = await api.DELETE<Service[]>(
    api.DELETE_SERVICES_ENDPOINT(locationId, serviceId),
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result?.data,
  }
}

export { deleteServiceAction }
