'use server'

import * as api from '@/api'
import { State } from '@/types'
import { transformIn } from '../prescriber-settings/data'
import { PrescriberDataResponse, PrescriberSettingResponse } from '../types'

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

const getPrescriberSettings = async (
  states: State[],
): Promise<api.ActionResult<PrescriberDataResponse[]>> => {
  const response = await api.POST<PrescriberSettingResponse[]>(
    api.GET_PROVIDER_SETTINGS_ENDPOINT,
    payload,
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: transformIn(response.data, states),
  }
}

export { getPrescriberSettings }
