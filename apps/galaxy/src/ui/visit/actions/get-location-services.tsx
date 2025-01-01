'use server'

import * as api from '@/api'
import { Service } from '@/types'

const getLocationServices = async (payload: {
  locationId?: string
  locationServiceIds?: string[]
  includeServiceVisitType?: boolean
  includeServiceUnit?: boolean
  includeServiceGroup?: boolean
}): Promise<api.ActionResult<Service[]>> => {
  const response = await api.POST<Service[]>(
    `${api.LOCATION_SERVICES_ENDPOINT}`,
    payload,
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return { state: 'success', data: response.data }
}

export { getLocationServices }
