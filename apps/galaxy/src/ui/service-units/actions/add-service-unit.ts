'use server'

import * as api from '@/api'
import type { ServiceUnit } from '../types'

const addServiceUnitAction = async (
  payload: Partial<ServiceUnit>,
  locationId: string,
  serviceId: string,
): Promise<api.ActionResult<ServiceUnit>> => {
  const response = await api.POST<ServiceUnit>(
    api.ADD_SERVICE_UNIT_ENDPOINT(locationId, serviceId),
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

export { addServiceUnitAction }
