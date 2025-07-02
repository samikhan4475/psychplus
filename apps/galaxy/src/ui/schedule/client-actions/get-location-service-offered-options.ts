'use client'

import * as api from '@/api/api.client'
import { SEARCH_LOCATION_SERVICES_ENDPOINT } from '@/api/endpoints'
import { SelectOptionType, Service } from '@/types'

const getLocationServiceOfferedOptionsAction = async (
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

  const duplicated = new Set<string>()
  const transformedData: SelectOptionType[] = []
  response.data.forEach((data) => {
    if (!duplicated.has(data.serviceOffered)) {
      duplicated.add(data.serviceOffered)
      transformedData.push({
        value: data.serviceOffered,
        label: data.serviceOffered,
      })
    }
  })

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getLocationServiceOfferedOptionsAction }
