'use server'

import * as api from '@/api'
import { PrescriberSettingResponse } from '../types'

const payload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  isHierarchicalQuery: true,
  settingStatusCode: 'Active',
  levelCodes: ['User'],
  categoryCodes: ['Application'],
  categoryValue: 'PrescriberSettings',
}

const getPrescriberSettings = async ({
  userId,
}: {
  userId: number
}): Promise<api.ActionResult<PrescriberSettingResponse[]>> => {
  const response = await api.POST<PrescriberSettingResponse[]>(
    api.GET_PROVIDER_SETTINGS_ENDPOINT,
    { ...payload, userId },
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

export { getPrescriberSettings }
