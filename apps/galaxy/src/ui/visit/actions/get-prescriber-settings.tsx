'use server'

import * as api from '@/api'
import { Metadata } from '@/types'

interface GetPrescriberSettingsResponse {
  id: string
  metadata: Metadata
  settingStatusCode: string
  levelCode: string
  categoryCode: string
  categoryValue: string
  name: string
  content: string
}

const getPrescriberSettings = async (payload: {
  isHierarchicalQuery?: boolean
  userId?: number
  name?: string
}): Promise<api.ActionResult<GetPrescriberSettingsResponse[]>> => {
  const response = await api.POST<GetPrescriberSettingsResponse[]>(
    api.GET_PROVIDER_SETTINGS_ENDPOINT,
    {
      categoryValue: 'ProviderDefaults',
      settingStatusCode: 'Active',
      levelCodes: ['System'],
      ...payload,
    },
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

export { getPrescriberSettings, type GetPrescriberSettingsResponse }
