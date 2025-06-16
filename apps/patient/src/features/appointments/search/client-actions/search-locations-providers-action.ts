'use client'

import type { ActionResult } from '@psychplus-v2/api/client'
import * as api from '@psychplus-v2/api/client'
import { API_URL } from '@psychplus-v2/env'
import {
  LocationProviders,
  LocationsProvidersApiResponse,
  SearchLocationsProvidersParams,
} from '@psychplus-v2/types'

const searchLocationsProvidersClientAction = async (
  payload: SearchLocationsProvidersParams,
): Promise<ActionResult<LocationsProvidersApiResponse>> => {
  let url = `${API_URL}/api/locationsproviders/actions/search/unauthenticated`

  const { limit, offset, ...rest } = payload

  if (limit && offset) {
    url += `?limit=${limit}&offset=${offset}`
  }

  const response = await api.POST<LocationProviders[]>(url, rest)
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      locationsProviders: response.data ?? [],
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { searchLocationsProvidersClientAction }
