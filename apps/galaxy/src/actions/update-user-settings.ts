'use server'

import * as api from '@/api'
import { UserSetting } from '@/types'

const updateUserSettings = async (
  settingId: UserSetting['id'],
  payload: Partial<UserSetting>,
): Promise<api.ActionResult<UserSetting>> => {
  const response = await api.PUT<UserSetting>(
    api.UPDATE_SELF_USER_SETTINGS(settingId),
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
    data: response.data,
  }
}

export { updateUserSettings }
