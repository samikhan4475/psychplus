'use server'

import * as api from '@/api'
import { Location } from '@/types'
import { LocationPractice } from '../types'

const updateLocationAction = async (
  body: LocationPractice,
  locationId: string,
): Promise<api.ActionResult<Location>> => {
  const response = await api.PUT<Location>(
    api.UPDATE_LOCATION_ENDPOINT(locationId),
    body,
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return { state: 'success', data: response.data }
}

export { updateLocationAction }
