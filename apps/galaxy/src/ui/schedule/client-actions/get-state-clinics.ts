'use client'

import * as api from '@/api/api.client'
import { GET_STATES_LOCATIONS_ENDPOINT } from '@/api/endpoints'
import { Clinic } from '@/types'

const getStateClinicsOptionsAction = async (
  stateId: string,
): Promise<api.ActionResult<{ label: string; value: string }[]>> => {
  const response = await api.GET<Clinic[]>(
    GET_STATES_LOCATIONS_ENDPOINT(stateId),
  )

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

export { getStateClinicsOptionsAction }
