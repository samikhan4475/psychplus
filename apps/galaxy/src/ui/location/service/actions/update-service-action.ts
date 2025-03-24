'use server'

import * as api from '@/api'
import { ServicePaylod } from '../types'

const updateServiceAction = async (
  locationId: string,
  serviceId: string,
  data: Partial<ServicePaylod>,
): Promise<api.ActionResult<ServicePaylod>> => {
  const response = await api.PUT<ServicePaylod>(
    api.UPDATE_SERVICE_ENDPOINT(locationId, serviceId),
    data,
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return { state: 'success', data: response.data }
}

export { updateServiceAction }
