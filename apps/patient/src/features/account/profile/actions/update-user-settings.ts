'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { UserSettings } from '@psychplus-v2/types'

type UserSettingsPayload = Partial<UserSettings>

const updateUserSettings = async (
  payload: UserSettingsPayload,
  settingId: string,
) => {
  const updatedPayload = { ...payload, id: settingId }

  const result = await api.PUT<UserSettingsPayload>(
    `${API_URL}/api/users/self/settings/${settingId}`,
    updatedPayload,
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

export { updateUserSettings }
