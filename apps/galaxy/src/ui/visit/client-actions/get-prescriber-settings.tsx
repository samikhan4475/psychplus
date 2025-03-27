'use client'

import * as api from '@/api/api.client'
import { GET_PROVIDER_SETTINGS_ENDPOINT } from '@/api/endpoints'
import { LevelCode } from '@/constants'
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
    GET_PROVIDER_SETTINGS_ENDPOINT,
    {
      categoryValue: 'ProviderDefaults',
      settingStatusCode: 'Active',
      isHierarchicalQuery: true,
      levelCodes: [LevelCode.System, LevelCode.User],
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
