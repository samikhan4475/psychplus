'use client'

import * as api from '@/api/api.client'
import { LOCATION_ENDPOINT } from '@/api/endpoints'
import { Location, LocationSearchParams } from '@/types'

const searchLocationOptionsAction = async (
  params: Partial<LocationSearchParams>,
): Promise<api.ActionResult<{ label: string; value: string }[]>> => {
  const response = await api.POST<Location[]>(`${LOCATION_ENDPOINT}?orderBy=name`, params)
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.map((data) => ({
    value: data.id,
    label: data.name,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { searchLocationOptionsAction }
