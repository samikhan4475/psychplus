'use server'

import * as api from '@/api'
import { UserSetting } from '@/types'

const addUserSettings = async (
  payload: Partial<UserSetting>,
): Promise<api.ActionResult<UserSetting>> => {
  const response = await api.POST<UserSetting>(
    api.ADD_SELF_USER_SETTINGS,
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

export { addUserSettings }
