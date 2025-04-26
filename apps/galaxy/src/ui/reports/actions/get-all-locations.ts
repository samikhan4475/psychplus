'use server'

import * as api from '@/api'
import { Location } from '@/types'

const getAllLocations = async (): Promise<api.ActionResult<Location[]>> => {
  const response = await api.POST<Location[]>(api.LOCATION_ENDPOINT, {})

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
