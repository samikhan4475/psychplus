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

  const serviceMap = new Map<string, { label: string; value: string }>()
  
  response.data.forEach((data) => {
    if (!serviceMap.has(data.serviceOffered)) {
      serviceMap.set(data.serviceOffered, {
        value: data.id,
        label: data.serviceOffered,
      })
    }
  })

  const transformedData = Array.from(serviceMap.values())

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getLocationServicesAction }
