'use server'

import * as api from '@/api'
import type { Provider } from '../types'

interface GetProviderResponse {
  id?: number
  avatar?: string
  legalName: {
    firstName: string
    lastName: string
    honors: string
  }
}

const getProviders = async (payload: {
  name?: string
  locationIds: string[]
  providerType?: string
}): Promise<api.ActionResult<Provider[]>> => {
  const url = new URL(api.GET_STAFF_ENDPOINT)

  const response = await api.POST<GetProviderResponse[]>(url.toString(), {
    ...payload,
    roleCodes: ['1'],
  })
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data.map((provider) => ({
      id: provider.id,
      avatar: provider.avatar,
      firstName: provider.legalName.firstName,
      lastName: provider.legalName.lastName,
      honors: provider.legalName.honors,
    })),
  }
}

export { getProviders }
