'use server'

import * as api from '@/api'
import { LocationWithCosigner } from '../types'

const getLocationAndCosignersOfStateAndServices = async (
  stateCode: string,
  servicesOffered: string[],
): Promise<api.ActionResult<LocationWithCosigner[]>> => {
  const response = await api.POST<LocationWithCosigner[]>(
    api.GET_LOCATION_COSIGNERS_OF_STATE_SERVICE(stateCode),
    {
      servicesOffered,
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

export { getLocationAndCosignersOfStateAndServices }
