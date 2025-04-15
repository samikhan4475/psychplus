'use server'

import * as api from '@/api'
import { UserSetting } from '@/types'

const deleteUserSettings = async (
  settingId: UserSetting['id'],
): Promise<api.ActionResult<UserSetting>> => {
  const response = await api.DELETE<UserSetting>(
    api.DELETE_SELF_USER_SETTINGS(settingId),
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

export { deleteUserSettings }
