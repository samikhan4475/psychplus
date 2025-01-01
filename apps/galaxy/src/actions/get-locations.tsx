'use server'

import * as api from '@/api'
import { Location } from '@/types'

const getLocations = async (
  locationId: string,
): Promise<api.ActionResult<Location[]>> => {
  const response = await api.POST<Location[]>(api.LOCATION_ENDPOINT, {
    id: locationId,
  })

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

export { getLocations }
