'use server'

import * as api from '@/api'
import { UserSetting } from '@/types'

const updateAutoRebookingStatuses = async (
  updatedSettings: UserSetting[],
): Promise<api.ActionResult<boolean>> => {
  const response = await api.POST<boolean>(
    api.UPDATE_DEFAULT_USER_SETTINGS,
    updatedSettings,
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: true,
  }
}

export { updateAutoRebookingStatuses }
