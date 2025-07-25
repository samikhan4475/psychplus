'use client'

import * as api from '@/api/api.client'
import { SEARCH_LOCATION_SERVICES_ENDPOINT } from '@/api/endpoints'
import { Service } from '@/types'

const getLocationServicesAction = async (
  locationIds: string[],
): Promise<api.ActionResult<{ label: string; value: string }[]>> => {
  const response = await api.POST<Service[]>(
    SEARCH_LOCATION_SERVICES_ENDPOINT,
    {
      locationIds,
    },
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.map((data) => ({
    value: data.id,
    label: data.serviceOffered,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getLocationServicesAction }
