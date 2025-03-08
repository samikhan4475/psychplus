'use server'

import * as api from '@/api'
import { SelectOptionType } from '@/types'
import { Location } from '../types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
}
const getStateLocationAction = async (
  locationName: string,
): Promise<api.ActionResult<SelectOptionType[]>> => {
  const url = new URL(api.LOCATION_ENDPOINT)
  const response = await api.POST<Location[]>(`${url}`, {
    ...defaultPayload,
    locationName,
  })

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

export { getStateLocationAction }
