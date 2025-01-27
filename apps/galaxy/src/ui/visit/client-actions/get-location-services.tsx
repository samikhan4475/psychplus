'use client'

import { LOCATION_SERVICES_ENDPOINT } from '@/api/endpoints'
import * as api from '@/api/api.client'
import { Service } from '@/types'

const getLocationServices = async (payload: {
  locationIds?: string[]
  locationServiceIds?: string[]
  includeServiceVisitType?: boolean
  includeServiceUnit?: boolean
  includeServiceGroup?: boolean
}): Promise<api.ActionResult<Service[]>> => {
  const response = await api.POST<Service[]>(
    `${LOCATION_SERVICES_ENDPOINT}`,
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
