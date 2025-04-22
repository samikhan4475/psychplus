'use server'

import { type ActionResult } from '@psychplus-v2/api'
import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'

const markAsReadNotificationAction = async (
  userNotificationId: string,
): Promise<ActionResult<boolean>> => {
  const url = new URL(
    `${API_URL}/api/users/self/notifications/${userNotificationId}/actions/read`,
  )

  const result = await api.PATCH(String(url), {})
  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }
  return {
    state: 'success',
    data: true,
  }
}

export { markAsReadNotificationAction }
