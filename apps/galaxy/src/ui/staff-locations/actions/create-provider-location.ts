'use server'

import * as api from '@/api'
import { Location } from '../types'

interface CreateProviderLocationActionParams {
  staffId: string
  locationId: string
}
const createProviderLocationAction = async ({
  staffId,
  locationId,
}: CreateProviderLocationActionParams): Promise<
  api.ActionResult<Location[]>
> => {
  const url = new URL(api.ADD_PROVIDER_LOCATION_ENDPOINT(staffId))
  const response = await api.POST<Location[]>(`${url}`, [
    {
      locationId,
    },
  ])

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

export { createProviderLocationAction }
