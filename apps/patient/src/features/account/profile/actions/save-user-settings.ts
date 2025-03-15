'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { UserSettings } from '@psychplus-v2/types'

type UserSettingsPayload = Partial<UserSettings>

const saveUserSettings = async (payload: UserSettingsPayload) => {
  const result = await api.POST<UserSettingsPayload>(
    `${API_URL}/api/users/self/settings`,
    payload,
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

export { saveUserSettings }
