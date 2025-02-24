'use client'

import { GET_SELF_USER_SETTINGS } from '@/api/endpoints'
import * as api from '@/api/api.client'
import { UserSetting } from '@/types'

const getSelfUserSettings = async (
  categoryValue: string,
): Promise<api.ActionResult<UserSetting[]>> => {
  const result = await api.GET<UserSetting[]>(
    `${GET_SELF_USER_SETTINGS}?categoryValue=${categoryValue}`,
  )

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

export { getSelfUserSettings }
