'use server'

import * as api from '@/api'
import { GetStaffLocationListResponse, StaffLocation } from '../types'

const getProviderLocationHistoryAction = async (
  providerLocationId: string,
): Promise<api.ActionResult<Omit<GetStaffLocationListResponse, 'total'>>> => {
  const url = new URL(api.GET_PROVIDER_LOCATION_HISTORY)
  const response = await api.POST<StaffLocation[]>(`${url}`, {
    providerLocationId,
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      staffLocations: response.data,
    },
  }
}

export { getProviderLocationHistoryAction }
