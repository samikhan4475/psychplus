'use server'

import * as api from '@psychplus-v2/api'
import type { ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import {
  LocationProviders,
  LocationsProvidersApiResponse,
  SearchLocationsProvidersParams,
} from '@psychplus-v2/types'

const searchLocationsProvidersAction = async (
  payload: SearchLocationsProvidersParams,
): Promise<ActionResult<LocationsProvidersApiResponse>> => {
  const url = new URL(
    `${API_URL}/api/locationsproviders/actions/search/unauthenticated`,
  )
  const { limit, offset, ...rest } = payload

  Object.entries({ limit, offset }).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value))
    }
  })

  const result = await api.POST<LocationProviders[]>(url.toString(), rest)
  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: {
      locationsProviders: result.data ?? [],
      total: Number(result.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { searchLocationsProvidersAction }
