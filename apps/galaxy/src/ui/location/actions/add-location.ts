'use server'

import * as api from '@/api'
import { Location } from '@/types'
import { LocationFormBody } from '../location-tab'

const addLocationAction = async (
  body: LocationFormBody,
): Promise<api.ActionResult<Location>> => {
  const response = await api.POST<Location>(api.ADD_LOCATION_ENDPOINT, body)

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return { state: 'success', data: response.data }
}

export { addLocationAction }
