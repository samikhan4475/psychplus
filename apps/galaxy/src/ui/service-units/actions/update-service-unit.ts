'use server'

import * as api from '@/api'
import type { ServiceUnit } from '../types'

const updateServiceUnitAction = async (
  payload: Partial<ServiceUnit>,
  locationId: string,
  serviceId: string,
  id: string,
): Promise<api.ActionResult<ServiceUnit>> => {
  const response = await api.PUT<ServiceUnit>(
    api.UPDATE_SERVICE_UNITS_ENDPOINT(locationId, serviceId, id),
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

export { updateServiceUnitAction }
