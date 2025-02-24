'use client'

import * as api from '@/api/api.client'
import { SELF_USER_BULK_SETTINGS } from '@/api/endpoints'
import { AddSelfUserSettingBody, UserSetting } from '@/types'

const addSelfUserSettings = async (
  body: AddSelfUserSettingBody[],
): Promise<api.ActionResult<UserSetting[]>> => {
  const result = await api.POST<UserSetting[]>(SELF_USER_BULK_SETTINGS, body)

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data,
  }
}

export { addSelfUserSettings }
