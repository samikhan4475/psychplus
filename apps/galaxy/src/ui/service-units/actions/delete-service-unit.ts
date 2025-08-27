'use server'

import * as api from '@/api'
import type { ServiceUnit } from '../types'

const deleteServiceUnitAction = async (
  locationId: string,
  serviceId: string,
  id: string,
): Promise<api.ActionResult<ServiceUnit>> => {
  const response = await api.DELETE<ServiceUnit>(
    api.UPDATE_SERVICE_UNITS_ENDPOINT(locationId, serviceId, id),
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

export { deleteServiceUnitAction }
