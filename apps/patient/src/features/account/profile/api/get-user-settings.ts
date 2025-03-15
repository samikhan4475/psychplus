import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { UserSettings } from '@psychplus-v2/types'

const getUserSettings = async (patiendId: number) => {
  const result = await api.GET<UserSettings[]>(
    `${API_URL}/api/users/self/settings?categoryValue=${patiendId}&level=User`,
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

export { getUserSettings }
