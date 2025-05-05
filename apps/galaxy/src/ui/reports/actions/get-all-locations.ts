'use client'

import * as api from '@/api/api.client'
import { LOCATION_ENDPOINT } from '@/api/endpoints'
import { Location } from '@/types'

const getAllLocations = async (
  signal: AbortSignal,
): Promise<api.ActionResult<Location[]>> => {
  const response = await api.POST<Location[]>(LOCATION_ENDPOINT, { signal })

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

export { getAllLocations }
