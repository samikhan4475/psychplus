'use server'

import * as api from '@/api'
import { Location, LocationSearchParams } from '@/types'

const searchLocationOptionsAction = async (
  params: Partial<LocationSearchParams>,
): Promise<api.ActionResult<{ label: string; value: string }[]>> => {
  const response = await api.POST<Location[]>(api.LOCATION_ENDPOINT, params)
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
