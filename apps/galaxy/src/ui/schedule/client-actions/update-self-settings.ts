'use client'

import * as api from '@/api/api.client'
import { SELF_USER_BULK_SETTINGS } from '@/api/endpoints'
import { UserSetting } from '@/types'

type UpdateSettingsBody = Omit<UserSetting, 'userId'>[]

const updateSelfUserSetting = async (
  body: UpdateSettingsBody,
): Promise<api.ActionResult<UserSetting[]>> => {
  const result = await api.PUT<UserSetting[]>(SELF_USER_BULK_SETTINGS, body)

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

export { updateSelfUserSetting }
