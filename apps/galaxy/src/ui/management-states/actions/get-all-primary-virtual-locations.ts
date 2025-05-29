'use server'

import * as api from '@/api'
import { PrimaryLocation } from '../types'

const getAllPrimaryVirtualLocations = async (): Promise<
  api.ActionResult<PrimaryLocation[]>
> => {
  const response = await api.POST<PrimaryLocation[]>(
    api.VIRTUAL_PRIMARY_LOCATIONS_ENDPOINT,
    { recordStatuses: ['Active'] },
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

export { getAllPrimaryVirtualLocations }
