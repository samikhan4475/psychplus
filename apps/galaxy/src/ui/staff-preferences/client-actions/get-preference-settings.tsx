'use client'

import * as api from '@/api/api.client'
import { GET_PROVIDER_SETTINGS_ENDPOINT } from '@/api/endpoints'
import { CategoryValue, LevelCode, SettingStatusCode } from '@/constants'
import { UserSetting } from '@/types'

const getPreferenceSettings = async (payload: {
  userId: number
  name?: string
  names?: string[]
  categoryValues?: string[]
  levelCodes?: LevelCode[]
  settingStatusCode?: SettingStatusCode
}): Promise<api.ActionResult<UserSetting[]>> => {
  const response = await api.POST<UserSetting[]>(
    GET_PROVIDER_SETTINGS_ENDPOINT,
    {
      isHierarchicalQuery: true,
      levelCodes: [LevelCode.System, LevelCode.User],
      categoryValues: [
        CategoryValue.ProviderDefaults,
        CategoryValue.StaffPreference,
      ],
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

export { getPreferenceSettings }
