'use client'

import * as api from '@/api/api.client'
import { GET_STATES_PRIMARY_LOCATIONS } from '@/api/endpoints'
import { StatesPrimaryLocation } from '../types'

const getPrimaryStatesLocations = async (): Promise<
  api.ActionResult<StatesPrimaryLocation[]>
> => {
  const response = await api.POST<StatesPrimaryLocation[]>(
    GET_STATES_PRIMARY_LOCATIONS,
    {},
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

export { getPrimaryStatesLocations }
