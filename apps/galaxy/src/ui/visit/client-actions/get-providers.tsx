'use client'

import * as api from '@/api/api.client'
import { GET_STAFF_ENDPOINT } from '@/api/endpoints'
import type { Provider } from '../types'

interface GetProviderResponse {
  id: number
  userId: number
  avatar?: string
  legalName: {
    firstName: string
    lastName: string
    honors: string
  }
  phoneContact: string
}

const getProviders = async (payload: {
  name?: string
  locationIds: string[]
  providerType?: string
  honors?: string[]
  isIncludeProvidersForServicePrimaryProviderType?: boolean
  servicesOffered?: string
  staffIds?: string[]
}): Promise<api.ActionResult<Provider[]>> => {
  const {
    isIncludeProvidersForServicePrimaryProviderType,
    servicesOffered,
    staffIds,
    providerType,
    ...rest
  } = payload

  const shouldIncludeServiceProviders =
    isIncludeProvidersForServicePrimaryProviderType && servicesOffered

  const response = await api.POST<GetProviderResponse[]>(GET_STAFF_ENDPOINT, {
    ...rest,
    roleCodes: ['1'],
    IsIncludeProviderForFacility: true,
    isIncludeProviderWithLicenseOnly: true,
    ...(providerType && { providerType }),
    ...(shouldIncludeServiceProviders && {
      isIncludeProvidersForServicePrimaryProviderType,
      servicesOffered,
    }),
    ...(staffIds && {
      staffIds,
    }),
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
      userId: provider.userId,
      avatar: provider.avatar,
      firstName: provider.legalName.firstName,
      lastName: provider.legalName.lastName,
      honors: provider.legalName.honors,
      phoneContact: provider.phoneContact,
    })),
  }
}

export { getProviders }
