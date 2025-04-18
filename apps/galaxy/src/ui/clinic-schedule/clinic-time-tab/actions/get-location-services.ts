'use server'

import * as api from '@/api'
import { Service } from '@/types'

const getLocationServicesAction = async (
  locationIds: string[],
  locationServiceIds?: string[],
): Promise<api.ActionResult<Service[]>> => {
  const response = await api.POST<Service[]>(
    api.SEARCH_LOCATION_SERVICES_ENDPOINT,
    {
      includeServiceVisitType: true,
      locationIds,
      locationServiceIds,
    },
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

export { getLocationServicesAction }
