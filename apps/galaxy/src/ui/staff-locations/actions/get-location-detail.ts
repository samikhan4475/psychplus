'use server'

import * as api from '@/api'
import { Location , LocationResult } from '../types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
}
const getLocationDetail = async (
  id: string,
): Promise<api.ActionResult<LocationResult[]>> => {
  const url = new URL(api.LOCATION_ENDPOINT)
  const payload = {
    ...defaultPayload,
    id,
  }
  const response = await api.POST<Location[]>(`${url}`,payload)
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.map((data) => ({
    name: data.name,
    npi: data.npi,
    phone: data.phone,
    address: data.address,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getLocationDetail }
